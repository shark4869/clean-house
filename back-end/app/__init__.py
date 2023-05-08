from flask import Flask, request, Blueprint
from .users.controller import users
from .roles.controller import roles
from .categories.controller import categories
from .services.controller import services
from .status.controller import status
from .books.controller import books
from .rates.controller import rates
from .home.controler import home
from .process.controller import process
from .extentions import db, ma, jwt, migrate
from .model import Users, Roles, Categories, Services, Books, Rates, Status, Payment, Baner
import os


def create_db(app):
    with app.app_context():
        db.create_all()
    print("create database")


def create_app(config_file="config.py"):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    create_db(app)
    app.register_blueprint(roles)
    app.register_blueprint(users)
    app.register_blueprint(categories)
    app.register_blueprint(services)
    app.register_blueprint(status)
    app.register_blueprint(books)
    app.register_blueprint(rates)
    app.register_blueprint(home)
    app.register_blueprint(process)
    return app
