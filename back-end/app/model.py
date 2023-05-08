from .extentions import db


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200))
    gender = db.Column(db.String(10), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    avatar = db.Column(db.String(200))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)

    def __init__(self, username, password, first_name, last_name, email, address, gender, phone, birth_date, avatar, role_id):
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.address = address
        self.gender = gender
        self.phone = phone
        self.birth_date = birth_date
        self.avatar = avatar
        self.role_id = role_id


class Roles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __init__(self, name):
        self.name = name


class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    image = db.Column(db.String(200))

    def __init__(self, name):
        self.name = name


class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    employee_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def __init__(self, name, category_id, description, employee_id, price):
        self.name = name
        self.category_id = category_id
        self.description = description
        self.employee_id = employee_id
        self.price = price


class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey(
        'services.id'), nullable=False)
    customer_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_date = db.Column(db.Date, nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey(
        'status.id'), nullable=False)
    workplace = db.Column(db.String(200), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    timer = db.Column(db.Integer, nullable=False)
    note = db.Column(db.String(1000), nullable=False)
    total = db.Column(db.Integer, nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey(
        'payment.id'), nullable=False)
    status_update = db.Column(db.DateTime, nullable=False)

    def __init__(self, service_id, customer_id, book_date, status_id, workplace, start_time, timer, note, total, payment_id, status_update):
        self.service_id = service_id
        self.customer_id = customer_id
        self.book_date = book_date
        self.status_id = status_id
        self.workplace = workplace
        self.start_time = start_time
        self.timer = timer
        self.note = note
        self.total = total
        self.payment_id = payment_id
        self.status_update = status_update


class Rates(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey(
        'services.id'), nullable=False)
    customer_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500))
    rate_date = db.Column(db.Date, nullable=False)

    def __init__(self, service_id, customer_id, rate, comment, rate_date):
        self.service_id = service_id
        self.customer_id = customer_id
        self.rate = rate
        self.comment = comment
        self.rate_date = rate_date


class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    def __init__(self, name):
        self.name = name


class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    method = db.Column(db.String(100), nullable=False)

    def __init__(self, method):
        self.method = method


class Baner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200), nullable=False)
    active = db.Column(db.Integer, nullable=False)

    def __init__(self, image, active):
        self.image = image
        self.active = active


class Process(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200))
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(300), nullable=False)

    def __init__(self, image, name, description):
        self.image = image
        self.name = name
        self.description = description
