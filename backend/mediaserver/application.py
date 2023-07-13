"""
application.py
- creates a Flask app instance and registers the database object
"""

import os

from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from werkzeug.middleware.proxy_fix import ProxyFix

from .auth import api as auth_api
from .models import db
from .folder import api as folder_api
from .media import api as media_api


def create_app(app_name="MEDIASERVER"):
    app = Flask(app_name)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_port=1, x_proto=1)

    app.config.from_object("mediaserver.config.BaseConfig")
    if os.environ.get("MEDIASERVER_API_SETTINGS"):
        app.config.from_envvar("MEDIASERVER_API_SETTINGS")

    authorizations = {
        "Bearer Auth": {"type": "apiKey", "in": "header", "name": "Authorization"},
    }

    api = Api(
        title="MediaServer REST API",
        version="1.0",
        description="",
        security="Bearer Auth",
        authorizations=authorizations,
    )

    api.add_namespace(auth_api)
    api.add_namespace(folder_api)
    api.add_namespace(media_api)

    api.init_app(app)

    cors = CORS(app)

    db.init_app(app)

    return app
