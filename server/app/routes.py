from flask import Blueprint, jsonify, request #, render_template, flash, redirect, url_for, 
from app import db
from app.models import Event, User, Document
from datetime import datetime

bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    return "Hello, SeshHouse! It's MusaByte"

@bp.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

@bp.route('/api/events', methods=['POST'])
def create_event():
    # data = request.get_json()
    # event = Event(
    #     title=data['title'],
    #     description=data['description'],
    #     date=datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S.%fZ'),
    #     location=data['location'],
    #     capacity=data['capacity']
    # )
    # db.session.add(event)
    # db.session.commit()

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
