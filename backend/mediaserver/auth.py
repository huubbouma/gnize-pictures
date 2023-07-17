"""
auth.py
- provides the authentication API endpoints for consuming and producing 
  REST requests and responses
"""

from datetime import datetime, timedelta

import jwt
from flask import current_app, request
from flask.helpers import make_response
from flask_restx import Namespace, Resource, fields

from .models import ACCESS, User, db
from .utils import requires_access_level, token_required

api = Namespace(
    "auth",
    description="User related operations",
)

user_auth = api.model(
    "auth_details",
    {
        "email": fields.String(required=True, description="The email address"),
        "password": fields.String(required=True, description="The user password "),
    },
)

user_register = api.model(
    "user_details",
    {
        "email": fields.String(required=True, description="The email address"),
        "password": fields.String(required=True, description="The user password"),
        "access": fields.Integer(required=True, description="The user access level"),
        "limit_paths": fields.String(required=False, description="limit_paths regex"),
    },
)

user_unregister = api.model(
    "user_id",
    {
        "email": fields.String(required=True, description="The email address"),
    },
)


@api.route("/register/")
class UserRegister(Resource):
    """
    User register Resource
    """

    @api.doc("register user")
    @api.expect(user_register, validate=True)
    @requires_access_level(ACCESS["admin"])
    def post(self, user):
        data = request.get_json()
        user = User(**data)
        db.session.add(user)
        db.session.commit()

        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "access": user.access_str,
            }
        }, 201


@api.route("/unregister/")
class UserUnRegister(Resource):
    """
    User unregister Resource
    """

    @api.doc("register user")
    @api.expect(user_unregister, validate=True)
    @requires_access_level(ACCESS["admin"])
    def post(self, **kwargs):
        data = request.get_json()

        usr = User.query.filter_by(email=data["email"]).first()
        if not usr:
            raise RuntimeError("User not found")

        db.session.delete(usr)
        db.session.commit()
        return "user removed", 200


@api.route("/users/")
class UserList(Resource):
    """
    User List All Resource
    """

    @api.doc("List all users")
    @requires_access_level(ACCESS["admin"])
    def get(self, user):
        users = User.query.all()
        return [user.to_dict() for user in users]


@api.route("/verify/")
class UserVerify(Resource):
    """
    User Verify Resource
    """

    @api.doc("Verify user")
    @token_required
    def post(self, user):
        token = jwt.encode(
            {
                "sub": user.email,
                "iat": datetime.utcnow(),
                "exp": datetime.utcnow()
                + timedelta(
                    minutes=current_app.config["TOKEN_EXPIRATION_TIME_MINUTES"]
                ),
            },
            current_app.config["SECRET_KEY"],
        )

        payload = {
            "user": {"email": user.email, "access": user.access_str, "token": token}
        }

        res = make_response(payload)
        res.set_cookie("Authorization", token)
        return res


@api.route("/login/")
class UserLogin(Resource):
    """
    User Login Resource
    """

    # @api.doc(security=None)
    @api.doc("user login", security=None)
    @api.expect(user_auth, validate=True)
    def post(self):
        data = request.get_json()
        user = User.authenticate(**data)

        if not user:
            return {"message": "Invalid credentials", "authenticated": False}, 401

        token = jwt.encode(
            {
                "sub": user.email,
                "iat": datetime.utcnow(),
                "exp": datetime.utcnow()
                + timedelta(
                    minutes=current_app.config["TOKEN_EXPIRATION_TIME_MINUTES"]
                ),
            },
            current_app.config["SECRET_KEY"],
        )
        payload = {
            "user": {
                "email": user.email,
                "access": user.access_str,
                "token": token,
            }
        }

        res = make_response(payload)
        res.set_cookie("Authorization", token)

        return res
