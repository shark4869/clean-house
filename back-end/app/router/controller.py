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

# @router.route('/static/<path:filename>')
# def serve_static(filename):
#     root_dir = os.path.dirname(os.path.abspath(__file__))
#     return send_from_directory(os.path.join(root_dir, 'static'), filename)

@router.route('/', defaults={'path': ''})
@router.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(router.static + '/' + path):
        # Nếu tệp tồn tại, trả về nó
        return send_from_directory(router.static, path)
    else:
        # Nếu không, trả về index.html để React Router xử lý định tuyến
        return send_from_directory(router.static, 'index.html')