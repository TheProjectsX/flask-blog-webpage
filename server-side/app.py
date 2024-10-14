from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

# App & Database Initialization
app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
db = PyMongo(app).db


@app.route("/")
def home():
    db.test.insert_one({"success": True})
    return {"success": True}


if __name__ == "__main__":
    app.run(debug=True)
