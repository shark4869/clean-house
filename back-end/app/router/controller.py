from flask import Blueprint, render_template,send_from_directory
router = Blueprint("router", __name__)

# @router.route('/', defaults={'path': ''})
# @router.route('/<path:path>')
# def serve(path):
#     if path != "" and not path.startswith("api") and not path.startswith("static"):
#         # Chuyển hướng các yêu cầu không phù hợp đến tệp "index.html" của React
#         return send_from_directory('../front-end/build', 'index.html')
#     else:
#         # Gửi các yêu cầu khác đến Flask để xử lý
#         return send_from_directory('./', path)

# @router.errorhandler(404)
# def not_found(e):
#     return send_from_directory('../front-end/build', 'index.html')

@router.route('/')
def index():
    return render_template('index.html')

@router.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')