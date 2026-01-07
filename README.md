# JustStreamIt

A web interface to visualize real-time movie rankings. This project was built using JavaScript, HTML, and CSS.

## Prerequisites

Python.
The OCMovies-API.

## Installation & Launch

### 1. Start the API (Backend)
The website requires the local API to be running on port `8000`.

Open your terminal, navigate to the API folder, and run the following commands:

```bash
# 1. Enter the API folder 
cd OCMovies-API-EN-FR
```

# 2. Create a virtual environment
```bash
python -m venv env
```

# 3. Activate the environment
# For Windows:
```bash
env\Scripts\activate
# For macOS/Linux:
```
```bash
source env/bin/activate
```

# 4. Install dependencies
```bash
pip install -r requirements.txt
```

# 5. Create and populate the database
```bash
python manage.py create_db
```

# 6. Run the server
```bash
python manage.py runserver
```
