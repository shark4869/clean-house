from flask import Blueprint
router = Blueprint("router", __name__)

@router.route('/', defaults={'path': ''})
@router.route('/<path:path>')
def catch_all(path):
    return router.send_static_file('index.html')
