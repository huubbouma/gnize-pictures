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
from flask_restplus import Namespace, Resource, fields
from flask_sqlalchemy import SQLAlchemy

from .models import ACCESS, User
from .utils import requires_access_level, token_required

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
    """ return subfolders in path """

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


def get_media(path):
    """ return media in path """

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
    @api.doc(params={"path": "Media path"})
    def get(self, **kwargs):

        path = request.args.get("path", "")

        media = get_media(path)
        folders = get_subfolders(path)

        result = {
            "media": media,
            "folders": folders,
        }

        return result, 200
