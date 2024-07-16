from datetime import datetime
from app import db
from werkzeug.security import check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phone_number = db.Column(db.String(20), unique=True)
    password_hash = db.Column(db.String(128))
    profile_picture = db.Column(db.String(200))
    bio = db.Column(db.Text)
    date_of_birth = db.Column(db.Date)
    address = db.Column(db.String(200))
    country = db.Column(db.String(100))
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    twitter_profile = db.Column(db.String(50))
    facebook_profile = db.Column(db.String(100))
    instagram_profile = db.Column(db.String(100))
    snapchat_profile = db.Column(db.String(100))
    youtube_profile = db.Column(db.String(100))
    twitch_profile = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'phone_number': self.phone_number,
            'profile_picture': self.profile_picture,
            'bio': self.bio,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'address': self.address,
            'country': self.country,
            'city': self.city,
            'state': self.state,
            'twitter_profile': self.twitter_profile,
            'facebook_profile': self.facebook_profile,
            'instagram_profile': self.instagram_profile,
            'snapchat_profile': self.snapchat_profile,
            'youtube_profile': self.youtube_profile,
            'twitch_profile': self.twitch_profile,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def __repr__(self):
        return f'<User {self.username}>'

    @property
    def is_active(self):
        # Return True if the user is active
        return True  # Assuming all users are active, adjust as needed

    def get_id(self):
        # This method should return the user's ID
        return self.id
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    date = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    location = db.Column(db.String(100))
    capacity = db.Column(db.Integer)
    organizer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    organizer = db.relationship('User', backref=db.backref('organized_events', lazy='dynamic'))
    event_type = db.Column(db.String(50))
    registration_deadline = db.Column(db.DateTime)
    registration_fee = db.Column(db.Float)
    tags = db.Column(db.String(500))
    status = db.Column(db.String(20), default='draft')
    documents = db.relationship('Document', backref='event', lazy='dynamic')
    attendees_count = db.Column(db.Integer, default=0)
    event_image = db.Column(db.String(200))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat() if self.date else None,
            'location': self.location,
            'capacity': self.capacity,
            'organizer_id': self.organizer_id,
            'event_type': self.event_type,
            'registration_deadline': self.registration_deadline.isoformat() if self.registration_deadline else None,
            'registration_fee': self.registration_fee,
            'tags': self.tags.split(',') if self.tags else [],
            'status': self.status,
            'attendees_count': self.attendees_count,
            'event_image': self.event_image,
            'documents': [doc.to_dict() for doc in self.documents]  # List of related documents
        }

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255))
    file_url = db.Column(db.String(255))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'file_url': self.file_url,
            'event_id': self.event_id
        }

    def __repr__(self):
        return f"<Document {self.filename}>"

class NutritionalInfo(db.Model):
    __tablename__ = 'nutritional_info'
    id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Float)
    fat = db.Column(db.Float)
    protein = db.Column(db.Float)
    carbohydrates = db.Column(db.Float)
    cafe_item_id = db.Column(db.Integer, db.ForeignKey('cafe_item.id'))

class CustomizationOption(db.Model):
    __tablename__ = 'customization_option'
    id = db.Column(db.Integer, primary_key=True)
    option_name = db.Column(db.String(100))
    option_values = db.Column(db.String(500)) # Store options as a comma-separated string
    cafe_item_id = db.Column(db.Integer, db.ForeignKey('cafe_item.id'))

class CafeItem(db.Model):
    __tablename__ = 'cafe_item'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    item_type = db.Column(db.String(50), nullable=False)
    tags = db.Column(db.String(500)) # Store tags as a comma-separated string
    item_image = db.Column(db.String(200))
    online_purchase_fee = db.Column(db.Float, nullable=True)
    stock_quantity = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Float, nullable=False)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    ingredients = db.Column(db.String(500), nullable=True)  # Store ingredients as a comma-separated string
    brand = db.Column(db.String(100), nullable=True)
    expiration_date = db.Column(db.DateTime, nullable=True)
    nutritional_info = db.relationship('NutritionalInfo', backref='cafe_item', uselist=False)
    customization_options = db.relationship('CustomizationOption', backref='cafe_item', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'item_type': self.item_type,
            'tags': self.tags.split(',') if self.tags else [],
            'item_image': self.item_image,
            'online_purchase_fee': self.online_purchase_fee,
            'stock_quantity': self.stock_quantity,
            'price': self.price,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'ingredients': self.ingredients.split(',') if self.ingredients else [],
            'brand': self.brand,
            'expiration_date': self.expiration_date.isoformat() if self.expiration_date else None,
            'nutritional_info': self.nutritional_info.to_dict() if self.nutritional_info else None,
            'customization_options': [option.to_dict() for option in self.customization_options]
        }

class NutritionalInfo(db.Model):
    __tablename__ = 'nutritional_info'
    id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Float)
    fat = db.Column(db.Float)
    protein = db.Column(db.Float)
    carbohydrates = db.Column(db.Float)
    cafe_item_id = db.Column(db.Integer, db.ForeignKey('cafe_item.id'))

    def to_dict(self):
        return {
            'calories': self.calories,
            'fat': self.fat,
            'protein': self.protein,
            'carbohydrates': self.carbohydrates
        }

class CustomizationOption(db.Model):
    __tablename__ = 'customization_option'
    id = db.Column(db.Integer, primary_key=True)
    option_name = db.Column(db.String(100))
    option_values = db.Column(db.String(500))  # Store options as a comma-separated string
    cafe_item_id = db.Column(db.Integer, db.ForeignKey('cafe_item.id'))

    def to_dict(self):
        return {
            'option_name': self.option_name,
            'option_values': self.option_values.split(',') if self.option_values else []
        }
