from app.extentions import db
from app.app_ma import CategorySchema
from app.model import Categories
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename
import json
import os


category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
UPLOAD_FOLDER = 'static/images/category'
# Post


def add_category_service():
    data = request.json
    if (data and ('name' in data)):
        name = data['name']
        try:
            category = Categories(name)
            db.session.add(category)
            db.session.commit()
            return jsonify({'message': 'Add category success'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add category'}), 403
    else:
        return jsonify({'message': 'Request error'}), 400

# Get


def get_all_categories_service():
    categories = Categories.query.all()
    if categories:
        return categories_schema.jsonify(categories)
    else:
        return jsonify({'message': 'Not found category'}), 404

# UPDATE


def update_category_by_id_service(id):
    category = Categories.query.get(id)
    if category:
        try:
            data = request.json
            if data:
                if 'name' in data:
                    category.name = data['name']
                if 'description' in data:
                    category.description = data['description']
            db.session.commit()
            return jsonify({'message': 'Update category successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not update category'}), 403
    else:
        return jsonify({'message': 'Request error'}), 400


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def update_category_imgae_by_id_service(id):
    upload_folder = os.path.join(current_app.root_path, UPLOAD_FOLDER)
    category = Categories.query.get(id)
    if category:
        try:
            if request.files.get('image'):
                image = request.files['image']
                if image and allowed_file(image.filename):
                    filename = secure_filename(image.filename)
                    avatar_path = os.path.join(upload_folder, filename)
                    image.save(avatar_path)
                    # Tạo đường dẫn tương đối từ thư mục gốc của ứng dụng
                    app_root = current_app.root_path
                    relative_path = os.path.relpath(avatar_path, app_root)
                    category.avatar = relative_path
            db.session.commit()
            return jsonify({'message': 'Update category image successfully'}), 200
        except Exception as e:
            db.session.rollback()
            print(f"Error: {str(e)}")
            return jsonify({'message': 'Cannot update category image'}), 403
    else:
        return jsonify({'message': 'Category not found'}), 404
# delete


def delete_category_by_id_service(id):
    category = Categories.query.get(id)
    if category:
        try:
            db.session.delete(category)
            db.session.commit()
            return jsonify({'message': 'Delete category successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not delete category'}), 400
    else:
        return jsonify({'message': 'Not found category'}), 404
