from flask import Blueprint
import os
from .services import add_rate_service, get_all_rate_service, get_rate_by_services_service, get_rate_by_customer_service, delete_rate_by_id_service
from flask_jwt_extended import jwt_required

rates = Blueprint("rates", __name__)

# POST


@rates.route("/api/rate", methods=["POST"])
@jwt_required()
def add_rate():
    return add_rate_service()

# GET


@rates.route("/api/rates", methods=["GET"])
def get_all_rates():
    return get_all_rate_service()


@rates.route("/api/rate-service/<int:service_id>", methods=["GET"])
def get_rate_by_service(service_id):
    return get_rate_by_services_service(service_id)


@rates.route("/api/rate-customer/<int:customer_id>", methods=["GET"])
def get_rate_by_customer(customer_id):
    return get_rate_by_customer_service(customer_id)


@rates.route("/api/rate/<int:id>", methods=["DELETE"])
# @jwt_required()
def delete_rate_by_id(id):
    return delete_rate_by_id_service(id)
