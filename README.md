# JustStreamIt

A web interface to visualize real-time movie rankings. This project was built using JavaScript, HTML, and CSS.

## Prerequisites

--> Python.

--> The OCMovies-API.

## Installation & Launch

## A. Start the API (Backend)
The website requires the local API to be running on port `8000`.

Open your terminal, navigate to the API folder, and run the following commands:

### 1. Enter the API folder 
```bash
cd OCMovies-API-EN-FR
```

### 2. Create a virtual environment
```bash
python -m venv env
```

### 3. Activate the environment
```bash
# For Windows:
env\Scripts\activate
```

```bash
# For macOS/Linux:
source env/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Create and populate the database
```bash
python manage.py create_db
```

### 6. Run the server
```bash
python manage.py runserver
```

## B. Start the Website (Frontend)

# 1. Clone this repository 
```bash
git clone https://github.com/Mnr04/OC_JustStreamIt.git
```

# 2. Enter the project folder
```bash
cd JustStreamIt
```

# 3. Open index.html in your default browser
```bash
# (On macOS)
open index.html
```

```bash
# (On Windows)
start index.html
```

```bash
# (On Linux)
xdg-open index.html
```
