from flask import Blueprint
import os
from flask_jwt_extended import jwt_required
from .services import add_baner_service, get_all_baner_service, delete_baner_by_id_service, update_banner_by_id_service
home = Blueprint("home", __name__)


@home.route("/api/add-banner", methods=["POST"])
@jwt_required()
def add_banner():
    return add_baner_service()


@home.route("/api/banner/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_banner(id):
    return delete_baner_by_id_service(id)


@home.route("/api/banner/<int:id>", methods=["PUT"])
# @jwt_required()
def update_banner(id):
    return update_banner_by_id_service(id)


@home.route("/api/banners", methods=["GET"])
def get_banner():
    return get_all_baner_service()
