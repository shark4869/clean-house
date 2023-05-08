from flask import Blueprint
from flask_jwt_extended import jwt_required
from .services import add_role_service, get_all_roles_service
roles = Blueprint("roles", __name__)

# GET


@roles.route("/api/roles", methods=["GET"])
def get_all_roles():
    return get_all_roles_service()

# POST


@roles.route("/api/role", methods=["POST"])
@jwt_required()
def add_role():
    return add_role_service()
