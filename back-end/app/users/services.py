from app.extentions import db
from app.app_ma import UserSchema
from app.model import Users
from flask import request, jsonify, Blueprint, current_app
import json
import os
import cloudinary.uploader
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import datetime, timedelta

users = Blueprint("users", __name__)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
UPLOAD_FOLDER = 'static/images/avatars'
# POST


def add_user_service():
    data = request.json
    if (data and ('username' in data) and ('password' in data) and ('first_name' in data) and ('last_name' in data) and ('email' in data) and ('address' in data) and ('gender' in data) and ('phone' in data) and ('birth_date' in data) and ('avatar' in data) and ('role_id' in data) and ('role_current' in data)):
        username = data['username']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        address = data['address']
        gender = data['gender']
        phone = data['phone']
        birth_date = data['birth_date']
        avatar = data['avatar']
        role_id = data['role_id']
        role_current = data['role_current']
        try:
            new_user = Users(username, password, first_name, last_name,
                             email, address, gender, phone, birth_date, avatar, role_id)
            if role_current == 1:
                db.session.add(new_user)
                db.session.commit()
                return jsonify({'message': 'Add user successfully'}), 200
            else:
                return jsonify({'message': 'You do not have permission to add users'}), 403
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not add users'}), 403


def register_service():
    data = request.json
    if (data and ('username' in data) and ('password' in data) and ('first_name' in data) and ('last_name' in data) and ('email' in data) and ('address' in data) and ('gender' in data) and ('phone' in data) and ('birth_date' in data) and ('role_id' in data)):
        username = data['username']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        address = data['address']
        gender = data['gender']
        phone = data['phone']
        birth_date = data['birth_date']
        avatar = ""
        role_id = data['role_id']
        try:
            user = Users(username, password, first_name, last_name, email,
                         address, gender, phone, birth_date, avatar, role_id)
            db.session.add(user)
            db.session.commit()
            return jsonify({'message': 'Register Success'}), 200
        except Exception as e:
            db.session.rollback()
            error_message = str(e)
            return jsonify({'message': 'Register not Success', 'error': error_message}), 403

# GET


def get_user_by_id_service(id):
    user = Users.query.get(id)
    if user:
        return user_schema.jsonify(user)
    else:
        return jsonify({'message': 'Not found user'}), 404


def get_all_users_service():
    users = Users.query.all()
    if users:
        return users_schema.jsonify(users)
    else:
        return jsonify({'message': 'Not found user'}), 404

# UPDATE


def update_user_by_id_service(id):
    user = Users.query.get(id)
    if user:
        try:
            data = request.json
            if data:
                if "first_name" in data:
                    user.first_name = data["first_name"]
                if "last_name" in data:
                    user.last_name = data["last_name"]
                if "email" in data:
                    user.email = data["email"]
                if "address" in data:
                    user.address = data["address"]
                if "gender" in data:
                    user.gender = data["gender"]
                if "phone" in data:
                    user.phone = data["phone"]
                if "birth_date" in data:
                    user.birth_date = data["birth_date"]
            db.session.commit()
            birth_date_formatted = user.birth_date.strftime("%Y-%m-%d")
            response = {
            'message': "Update user successfully",
            'user': {
                'id': user.id,
                'username': user.username,
                'password': user.password,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'address': user.address,
                'gender': user.gender,
                'phone': user.phone,
                'birth_date': birth_date_formatted,
                'avatar': user.avatar,
                'role_id': user.role_id,
                }
            }
            return jsonify(response), 200
        except:
            db.session.rollback()
            return jsonify({'message': 'Cannot update user'}), 403
    else:
        return jsonify({'message': 'User not found'}), 404


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# def update_user_avatar_by_id_service(id):
#     upload_folder = os.path.join(current_app.root_path, UPLOAD_FOLDER)
#     user = Users.query.get(id)
#     if user:
#         try:
#             if request.files.get('avatar'):
#                 avatar = request.files['avatar']
#                 if avatar and allowed_file(avatar.filename):
#                     filename = secure_filename(avatar.filename)
#                     avatar_path = os.path.join(upload_folder, filename)
#                     avatar.save(avatar_path)
#                     # Tạo đường dẫn tương đối từ thư mục gốc của ứng dụng
#                     app_root = current_app.root_path
#                     relative_path = os.path.relpath(avatar_path, app_root)
#                     user.avatar = relative_path
#             db.session.commit()
#             birth_date_formatted = user.birth_date.strftime("%Y-%m-%d")
#             response = {
#             'message': "Update user avatar successfully",
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'password': user.password,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'email': user.email,
#                 'address': user.address,
#                 'gender': user.gender,
#                 'phone': user.phone,
#                 'birth_date': birth_date_formatted,
#                 'avatar': user.avatar,
#                 'role_id': user.role_id,
#                 }
#             }
#             return jsonify(response), 200
#         except Exception as e:
#             db.session.rollback()
#             print(f"Error: {str(e)}")
#             return jsonify({'message': 'Cannot update user avatar'}), 403
#     else:
#         return jsonify({'message': 'User not found'}), 404

