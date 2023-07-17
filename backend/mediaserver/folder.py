"""
stats.py
- provides the Survey stats endpoints for consuming and producing
  REST requests and responses
"""

from datetime import datetime
from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import current_app, jsonify, request
from flask_restx import Namespace, Resource, fields
from flask_sqlalchemy import SQLAlchemy

from .models import ACCESS, User
from .utils import limit_user_by_path, requires_access_level, token_required

import json
import os
from urllib.parse import quote, unquote


imagetypes = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".tiff",
    "bmp",
]

all_movietypes = [
    "avi",
    "mpg",
    "mpeg",
    "mov",
    "mjpg",
    "mjpeg",
    "mp4",
    "ogv",
    "webm",
    "3gp",
]
supported_html5_movietypes = [
    "mp4",
]
# thumbnail_size = (400, 400)
# preview_size = (800, 800)
# web_size = (1600, 1600)
EXIF_ORIENTATION_TAG = 274


def folder_path(path):
    if ".." in path:
        raise ValueError("parent selector not supported")

    if path.startswith("/"):
        path = path[1:]

    root_path = current_app.config["MEDIASERVER_ROOT_PATH"]
    folderpath = os.path.join(root_path, path)
    return folderpath


def cached_folder_path(path):
    if ".." in path:
        raise ValueError("parent selector not supported")

    if path.startswith("/"):
        path = path[1:]

    root_path = current_app.config["MEDIASERVER_CACHED_PATH"]
    folderpath = os.path.join(root_path, path)
    return folderpath


def get_subfolders(path):
    """return subfolders in path"""

    path = unquote(path)
    path = folder_path(path)
    items = os.listdir(path)
    items = [it for it in items if not it.startswith(".")]
    items.sort()
    folders = []
    for item in items:
        itempath = os.path.join(path, item)
        if os.path.isdir(itempath):
            folders.append({"id": quote(item), "name": item})
    return folders


def create_folder(path):
    unquoted_path = unquote(path)
    path = folder_path(unquoted_path)
    result = True
    error = None
    try:
        os.mkdir(path)
    except FileExistsError as e:
        result = False
        error = str(e)

    return {
        "result": result,
        "error": error,
    }


def rename_folder(oldpath, newpath):
    unquoted_oldpath = unquote(oldpath)
    unquoted_newpath = unquote(newpath)
    oldpath = folder_path(unquoted_oldpath)
    newpath = folder_path(unquoted_newpath)

    cached_oldpath = cached_folder_path(unquoted_oldpath)
    cached_newpath = cached_folder_path(unquoted_newpath)

    result = True
    error = None

    if not os.path.isdir(oldpath):
        result = False
        error = "Path is not a folder"

    if result:
        try:
            os.rename(oldpath, newpath)
        except (FileNotFoundError, OSError) as e:
            result = False
            error = str(e)

    # also the cached paths.. ignore all errors
    if result:
        try:
            os.rename(cached_oldpath, cached_newpath)
        except (FileNotFoundError, OSError) as e:
            pass

    return {
        "result": result,
        "error": error,
    }


def move_item(oldpath, newpath):
    unquoted_oldpath = unquote(oldpath)
    unquoted_newpath = unquote(newpath)
    oldpath = folder_path(unquoted_oldpath)
    newpath = folder_path(unquoted_newpath)

    cached_oldpath = cached_folder_path(unquoted_oldpath)
    cached_newpath = cached_folder_path(unquoted_newpath)

    result = True
    error = None

    if not os.path.isfile(oldpath):
        result = False
        error = "Path is not a file"

    if result:
        try:
            os.rename(oldpath, newpath)
        except (FileNotFoundError, OSError) as e:
            result = False
            error = str(e)

    # also the cached paths.. ignore all errors
    if result:
        fname = os.path.basename(oldpath)
        base_name = os.path.splitext(fname)[0]

        nef_name = base_name + ".NEF"

        old_nef_path = os.path.join(cached_oldpath, nef_name)
        new_nef_path = os.path.join(cached_newpath, nef_name)

        try:
            os.rename(old_nef_path, new_nef_path)
        except:
            pass

        thumb_name = ".thumbnail." + base_name + ".jpg"
        old_thumb_path = os.path.join(cached_oldpath, thumb_name)
        new_thumb_path = os.path.join(cached_newpath, thumb_name)
        try:
            os.rename(old_nef_path, new_nef_path)
        except:
            pass

        return {
            "result": result,
            "error": error,
        }


