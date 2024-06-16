# Welcome to SeshHouse

# Project Startup

## _Server Startup_
1. If you do NOT see venv folder in project root, run at root
```
python -m venv venv
```
2. Activate the virtual environment at root of project:
- On Windows:
```
venv\Scripts\activate
```
- On macOS and Linux:
```
source venv/bin/activate
```

3. run at root (installs dependencies listed in the file)
```
pip3 install -r requirements.txt
```
- (OR use pip if you have 'python --version' < 3)


4. Create db
```
# Initialize the migration repository
`flask db init`

# Generate an initial migration
`flask db migrate -m "Initial migration."`

# Apply the migration to create the tables
`flask db upgrade`

# Seed the db (if neccessary)
flask seed-db
```

5. run
```
python (or python3) run.py
```

- ### When changes are made to the models and you want to reset your database, you can  remove the current database file and reapply the migrations to create a new database schema. Here's how you can do this step-by-step:

a. Stop server Ctrl+C

b. Remove the Existing Database File
```
rm -f app.db
```

c. Remove the migrations directory
```
rm -rf migrations
```

d. repeat step 4


- ### To Shut Server Down Completely, Follow these steps:

1. Stop server with
```
Ctrl+C 
```

2. Deactivate venv by running
```
deactivate
```

That's it! All server processes have stopped :)


## _Frontend Startup_

#### We use yarn!

1. navigate to frontend
```
cd frontend
```

2. install packages with Yarn
```
yarn install
```

3. run dev server
```
yarn dev
```