from flask import Blueprint
import os
from .services import add_category_service, get_all_categories_service, update_category_by_id_service, delete_category_by_id_service, update_category_imgae_by_id_service
from flask_jwt_extended import jwt_required
categories = Blueprint("categories", __name__)


# GET

@categories.route("/api/categories", methods=["GET"])
def get_all_categories():
    return get_all_categories_service()


# POST

@categories.route("/api/category", methods=["POST"])
@jwt_required()
def add_category():
    return add_category_service()

# UPDATE


@categories.route("/api/category/<int:id>", methods=["PUT"])
@jwt_required()
def update_category_by_id(id):
    return update_category_by_id_service(id)


@categories.route("/api/category-image/<int:id>", methods=["PUT"])
# @jwt_required()
def update_category_image_by_id(id):
    return update_category_imgae_by_id_service(id)

# delete


@categories.route("/api/category/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_category_by_id(id):
    return delete_category_by_id_service(id)
