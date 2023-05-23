from werkzeug.middleware.proxy_fix import ProxyFix
from app import create_app

app = create_app()
def before_request(req):
    if req.path != '/' and not req.path.startswith('/api'):
        req.path = '/'

bind = '0.0.0.0:8000'
workers = 4
worker_class = 'gevent'
before_request = before_request
middleware = [
    ProxyFix(app.wsgi_app)
]