from flask import Flask

# App
app = Flask(__name__)


@app.route("/")
def home():
    return {"success": True}


if __name__ == "__main__":
    app.run(debug=True)
