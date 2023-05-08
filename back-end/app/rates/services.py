from app.extentions import db
from app.app_ma import RateSchema
from app.model import Services, Users, Rates
from flask import request, jsonify
import json
import os


rate_schema = RateSchema()
rates_schema = RateSchema(many=True)


# POST

def add_rate_service():
    data = request.json
    if (data and ('service_id' in data) and ('customer_id' in data) and ('rate' in data) and ('comment' in data) and ('rate_date' in data)):
        service_id = data['service_id']
        customer_id = data['customer_id']
        rate = data['rate']
        comment = data['comment']
        rate_date = data['rate_date']
        try:
            new_rate = Rates(service_id, customer_id, rate, comment, rate_date)
            db.session.add(new_rate)
            db.session.commit()
            return jsonify({'message': 'Add rate successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add rate'}), 403

# GET


def get_all_rate_service():
    rates = Rates.query.all()
    if rates:
        return rates_schema.jsonify(rates)
    else:
        return jsonify({'message': 'Not found rate'}), 404


def get_rate_by_services_service(service_id):
    rates = Rates.query.join(Services).filter(Services.id == service_id).all()
    if rates:
        return rates_schema.jsonify(rates)
    else:
        return jsonify({'message': 'Not found rate'}), 404


def get_rate_by_customer_service(customer_id):
    rates = Rates.query.join(Users).filter(Users.id == customer_id).all()
    if rates:
        return rates_schema.jsonify(rates)
    else:
        return jsonify({'message': 'Not found rate'}), 404

# Delete


def delete_rate_by_id_service(id):
    rate = Rates.query.get(id)
    if rate:
        try:
            db.session.delete(rate)
            db.session.commit()
            return jsonify({'message': 'Delete rate successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not delete rate'}), 400
    else:
        return jsonify({'message': 'Not found rate'}), 404