def update_user_avatar_by_id_service(id):
    upload_folder = os.path.join(current_app.root_path, UPLOAD_FOLDER)
    user = Users.query.get(id)
    if user:
        try:
            if request.files.get('avatar'):
                avatar = request.files['avatar']
                if avatar and allowed_file(avatar.filename):
                    filename = secure_filename(avatar.filename)
                    avatar_path = os.path.join(upload_folder, filename)
                    avatar.save(avatar_path)
                    # Tải lên ảnh lên Cloudinary
                    upload_result = cloudinary.uploader.upload(avatar_path)
                    # Lấy đường dẫn công khai từ kết quả tải lên
                    public_url = upload_result['secure_url']
                    user.avatar = public_url
            db.session.commit()
            birth_date_formatted = user.birth_date.strftime("%Y-%m-%d")
            response = {
            'message': "Update user avatar successfully",
            'user': {
                'id': user.id,
                'username': user.username,
                'password': user.password,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'address': user.address,
                'gender': user.gender,
                'phone': user.phone,
                'birth_date': birth_date_formatted,
                'avatar': user.avatar,
                'role_id': user.role_id,
                }
            }
            return jsonify(response), 200
        except Exception as e:
            db.session.rollback()
            error_message = str(e)
            return jsonify({'message': 'Cannot update user avatar', 'error': error_message}), 403
    else:
        return jsonify({'message': 'User not found'}), 404

def change_password_service(id):
    user = Users.query.get(id)
    if user:
        try:
            data = request.json
            old_password = data["old_password"]
            new_password = data["new_password"]
            confirm_password = data["confirm_password"]
            if old_password != user.password:
                return jsonify({'message': 'Incorrect password'}), 400
            if new_password != confirm_password:
                return jsonify({'message': 'New password and confirm password do not match'}), 400
            user.password = new_password
            db.session.commit()
            return jsonify({'message': 'Update password successfully'}), 200
        except:
            db.session.rollback()
            return jsonify({'message': 'Cannot update pasword'}), 403
    else:
        return jsonify({'message': 'User not found'}), 404


def delete_user_by_id_service(id):
    user = Users.query.get(id)
    if user:
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'Delete user successfully'}), 200
        except IndentationError:
            db.session.rollback()
            return jsonify({'message': 'Can not delete user'}), 400
    else:
        return jsonify({'message': 'Not found user'}), 404


def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    user = Users.query.filter_by(username=username).first()
    if user and user.password == password:
        expires_delta = timedelta(minutes=5)
        access_token = create_access_token(
            identity=user.id, expires_delta=expires_delta)
        birth_date_formatted = user.birth_date.strftime("%Y-%m-%d")
        response = {
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'password': user.password,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'address': user.address,
                'gender': user.gender,
                'phone': user.phone,
                'birth_date': birth_date_formatted,
                'avatar': user.avatar,
                'role_id': user.role_id,
            }
        }
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401
