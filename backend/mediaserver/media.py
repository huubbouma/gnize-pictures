"""
stats.py
- provides the Survey stats endpoints for consuming and producing
  REST requests and responses
"""

from flask.helpers import send_from_directory

from flask import current_app, request
from flask_restx import Namespace, Resource

from .models import ACCESS
from .utils import requires_access_level

import os
from urllib.parse import unquote

from PIL import Image
from PIL.Image import LANCZOS

resize_map = {
    "thumbnail": (400, 400),
    "preview": (800, 800),
    "web": (1600, 1600),
}

VIDEO_EXTENSIONS = [
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

EXIF_ORIENTATION_TAG = 274


def getExifOrientation(img):
    orientation = 0
    if hasattr(img, "_getexif"):
        exif = None
        try:
            exif = img._getexif()
        except:
            pass
        if exif and EXIF_ORIENTATION_TAG in exif:
            orientation = exif[EXIF_ORIENTATION_TAG]
    return orientation


def original_file_path(path):
    if ".." in path:
        raise ValueError("parent selector not supported")

    if path.startswith("/"):
        path = path[1:]

    root_path = current_app.config["MEDIASERVER_ROOT_PATH"]
    folderpath = os.path.join(root_path, path)
    return folderpath


def cached_file_path(path):
    if ".." in path:
        raise ValueError("parent selector not supported")

    if path.startswith("/"):
        path = path[1:]

    root_path = current_app.config["MEDIASERVER_CACHED_PATH"]
    folderpath = os.path.join(root_path, path)
    return folderpath


def cached_folder_path():
    return os.path.dirname(current_app.config["MEDIASERVER_CACHED_PATH"])


def delete_image(image_path):
    removed = []
    image_path = unquote(image_path)

    if ".." in image_path:
        raise ValueError("wrong filename")

    real_image_path = original_file_path(image_path)
    fname = os.path.basename(real_image_path)

    if not os.path.exists(real_image_path):
        raise ValueError("bad path")

    os.remove(real_image_path)
    removed.append(real_image_path)

    # also remove '.NEF' (hires) image
    folder = os.path.dirname(real_image_path)
    base_name = os.path.splitext(fname)[0]
    nef_path = os.path.join(folder, base_name + ".NEF")
    if os.path.exists(nef_path):
        os.remove(nef_path)
        removed.append(nef_path)

    # also remove the cached (resized) version
    cached_image_path = cached_file_path(image_path)
    cached_folder = os.path.dirname(cached_image_path)

    for k in resize_map.keys():
        cache_fname = ".{}{}".format(k, fname)
        cached_path = os.path.join(cached_folder, cache_fname)
        if os.path.exists(cached_path):
            os.remove(cached_path)
            removed.append(cached_path)

    return removed


def delete_movie(movie_path, movie_type="mp4"):
    removed = []
    movie_path = unquote(movie_path)

    if ".." in movie_path:
        raise ValueError("wrong filename")

    real_movie_path = original_file_path(movie_path)
    orig_folder = os.path.dirname(real_movie_path)

    orig_fname = os.path.basename(real_movie_path)
    base_name = os.path.splitext(orig_fname)[0]

    for videoextension in VIDEO_EXTENSIONS:
        ext = ".{}".format(videoextension)
        fpath = os.path.join(orig_folder, base_name + ext)
        if os.path.exists(fpath):
            os.remove(fpath)
            removed.append(fpath)

    cached_movie_path = cached_file_path(movie_path)
    cached_folder = os.path.dirname(cached_movie_path)

    for videoextension in VIDEO_EXTENSIONS:
        fname = base_name + ".converted." + videoextension
        cached_path = os.path.join(cached_folder, fname)
        if os.path.exists(cached_path):
            os.remove(cached_path)
            removed.append(cached_path)

    return removed


def move_image(image_path, dest_folder_path):
    moved = []
    image_path = unquote(image_path)
    dest_folder_path = unquote(dest_folder_path)

    if ".." in image_path:
        raise ValueError("wrong filename")

    if ".." in dest_folder_path:
        raise ValueError("wrong folder name")

    real_image_path = original_file_path(image_path)
    fname = os.path.basename(real_image_path)

    real_dest_path = original_file_path(dest_folder_path)

    if not os.path.exists(real_image_path):
        raise ValueError("bad path")

    new_path = os.path.join(real_dest_path, fname)
    os.rename(real_image_path, new_path)

    moved.append(real_image_path)

    # also move '.NEF' (hires) image
    folder = os.path.dirname(real_image_path)
    base_name = os.path.splitext(fname)[0]
    fname = base_name + ".NEF"
    nef_path = os.path.join(folder, fname)
    if os.path.exists(nef_path):
        new_path = os.path.join(real_image_path, fname)
        os.rename(nef_path, new_path)
        moved.append(nef_path)

    # also remove the cached (resized) version
    cached_image_path = cached_file_path(image_path)
    cached_folder = os.path.dirname(cached_image_path)

    for k in resize_map.keys():
        cache_fname = ".{}{}".format(k, fname)
        cached_path = os.path.join(cached_folder, cache_fname)
        if os.path.exists(cached_path):
            # for now just delete the cache.. it will be recreated probably
            os.remove(cached_path)

    return moved


def move_movie(movie_path, dest_folder_path):
    moved = []

    movie_path = unquote(movie_path)
    dest_folder_path = unquote(dest_folder_path)

    if ".." in movie_path:
        raise ValueError("wrong filename")

    if ".." in dest_folder_path:
        raise ValueError("wrong folder name")

    real_movie_path = original_file_path(movie_path)
    real_dest_path = original_file_path(dest_folder_path)
    orig_folder = os.path.dirname(real_movie_path)

    orig_fname = os.path.basename(real_movie_path)
    base_name = os.path.splitext(orig_fname)[0]

    new_path = os.path.join(real_dest_path, orig_fname)
    os.rename(real_movie_path, new_path)
    moved.append(real_movie_path)

    cached_movie_path = cached_file_path(movie_path)
    cached_folder = os.path.dirname(cached_movie_path)
    new_cached_folder = cached_file_path(dest_folder_path)

    thumbnail_fname = f".thumbnail.{base_name}.jpg"
    thumbnail_path = os.path.join(cached_folder, thumbnail_fname)
    new_thumbnail_path = os.path.join(new_cached_folder, thumbnail_fname)
    if os.path.exists(thumbnail_path):
        os.rename(thumbnail_path, new_thumbnail_path)

    for videoextension in VIDEO_EXTENSIONS:
        ext = ".{}".format(videoextension)
        fname = base_name + ext
        fpath = os.path.join(orig_folder, fname)
        if os.path.exists(fpath):
            new_path = os.path.join(real_dest_path, fname)
            os.rename(fpath, new_path)
            moved.append(fpath)

    for videoextension in VIDEO_EXTENSIONS:
        fname = base_name + ".converted." + videoextension
        cached_path = os.path.join(cached_folder, fname)
        new_cached_path = os.path.join(new_cached_folder, fname)
        new_path = os.path.join(real_dest_path, fname)
        if os.path.exists(cached_path):
            os.makedirs(new_cached_folder, exist_ok=True)
            os.rename(cached_path, new_cached_path)

    return moved


def _return_original(image_path):
    image_path = unquote(image_path)

    if ".." in image_path:
        raise ValueError("wrong filename")

    real_image_path = original_file_path(image_path)

    if not os.path.exists(real_image_path):
        raise ValueError("bad path")

    folder = os.path.dirname(real_image_path)
    fname = os.path.basename(real_image_path)

    return send_from_directory(folder, fname, as_attachment=False)


def _return_resized(image_path, cache_prefix, size):
    """return resized image from cache, or resize it and cache"""

    image_path = unquote(image_path)

    if ".." in image_path:
        raise ValueError("wrong filename")

    real_image_path = original_file_path(image_path)

    if not os.path.exists(real_image_path):
        raise ValueError("bad path")

    cached_image_path = cached_file_path(image_path)

    cached_folder = os.path.dirname(cached_image_path)

    if not os.path.exists(cached_folder):
        os.makedirs(cached_folder)

    orig_fname = os.path.basename(real_image_path)
    fname = cache_prefix + orig_fname

    cached_path = os.path.join(cached_folder, fname)

    if not os.path.exists(cached_path):
        img = Image.open(real_image_path)
        orientation = getExifOrientation(img)
        width, height = size
        if img.size[0] < img.size[1]:
            width, height = height, width
        img.thumbnail((width, height), LANCZOS)

        if orientation == 1:
            pass  # do nothing
        elif orientation == 2:
            img = img.transpose(Image.FLIP_LEFT_RIGHT)
        elif orientation == 3:
            img = img.transpose(Image.ROTATE_180)
        elif orientation == 4:
            img = img.transpose(Image.FLIP_TOP_BOTTOM)
        elif orientation == 5:
            img = img.transpose(Image.FLIP_TOP_BOTTOM).transpose(Image.ROTATE_270)
        elif orientation == 6:
            img = img.transpose(Image.ROTATE_270)
        elif orientation == 7:
            img = img.transpose(Image.FLIP_LEFT_RIGHT).transpose(Image.ROTATE_270)
        elif orientation == 8:
            img = img.transpose(Image.ROTATE_90)

        img.save(cached_path)

    return send_from_directory(cached_folder, fname, as_attachment=False)


def _return_movie(movie_path, movie_type="mp4"):
    """return scaled / preprocessed movie from cache"""

    movie_path = unquote(movie_path)

    if ".." in movie_path:
        raise ValueError("wrong filename")

    real_movie_path = original_file_path(movie_path)

    if not os.path.exists(real_movie_path):
        raise ValueError("bad path")

    cached_movie_path = cached_file_path(movie_path)
    cached_folder = os.path.dirname(cached_movie_path)

    if not os.path.exists(cached_folder):
        os.makedirs(cached_folder)

    orig_fname = os.path.basename(real_movie_path)
    base_name = os.path.splitext(orig_fname)[0]
    fname = base_name + ".converted." + movie_type

    cached_path = os.path.join(cached_folder, fname)

    if not os.path.exists(cached_path):
        raise ValueError("movie not found")

    return send_from_directory(cached_folder, fname, as_attachment=False)


api = Namespace(
    "media",
    description="Media download operations",
)


@api.route("/image/")
class Media(Resource):
    """
    Media resource
    """

    @api.doc("Get Image")
    # @api.expect(folder_query, validate=False)
    @requires_access_level(ACCESS["user"])
    @api.doc(params={"path": "Media path", "size": "Media size"})
    def get(self, **kwargs):
        path = request.args.get("path", "")

        parts = path.split("/")
        ospath = os.sep.join(parts)

        argsize = request.args.get("size", "web")

        if argsize == "original":
            return _return_original(ospath)

        if argsize not in resize_map.keys():
            raise ValueError("size unknown")

        size = resize_map[argsize]
        sizename = ".{}".format(argsize)

        return _return_resized(ospath, sizename, size)

    @api.doc("Perform Image action")
    @requires_access_level(ACCESS["admin"])
    @api.doc(
        params={
            "path": "Media path",
            "action": "Which action (delete/move)",
            "destination_path": "Target path for move action",
        }
    )
    def post(self, **kwargs):
        params = request.get_json()
        path = params.get("path", "")
        action = params.get("action", "")
        destination_path = params.get("destination_path", "")

        parts = path.split("/")
        ospath = os.sep.join(parts)

        if action == "delete":
            return delete_image(ospath)

        if action == "move":
            return move_image(ospath, destination_path)

        return


@api.route("/movie/")
class Movie(Resource):
    """
    Movie resource
    """

    @api.doc("Get Movie")
    # @api.expect(folder_query, validate=False)
    @requires_access_level(ACCESS["user"])
    @api.doc(
        params={
            "path": "Media path",
            "movie_type": "Movie Type",
            "thumb": "Get thumbnail",
        }
    )
    def get(self, **kwargs):
        path = request.args.get("path", "")

        parts = path.split("/")
        ospath = os.sep.join(parts)

        movie_type = request.args.get("movie_type", "webm")

        thumb = request.args.get("thumb", False)

        # # In case of NGINX we need to use X_ACCEL_REDIRECT, so we rewrite the
        # # X-Sendfile headers to X-Accel-Redirect. Since NGINX will return a 404
        # # even for internal urls that are not visible from the outside, the
        # # app url and the serving url cannot be the same so
        # # X_ACCEL_REDIRECT_PREFIX can be set to ensure they aren't.
        # if app.config["USE_X_SENDFILE"] and app.config["USE_X_ACCEL_REDIRECT"]:
        #     response.headers["X-Accel-Redirect"] = app.config[
        #         "X_ACCEL_REDIRECT_PREFIX"
        #     ] + response.headers.pop("X-SendFile")
        # return response

        if thumb:
            image_path = unquote(ospath)
            cached_image_path = cached_file_path(image_path)
            cached_folder = os.path.dirname(cached_image_path)
            fname = os.path.basename(cached_image_path)
            return send_from_directory(cached_folder, fname, as_attachment=False)

        return _return_movie(ospath, movie_type)

    @api.doc("Perform Movie action")
    @requires_access_level(ACCESS["admin"])
    @api.doc(
        params={
            "path": "Media path",
            "action": "Which action (delete)",
            "destination_path": "Target path for move action",
        }
    )
    def post(self, **kwargs):
        params = request.get_json()
        path = params.get("path", "")
        action = params.get("action", "")

        destination_path = params.get("destination_path", "")

        parts = path.split("/")
        ospath = os.sep.join(parts)

        if action == "delete":
            return delete_movie(ospath)

        if action == "move":
            return move_movie(ospath, destination_path)

        return
