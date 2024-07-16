# Welcome to SeshHouse

# Project Startup

## _Server Startup_
1. If you do NOT see venv folder in project root, run at root
```bash
python -m venv venv
```
2. Activate the virtual environment at root of project:
- On Windows:
```bash
venv\Scripts\activate
```
- On macOS and Linux:
```bash
source venv/bin/activate
```

3. run at root (installs dependencies listed in the file)
```bash
pip3 install -r requirements.txt
```
- (OR use pip if you have 'python --version' < 3)

<br> 
<br> 
<br> 
<br> 
<br> 
<br> 

### *cd into server directory*

4. Create db
```bash
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
```bash
python (or python3) run.py
```

### When changes are made to the models and you want to reset your database, you can  remove the current database file and reapply the migrations to create a new database schema. Here's how you can do this step-by-step:

a. Stop server Ctrl+C

b. Remove the Existing Database File
```bash
rm -f app.db
```

c. Remove the migrations directory
```bash
rm -rf migrations
```

d. repeat step 4


### To Shut Server Down Completely, Follow these steps:

1. Stop server with
```bash
Ctrl+C 
```

2. Deactivate venv by running
```bash
deactivate
```

That's it! All server processes have stopped :)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## _Frontend Startup_

#### We use yarn!

1. navigate to frontend
```bash
cd frontend
```

2. install packages with Yarn
```bash
yarn install
```

3. run dev server
```bash
yarn dev
```