def delete_empty_folder(path):
    unquoted_path = unquote(path)
    path = folder_path(unquoted_path)
    cached_path = cached_folder_path(unquoted_path)

    result = True
    error = None

    items = os.listdir(path)
    if items:
        result = False
        error = "Folder is not empty"
    else:
        try:
            os.rmdir(path)
        except (FileNotFoundError, OSError) as e:
            result = False
            error = str(e)

        if result:
            # also the cached paths.. ignore all errors
            try:
                os.rmdir(cached_path)
            except (FileNotFoundError, OSError) as e:
                pass

    return {
        "result": result,
        "error": error,
    }


def get_media(path):
    """return media in path"""

    unquoted_path = unquote(path)
    path = folder_path(unquoted_path)
    cached_path = cached_folder_path(unquoted_path)
    items = os.listdir(path)
    items.sort()
    media = []
    for item in items:
        itempath = os.path.join(path, item)
        if os.path.isdir(itempath):
            continue

        base_name = os.path.splitext(item)[0]
        nef_name = base_name + ".NEF"
        nef_path = os.path.join(path, nef_name)

        thumb_name = ".thumbnail." + base_name + ".jpg"
        thumb_path = os.path.join(cached_path, thumb_name)

        for ext in imagetypes:
            if item.lower().endswith(ext):
                nef_exists = os.path.exists(nef_path)
                media.append(
                    {
                        "id": quote(item),
                        "name": item,
                        "type": "image",
                        "ext": ext,
                        "nef": nef_exists and nef_name,
                    }
                )

        for ext in all_movietypes:
            if item.lower().endswith(ext):
                thumb_exists = os.path.exists(thumb_path)
                for html5_ext in supported_html5_movietypes:
                    media.append(
                        {
                            "id": quote(item),
                            "name": item,
                            "type": "movie",
                            "ext": html5_ext,
                            "thumb": thumb_exists and thumb_name,
                        }
                    )

    return media


api = Namespace(
    "folder",
    description="Folder Listing operations",
)


@api.route("/list/")
class FolderListing(Resource):
    """
    List folder resources
    """

    @api.doc("Folder Query")
    # @api.expect(folder_query, validate=False)
    @requires_access_level(ACCESS["user"])
    @limit_user_by_path()
    @api.doc(params={"path": "Media path"})
    def get(self, user, **kwargs):
        path = request.args.get("path", "")

        media = get_media(path)
        folders = get_subfolders(path)

        allowed_folders = [
            f for f in folders if user.is_path_allowed(f'{path}/{unquote(f["id"])}')
        ]

        result = {
            "media": media,
            "folders": allowed_folders,
        }

        return result, 200


@api.route("/create/")
class FolderCreate(Resource):
    """
    Create folder resources
    """

    @api.doc("Folder Create")
    # @api.expect(folder_query, validate=False)
    @requires_access_level(ACCESS["admin"])
    @limit_user_by_path()
    @api.doc(params={"path": "Folder path"})
    def put(self, **kwargs):
        params = request.get_json()
        path = params.get("path", "")

        result = create_folder(path)

        return result, 200


@api.route("/remove/")
class FolderRemove(Resource):
    """
    remove folder resources
    """

    @api.doc("Folder Remove")
    # @api.expect(folder_query, validate=False)
    @requires_access_level(ACCESS["admin"])
    @limit_user_by_path()
    @api.doc(params={"path": "Folder path"})
    def post(self, **kwargs):
        params = request.get_json()
        path = params.get("path", "")

        result = delete_empty_folder(path)

        if result["error"]:
            return result, 400

        return result, 200


@api.route("/rename/")
class FolderRename(Resource):
    """
    rename folder resources
    """

    @api.doc("Folder Rename")
    # @api.expect(folder_query, validate=False)
    @requires_access_level(ACCESS["admin"])
    @limit_user_by_path()
    @api.doc(
        params={
            "path": "Folder path",
            "newpath": "New Folder path",
        }
    )
    def post(self, **kwargs):
        params = request.get_json()
        path = params.get("path", "")
        newpath = params.get("newpath", "")

        result = rename_folder(path, newpath)

        return result, 200
