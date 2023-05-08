from app.extentions import db
from app.app_ma import RoleSchema
from app.model import Roles
from flask import request, jsonify
import json

role_schema = RoleSchema()
roles_schema = RoleSchema(many=True)


def add_role_service():
    data = request.json
    if (data and ('name' in data)):
        name = data['name']
        try:
            role = Roles(name)
            db.session.add(role)
            db.session.commit()
            return jsonify({'message': 'Add success'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add role'}), 403
    else:
        return jsonify({'message': 'Request error'}), 400

# Get


def get_all_roles_service():
    roles = Roles.query.all()
    if roles:
        return roles_schema.jsonify(roles)
    else:
        return jsonify({'message': 'Not found role'}), 404
