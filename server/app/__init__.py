from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
import secrets
import os

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Set a secret key for session management and other security features
    app.config['SECRET_KEY'] = secrets.token_hex(16)

    os.environ.__setitem__('SECRET_KEY', app.config['SECRET_KEY'])

    # Initialize Flask-Login
    login_manager.init_app(app)

    with app.app_context():
        from app.models import User  # Import User model
        login_manager.login_view = 'auth.login_user'  # Redirect to login if user is not authenticated

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp)
    app.config['DEBUG'] = True

    from app import models # Import models to register them with SQLAlchemy

    return app
