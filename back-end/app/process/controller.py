from flask import Blueprint
import os
from flask_jwt_extended import jwt_required
from .services import add_process_service, get_all_process_service, update_process_avatar_by_id_service, update_process_by_id_service, delete_process_by_id_service
process = Blueprint("process", __name__)


@process.route("/api/add-process", methods=["POST"])
@jwt_required()
def add_process():
    return add_process_service()


@process.route("/api/process/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_process(id):
    return delete_process_by_id_service(id)


@process.route("/api/process/<int:id>", methods=["PUT"])
# @jwt_required()
def update_process(id):
    return update_process_by_id_service(id)


@process.route("/api/process-image/<int:id>", methods=["PUT"])
# @jwt_required()
def update_process_image(id):
    return update_process_avatar_by_id_service(id)


@process.route("/api/process", methods=["GET"])
def get_process():
    return get_all_process_service()
