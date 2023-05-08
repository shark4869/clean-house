from app.extentions import db
from app.app_ma import StatusSchema
from app.model import Status
from flask import request, jsonify
import json
import os


status_schema = StatusSchema()
statuses_schema = StatusSchema(many=True)


# POST

def add_status_service():
    data = request.json
    if (data and ('name' in data)):
        name = data['name']
        try:
            new_status = Status(name)
            db.session.add(new_status)
            db.session.commit()
            return jsonify({'message': 'Add status successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add status'}), 403

# GET


def get_all_status_service():
    status = Status.query.all()
    if status:
        return statuses_schema.jsonify(status)
    else:
        return jsonify({'message': 'Not found status'}), 404
