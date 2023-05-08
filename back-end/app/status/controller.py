from flask import Blueprint
import os
from .services import add_status_service, get_all_status_service
from flask_jwt_extended import jwt_required

status = Blueprint("status", __name__)


# POST
@status.route("/api/add-status", methods=["POST"])
@jwt_required()
def add_status():
    return add_status_service()

# GET


@status.route("/api/status", methods=["GET"])
def get_all_status():
    return get_all_status_service()
