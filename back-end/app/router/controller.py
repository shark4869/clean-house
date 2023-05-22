from flask import Blueprint, render_template
router = Blueprint("router", __name__)

@router.route('/', defaults={'path': ''})
@router.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')
