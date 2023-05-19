from app.extentions import db
from app.app_ma import BookSchema, PaymentSchema
from app.model import Books, Payment, Users, Services
from flask import request, jsonify
import json
import os


book_schema = BookSchema()
books_schema = BookSchema(many=True)
payment_schema = PaymentSchema(many=True)


# POST

def add_payment_service():
    data = request.json
    if (data and ('method' in data)):
        method = data['method']
        try:
            new_method = Payment(method)
            db.session.add(new_method)
            db.session.commit()
            return jsonify({'message': 'Add method payment successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add method payment'}), 403


def add_book_service():
    data = request.json
    if (data and ('service_id' in data) and ('customer_id' in data) and ('book_date' in data) and ('status_id' in data) and ('workplace' in data) and ('start_time' in data) and ('timer' in data) and ('note' in data) and ('total' in data) and ('payment_id' in data) and ('status_update' in data)):
        service_id = data['service_id']
        customer_id = data['customer_id']
        book_date = data['book_date']
        status_id = data['status_id']
        workplace = data['workplace']
        start_time = data['start_time']
        timer = data['timer']
        note = data['note']
        total = data['total']
        payment_id = data['payment_id']
        status_update = data['status_update']
        try:
            new_book = Books(service_id, customer_id, book_date, status_id, workplace,
                             start_time, timer, note, total, payment_id, status_update)
            db.session.add(new_book)
            db.session.commit()
            response = {
            'message': "Add book successfully",
            'book': {
                'id': new_book.id,
                'service_id': new_book.service_id,
                'customer_id': new_book.customer_id,
                'book_date': new_book.book_date,
                'status_id': new_book.status_id,
                'workplace': new_book.workplace,
                'start_time': new_book.start_time,
                'timer': new_book.timer,
                'note': new_book.note,
                'total': new_book.total,
                'payment_id': new_book.payment_id,
                'status_update': new_book.status_update
                }
            }
            return jsonify(response), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add book'}), 403

# GET


def get_all_book_service():
    books = Books.query.all()
    if books:
        return books_schema.jsonify(books)
    else:
        return jsonify({'message': 'Not found book'}), 404


def get_book_by_id_service(id):
    book = Books.query.get(id)
    if book:
        return book_schema.jsonify(book)
    else:
        return jsonify({'message': 'Not found book'}), 404


def get_book_by_customer_service(customer_id):
    books = Books.query.join(Users).filter(Users.id == customer_id).all()
    if books:
        return books_schema.jsonify(books)
    else:
        return jsonify({'message': 'Not found book'}), 404


def get_book_by_services_service(service_id):
    books = Books.query.join(Services).filter(Services.id == service_id).all()
    if books:
        return books_schema.jsonify(books)
    else:
        return jsonify({'message': 'Not found book'}), 404


def get_book_by_employee_service(employee_id):
    books = Books.query.join(Services).filter(
        Services.employee_id == employee_id).all()
    if books:
        return books_schema.jsonify(books)
    else:
        return jsonify({'message': 'Not found book'}), 404


def get_all_method_service():
    method = Payment.query.all()
    if method:
        return payment_schema.jsonify(method)
    else:
        return jsonify({'message': 'Not found method payment'}), 404

# Update


def update_book_status_service(id):
    book = Books.query.get(id)
    if book:
        try:
            data = request.json
            if (data and ('status_id' in data) and ('status_update' in data)):
                book.status_id = data["status_id"]
                book.status_update = data["status_update"]
            db.session.commit()
            response = {
            'message': "Update book status successfully",
            'book': {
                'id': book.id,
                'service_id': book.service_id,
                'customer_id': book.customer_id,
                'book_date': book.book_date,
                'status_id': book.status_id,
                'workplace': book.workplace,
                'start_time': book.start_time,
                'timer': book.timer,
                'note': book.note,
                'total': book.total,
                'payment_id': book.payment_id,
                'status_update': book.status_update
                }
            }
            return jsonify(response), 200
        except:
            db.session.rollback()
            return jsonify({'message': 'Can not update book status'}), 403
    else:
        return jsonify({'message': 'Service not found'}), 404
