from flask import Blueprint, render_template,send_from_directory
router = Blueprint("router", __name__)
import os
# @router.route('/', defaults={'path': ''})
# @router.route('/<path:path>')
# def serve(path):
#     if path != "" and not path.startswith("api") and not path.startswith("static"):
#         root_dir = os.path.dirname(os.path.abspath(__file__))
#         return send_from_directory(os.path.join(root_dir, 'static'), 'index.html')
#     else:
#         return send_from_directory('./', path)

@router.route('/static/<path:filename>')
def serve_static(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(root_dir, 'static'), filename)

