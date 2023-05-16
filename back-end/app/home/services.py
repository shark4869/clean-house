from app.extentions import db
from app.app_ma import BanerSchema
from app.model import Baner
from flask import request, jsonify, Blueprint, current_app
import cloudinary.uploader
from werkzeug.utils import secure_filename
import json
import os
home = Blueprint("home", __name__)

baners_schema = BanerSchema(many=True)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
UPLOAD_FOLDER = 'static/images/baners'
# POST


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def add_baner_service():
    upload_folder = os.path.join(current_app.root_path, UPLOAD_FOLDER)
    if request.files.get('image'):
        image = request.files['image']
        try:
            if image and allowed_file(image.filename):
                filename = secure_filename(image.filename)
                image_path = os.path.join(upload_folder, filename)
                image.save(image_path)
                # Tải lên ảnh lên Cloudinary
                upload_result = cloudinary.uploader.upload(image_path)
                    # Lấy đường dẫn công khai từ kết quả tải lên
                public_url = upload_result['secure_url']
                banner = Baner(image=public_url, active=True)
                db.session.add(banner)
                db.session.commit()
                return jsonify({'message': 'Add baner successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add baner'}), 403

# Update

def update_banner_by_id_service(id):
    banner = Baner.query.get(id)
    if banner:
        try:
            data = request.json
            if data and ("active" in data):
                banner.active = data["active"]
            db.session.commit()
            return jsonify({'message': 'Update banner successfully'}), 200
        except:
            db.session.rollback()
            return jsonify({'message': 'Can not update banner'}), 403
    else:
        return jsonify({'message': 'Banner not found'}), 404





def get_all_baner_service():
    baners = Baner.query.all()
    if baners:
        return baners_schema.jsonify(baners)
    else:
        return jsonify({'message': 'Not found baner'}), 404


# Delete


def delete_baner_by_id_service(id):
    baner = Baner.query.get(id)
    if baner:
        try:
            db.session.delete(baner)
            db.session.commit()
            return jsonify({'message': 'Delete baner successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not delete baner '}), 400
    else:
        return jsonify({'message': 'Not found baner'}), 404
