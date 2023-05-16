import os
from dotenv import load_dotenv
import cloudinary

load_dotenv()
SERCRET_KEY = os.environ.get("KEY")
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
SLQALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = os.environ.get("KEY_TOKEN")

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET")
)
