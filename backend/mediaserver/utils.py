from functools import wraps

import jwt
from flask import current_app, request

from .models import User


def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        if current_app.config["ANONYMOUS_ACCESS"]:
            kwargs["user"] = User(email="bobdobalina@localhost", password="-", access=0)
            return f(*args, **kwargs)

        token = request.headers.get("Authorization", "")

        invalid_msg = {
            "message": "Invalid token. Registeration and / or authentication required",
            "authenticated": False,
        }
        expired_msg = {
            "message": "Expired token. Reauthentication required.",
            "authenticated": False,
        }

        # if len(auth_headers) != 2:
        #     return invalid_msg, 401

        try:
            # token = auth_headers[1]
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"]
            )
            user = User.query.filter_by(email=data["sub"]).first()
            if not user:
                raise RuntimeError("User not found")
            kwargs["user"] = user
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return expired_msg, 401  # 401 is Unauthorized HTTP status code
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return invalid_msg, 401

    return _verify


def _get_token_from_request(request):
    token = request.headers.get("Authorization", "")
    if not token:
        # try reading from cookie
        token = request.cookies.get("Authorization")
    if not token:
        token = request.args.get("token")
    return token


def _get_user_from_token(token):
    data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
    user = User.query.filter_by(email=data["sub"]).first()
    return user


def requires_access_level(access_level):
    not_logged_in_msg = {"message": "Authentication required.", "authenticated": False}
    wrong_access_level = {
        "message": "Not allowed for this user.",
        "authenticated": True,
    }

    invalid_msg = {
        "message": "Invalid token. Registeration and / or authentication required",
        "authenticated": False,
    }
    expired_msg = {
        "message": "Expired token. Reauthentication required.",
        "authenticated": False,
    }

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_app.config["ANONYMOUS_ACCESS"]:
                kwargs["user"] = User(
                    email="bobdobalina@localhost", password="-", access=0
                )
                return f(*args, **kwargs)

            try:
                token = _get_token_from_request(request)

                if not token:
                    return not_logged_in_msg, 401

                user = _get_user_from_token(token)

                if not user:
                    raise RuntimeError("User not found")

                if not user.allowed(access_level):
                    return wrong_access_level, 401

                kwargs["user"] = user

                return f(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return expired_msg, 401  # 401 is Unauthorized HTTP status code
            except jwt.InvalidTokenError:
                return invalid_msg, 401
            except Exception as e:
                print(e)
                return str(e), 500

        return decorated_function

    return decorator


def limit_user_by_path(path_param="path"):
    error_msg = {"message": "Path not allowed."}

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            path = request.args.get(path_param)
            token = _get_token_from_request(request)
            user = _get_user_from_token(token)

            if not user.is_path_allowed(path):
                return error_msg, 401

            return f(*args, **kwargs)

        return decorated_function

    return decorator
