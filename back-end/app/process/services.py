from app.extentions import db
from app.app_ma import ProcessSchema
from app.model import Process
from flask import request, jsonify, Blueprint, current_app
from werkzeug.utils import secure_filename
import json
import os
process = Blueprint("process", __name__)

process_schema = ProcessSchema(many=True)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
UPLOAD_FOLDER = 'static/images/process'
# POST


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def add_process_service():
    data = request.json
    if (data and ('name' in data) and ('description' in data)):
        name = data['name']
        description = data['description']
        try:
            process = Process("", name, description)
            db.session.add(process)
            db.session.commit()
            return jsonify({'message': 'Add success'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add process'}), 403
    else:
        return jsonify({'message': 'Request error'}), 400

# Update


def update_process_avatar_by_id_service(id):
    upload_folder = os.path.join(current_app.root_path, UPLOAD_FOLDER)
    process = Process.query.get(id)
    if process:
        try:
            if request.files.get('image'):
                image = request.files['image']
                if image and allowed_file(image.filename):
                    filename = secure_filename(image.filename)
                    image_path = os.path.join(upload_folder, filename)
                    image.save(image_path)
                    # Tạo đường dẫn tương đối từ thư mục gốc của ứng dụng
                    app_root = current_app.root_path
                    relative_path = os.path.relpath(image_path, app_root)
                    process.avatar = relative_path
            db.session.commit()
            return jsonify({'message': 'Update process image successfully'}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error: {str(e)}")
            return jsonify({'message': 'Cannot update process image'}), 403
    else:
        return jsonify({'message': 'Process not found'}), 404


def update_process_by_id_service(id):
    process = Process.query.get(id)
    if process:
        try:
            data = request.json
            if data and ("name" in data):
                process.name = data["name"]
            if data and ("description" in data):
                process.description = data["description"]
            db.session.commit()
            return jsonify({'message': 'Update process successfully'}), 200
        except:
            db.session.rollback()
            return jsonify({'message': 'Can not update process'}), 403
    else:
        return jsonify({'message': 'process not found'}), 404


def get_all_process_service():
    process = Process.query.all()
    if process:
        return process_schema.jsonify(process)
    else:
        return jsonify({'message': 'Not found process'}), 404


# Delete


def delete_process_by_id_service(id):
    process = Process.query.get(id)
    if process:
        try:
            db.session.delete(process)
            db.session.commit()
            return jsonify({'message': 'Delete process successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not delete process '}), 400
    else:
        return jsonify({'message': 'Not found process'}), 404
