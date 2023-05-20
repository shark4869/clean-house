from flask import Blueprint
import os
from .services import add_payment_service, get_all_method_service, add_book_service, get_all_book_service, get_book_by_id_service, get_book_by_services_service, get_book_by_customer_service, get_book_by_employee_service, update_book_status_service
from flask_jwt_extended import jwt_required

books = Blueprint("books", __name__)

# POST


@books.route("/api/add-method", methods=["POST"])
@jwt_required()
def add_method():
    return add_payment_service()


@books.route("/api/book", methods=["POST"])
@jwt_required()
def add_book():
    return add_book_service()
# GET


@books.route("/api/books", methods=["GET"])
# @jwt_required()
def get_all_books():
    return get_all_book_service()


@books.route("/api/book/<int:id>", methods=["GET"])
@jwt_required()
def get_book_by_id(id):
    return get_book_by_id_service(id)


@books.route("/api/book-service/<int:service_id>", methods=["GET"])
@jwt_required()
def get_book_by_service(service_id):
    return get_book_by_services_service(service_id)


@books.route("/api/book-employee/<int:employee_id>", methods=["GET"])
@jwt_required()
def get_book_by_employee(employee_id):
    return get_book_by_employee_service(employee_id)


@books.route("/api/book-customer/<int:customer_id>", methods=["GET"])
@jwt_required()
def get_book_by_customer(customer_id):
    return get_book_by_customer_service(customer_id)


@books.route("/api/method", methods=["GET"])
@jwt_required()
def get_all_method():
    return get_all_method_service()

# UPDATE


@books.route("/api/book-status/<int:id>", methods=["PUT"])
@jwt_required()
def update_book_status(id):
    return update_book_status_service(id)
