import bson.json_util
from flask import Flask, request, Response
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import json
import os
from bson.objectid import ObjectId
from tomlkit import document

load_dotenv()

# App & Database Initialization
app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
db = PyMongo(app).db


# Test Route
@app.route("/")
def home():
    return {"success": True}


# Utils
def jsonifyData(data):
    result = []
    for document in data:
        # Convert ObjectId to string
        document["_id"] = str(document["_id"])  # Update the _id to be a string
        result.append(document)

    return result


# TODO: Replace the collection names
# CRUD
# Create new Post
@app.route("/posts", methods=["POST"])
def createPosts():
    body = request.json
    if not body.get("title") or not body.get("content"):
        return Response(
            json.dumps({"success": False, "message": "Invalid body request"}),
            status=400,
            mimetype="application/json",
        )

    doc = {
        "title": body.get("title"),
        "content": body.get("content"),
        "imageUrl": body.get(
            "imageUrl", "https://i.ibb.co.com/ryNv8bc/image-placeholder.jpg"
        ),
        "tags": body.get("tags", []),
    }

    try:
        dbResult = db.test.insert_one(doc)
        return Response(
            json.dumps(
                {
                    "success": True if dbResult.acknowledged else False,
                    "insertedId": dbResult.inserted_id,
                }
            ),
            status=200 if dbResult.acknowledged else 500,
            mimetype="application/json",
        )
    except Exception as e:
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to insert Post", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# Read Posts from Server
@app.route("/posts")
def readPosts():
    limit = request.args.get("limit", 15)
    page = request.args.get("page", 1)

    try:
        limit = int(limit)
    except Exception as e:
        limit = 15

    try:
        page = int(page)
    except Exception as e:
        page = 1

    skip = (page - 1) * limit

    try:
        dbResult = db.test.find({}).limit(limit).skip(skip)
        return Response(
            json.dumps({"success": True, "data": jsonifyData(dbResult)}),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to get Posts", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# Read One Post
@app.route("/posts/<string:id>")
def readOnePost(id):
    try:
        id = ObjectId(id)
    except Exception as e:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    try:
        dbResult = db.test.find_one({"_id": id})
        if dbResult is None:
            return Response(
                json.dumps({"success": False, "message": "Post not Found"}),
                status=404,
                mimetype="application/json",
            )

        dbResult["_id"] = str(dbResult["_id"])

        return Response(
            json.dumps({"success": True, **dbResult}),
            status=200,
            mimetype="application/json",
        )
    except Exception as e:
        print(e)
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to get Posts", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# Update a Post
@app.route("/posts/<string:id>", methods=["PUT"])
def updatePost(id):
    body = request.json

    try:
        id = ObjectId(id)
    except Exception as e:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    oldItem = db.test.find_one({"_id": id})
    if oldItem is None:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    newDoc = {
        "title": body.get("title", oldItem.get("title")),
        "content": body.get("content", oldItem.get("content")),
        "imageUrl": body.get("imageUrl", oldItem.get("imageUrl")),
        "tags": body.get("tags", oldItem.get("tags")),
    }

    try:
        dbResult = db.test.update_one({"_id": id}, {"$set": newDoc})
        if dbResult.modified_count > 0:
            return Response(
                json.dumps({"success": True, "message": "Post updated successfully"}),
                status=200,
                mimetype="application/json",
            )
        else:
            return Response(
                json.dumps({"success": False, "message": "Nothing Updated"}),
                status=400,
                mimetype="application/json",
            )
    except Exception as e:
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to Update Post", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# Delete a Post
@app.route("/posts/<string:id>", methods=["DELETE"])
def deletePost(id):
    try:
        id = ObjectId(id)
    except Exception as e:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    oldItem = db.test.find_one({"_id": id})
    if oldItem is None:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    try:
        dbResult = db.test.delete_one({"_id": id})
        if dbResult.deleted_count > 0:
            return Response(
                json.dumps({"success": True, "message": "Post Deleted successfully"}),
                status=200,
                mimetype="application/json",
            )
        else:
            return Response(
                json.dumps({"success": False, "message": "Post couldn't delete"}),
                status=400,
                mimetype="application/json",
            )

    except Exception as e:
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to Delete Post", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


if __name__ == "__main__":
    app.run(debug=True)
