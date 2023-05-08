import os
from dotenv import load_dotenv

load_dotenv()
SERCRET_KEY = os.environ.get("KEY")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
SLQALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = os.environ.get("KEY_TOKEN")

