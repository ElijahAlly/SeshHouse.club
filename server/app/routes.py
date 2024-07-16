from flask import Blueprint, jsonify, request, current_app #, render_template, flash, redirect, url_for, 
from app import db
from app.models import Event, User, Document, CafeItem
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta
from functools import wraps
import jwt
import os
from flask_login import login_user
import urllib.parse

bp = Blueprint('routes', __name__)

# Secret key for encoding JWT
SECRET_KEY = os.getenv('SECRET_KEY')

@bp.route('/')
def index():
    return "Hello, SeshHouse!"

# * Events

@bp.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    if events:
        return jsonify([event.to_dict() for event in events]), 200
    else:
        return jsonify({'error': 'Events not found'}), 404

@bp.route('/api/events/<string:title>', methods=['GET'])
def get_event(title):
    decoded_title = urllib.parse.unquote(title)
    # current_app.logger.info(f"Decoded title: {decoded_title}")
    event = Event.query.filter_by(title=decoded_title).first()

    if event:
        return jsonify(event.to_dict()), 200
    else:
        return jsonify({'error': 'Event not found'}), 404

@bp.route('/api/events', methods=['POST'])
def create_event():
    # Seed the database with initial data
    user2 = User(username="user2", email="user1@example.com", phone_number="1234567890", password_hash="hash")
    event2 = Event(title="Event 2", description="Description for Event 1", location="Location 1", capacity=100)
    db.session.add(user2)
    db.session.add(event2)
    db.session.commit()

    # Assuming `Document` is a model related to Event
    document = Document(filename="sesh house yin yang", file_url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.vR-aumvGH0tD53Ak6afxcwHaHa%26pid%3DApi&f=1&ipt=f19c1f647480af4dae49772a089a25074fc92eaa8a7010a95050adcc9a3cad33&ipo=images", event_id=event2.id)
    db.session.add(document)
    db.session.commit()

    return jsonify(event2.to_dict()), 201

# * Cafe
@bp.route('/api/cafe', methods=['POST'])
def create_cafe_item():
    data = request.get_json()

    # Validate input data
    required_fields = ['title', 'description', 'item_type', 'tags', 'item_image', 'price', 'is_available']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    try:
        # Create a new CafeItem instance
        new_cafe_item = CafeItem(
            title=data['title'],
            description=data['description'],
            item_type=data['item_type'],
            tags=','.join(data.get('tags', [])),  # Convert list to comma-separated string
            item_image=data.get('item_image'),
            online_purchase_fee=data.get('online_purchase_fee'),
            stock_quantity=data.get('stock_quantity'),
            price=data['price'],
            is_available=data['is_available'],
            created_at=datetime.utcnow(),  # Set the creation date
            updated_at=datetime.utcnow(),  # Set the update date
            ingredients=','.join(data.get('ingredients', [])),  # Convert list to comma-separated string
            brand=data.get('brand'),
            expiration_date=data.get('expiration_date'),
        )
        db.session.add(new_cafe_item)
        db.session.commit()

        # Return the created item as a JSON response
        return jsonify(new_cafe_item.to_dict()), 201
    except:
        print("")
    
@bp.route('/api/cafe_items', methods=['GET'])
def get_cafe_items():
    cafe_items = CafeItem.query.all()
    if cafe_items:
        return jsonify([item.to_dict() for item in cafe_items]), 200
    else:
        return jsonify({'error': 'Cafe items not found'}), 404

# * Users

@bp.route('/api/users/signup', methods=['POST'])
def create_user():
    data = request.get_json()

    # Validate required fields
    required_fields = ['first_name', 'last_name', 'username', 'email', 'password', 'date_of_birth']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400

    # Check if username or email already exists
    if User.query.filter_by(username=data['username']).first() is not None:
        return jsonify({'error': 'Username already exists'}), 400
    if User.query.filter_by(email=data['email']).first() is not None:
        return jsonify({'error': 'Email already exists'}), 400

    # Hash the password
    password_hash = generate_password_hash(data['password'])

    # Convert date_of_birth to a date object
    try:
        date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format for date_of_birth. Use YYYY-MM-DD.'}), 400

    # Create new user
    new_user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        username=data['username'],
        email=data['email'],
        password_hash=password_hash,
        date_of_birth=date_of_birth
    )

    # Add and commit new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Retrieve the newly created user
    user = User.query.filter_by(username=data['username']).first()

    if user is None:
        return jsonify({'error': 'could not create user :( please refresh and try again'}), 500
    
    # Log in the user
    login_user(user, remember=True, duration=timedelta(days=3))

    # Create JWT token
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=3)  # Token expiration time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    # Serialize user data
    user_data = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'email': user.email,
        'profile_picture': user.profile_picture,
        'bio': user.bio if user.bio else None,
        'phone_number': user.phone_number if user.phone_number else None,
        'date_of_birth': user.date_of_birth.isoformat() if user.date_of_birth else None,
        'address': user.address if user.address else None,
        'country': user.country if user.country else None,
        'city': user.city if user.city else None,
        'state': user.state if user.state else None,
        'twitter_profile': user.twitter_profile if user.twitter_profile else None,
        'created_at': user.created_at.isoformat() if user.created_at else None,
        'updated_at': user.updated_at.isoformat() if user.updated_at else None,
        'updated_at': user.updated_at.isoformat() if user.updated_at else None,
    }

    return jsonify({ 'message': 'User created successfully', 'user': user_data, 'jwt': token }), 201

@bp.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'username_or_email' not in data or 'password' not in data:
        return jsonify({'error': 'username_or_email and password are required'}), 400

    username_or_email = data['username_or_email']
    password = data['password']

    user = User.query.filter(
        (User.username == username_or_email) | (User.email == username_or_email)
    ).first()

    if user is None:
        return jsonify({'error': 'Invalid username or email'}), 401
    elif not user.check_password(password):
        return jsonify({'error': 'Invalid password'}), 401

    # Log in the user
    login_user(user, remember=True, duration=timedelta(days=3))

    # Create JWT token
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=3)  # Token expiration time
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    user_data = {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'email': user.email,
        'date_of_birth': user.date_of_birth.isoformat(),
        'phone_number': user.phone_number,
        'profile_picture': user.profile_picture,
        'bio': user.bio,
        'address': user.address,
        'country': user.country,
        'city': user.city,
        'state': user.state,
        'twitter_profile': user.twitter_profile,
        'facebook_profile': user.facebook_profile,
        'instagram_profile': user.instagram_profile,
        'snapchat_profile': user.snapchat_profile,
        'youtube_profile': user.youtube_profile,
        'twitch_profile': user.twitch_profile,
        'created_at': user.created_at.isoformat(),
        'updated_at': user.updated_at.isoformat(),
    }

    return jsonify({ 'message': 'Login successful', 'user': user_data, 'jwt': token }), 200

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user = User.query.get(payload['user_id'])
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 403

        return f(user, *args, **kwargs)

    return decorator

# @bp.route('/api/protected', methods=['GET'])
# @token_required # ! Protected route (needs to be logged in)
# def protected_route(user):
#     # Access user object and return some protected data
#     return jsonify({'message': 'This is a protected route', 'user': user.username}), 200