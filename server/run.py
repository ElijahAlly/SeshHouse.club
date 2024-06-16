from app import create_app, db
from app.models import User, Event, Document

app = create_app()

# Optional: Ccreates the database tables
@app.cli.command("create-db")
def create_db():
    db.create_all()
    print("Database tables created.")

# Optional: Seeds the database with initial data
@app.cli.command("seed-db")
def seed_db():
    user1 = User(username="user1", email="user1@example.com", phone_number="1234567890", password_hash="hash")
    # Assume `event` is an instance of Event and `filename` and `file_url` are provided
    event1 = Event(title="Event 1", description="Description for Event 1", location="Location 1", capacity=100)
   
    db.session.add(user1)
    db.session.add(event1)
    db.session.commit()

    document = Document(filename="sesh house ying yang", file_url="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.vR-aumvGH0tD53Ak6afxcwHaHa%26pid%3DApi&f=1&ipt=f19c1f647480af4dae49772a089a25074fc92eaa8a7010a95050adcc9a3cad33&ipo=images", event_id=event1.id)

    db.session.add(document)
    db.session.commit()

    print("Database seeded with initial data.")

# Shell context processor to automatically import db and models in the Flask shell
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Event': Event}

if __name__ == "__main__":
    app.run(host="localhost", port=5550)
