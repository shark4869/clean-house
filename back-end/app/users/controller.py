from flask import Blueprint, jsonify, make_response
import os
from flask_jwt_extended import jwt_required, unset_jwt_cookies
from .services import register_service, add_user_service, get_user_by_id_service, get_all_users_service, update_user_by_id_service, update_user_avatar_by_id_service, change_password_service, delete_user_by_id_service, login
users = Blueprint("users", __name__)

# GET


@users.route("/api/user/<int:id>", methods=["GET"])
@jwt_required()
def get_user_by_id(id):
    return get_user_by_id_service(id)


@users.route("/api/users", methods=["GET"])
@jwt_required()
def get_all_users():
    return get_all_users_service()

# POST


@users.route("/api/user", methods=["POST"])
@jwt_required()
def add_user():
    return add_user_service()


@users.route("/api/register", methods=["POST"])
def user_register():
    return register_service()

# UPDATE


@users.route("/api/user/<int:id>", methods=["PUT"])
@jwt_required()
def update_user_by_id(id):
    return update_user_by_id_service(id)


@users.route("/api/user/avatar/<int:id>", methods=["PUT"])
@jwt_required()
def update_user_avatar_by_id(id):
    return update_user_avatar_by_id_service(id)


@users.route("/api/user-change-password/<int:id>", methods=["PUT"])
@jwt_required()
def update_user_password_by_id(id):
    return change_password_service(id)

# delete


@users.route("/api/user/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user_by_id(id):
    return delete_user_by_id_service(id)

# login


@users.route("/api/login", methods=['POST'])
def user_login():
    return login()

# logout


@users.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    response = make_response(
        jsonify({'message': 'Logged out successfully'}), 200)
    unset_jwt_cookies(response)
    return response
