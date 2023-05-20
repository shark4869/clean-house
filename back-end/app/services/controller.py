from flask import Blueprint
import os
from .services import add_service_cleaning, get_service_by_id_service, get_all_services_service, update_service_by_id_service, delete_service_by_id_service, get_service_by_category_service, restore_service_by_id_service
from flask_jwt_extended import jwt_required
services = Blueprint("services", __name__)


# GET
@services.route("/api/service/<int:id>", methods=["GET"])
def get_service_by_id(id):
    return get_service_by_id_service(id)


@services.route("/api/services/<int:category_id>", methods=["GET"])
def get_service_by_category(category_id):
    return get_service_by_category_service(category_id)


@services.route("/api/services", methods=["GET"])
def get_all_services():
    return get_all_services_service()


# POST

@services.route("/api/service", methods=["POST"])
@jwt_required()
def add_service():
    return add_service_cleaning()

# UPDATE


@services.route("/api/service/<int:id>", methods=["PUT"])
@jwt_required()
def update_service_by_id(id):
    return update_service_by_id_service(id)


# delete


@services.route("/api/service/<int:id>", methods=["DELETE"])
# @jwt_required()
def delete_service_by_id(id):
    return delete_service_by_id_service(id)

#restore
@services.route("/api/service/restore/<int:id>", methods=["PUT"])
# @jwt_required()
def restore_service_by_id(id):
    return restore_service_by_id_service(id)