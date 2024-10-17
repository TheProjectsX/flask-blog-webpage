from flask import Flask, request, Response, session
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_cors import CORS
import json
import os
from bson.objectid import ObjectId
import bcrypt
import jwt
import datetime
from datetime import datetime, timezone, timedelta
from collections import defaultdict

load_dotenv()

# App & Database Initialization
app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:3000",
            ]
        }
    },
    supports_credentials=True,
)
app.secret_key = os.getenv("SESSION_SECRET_KEY")
app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
db = PyMongo(app).db
# Only production
app.config["SESSION_COOKIE_HTTPONLY"] = (
    True if os.getenv("MONGODB_URI") == "true" else False
)
app.config["SESSION_COOKIE_SECURE"] = (
    True if os.getenv("MONGODB_URI") == "true" else False
)


# Check user authentication of Request!
def checkUserAuthentication():
    accessToken = session.get("access_token")

    if accessToken is None:
        return None

    try:
        payload = jwt.decode(accessToken, os.getenv("JWT_SECRET"), algorithms=["HS256"])
        return payload["email"]
    except jwt.ExpiredSignatureError:
        print(1)
        return None
    except jwt.InvalidTokenError:
        print(2)
        return None


# Test Route
@app.route("/")
def home():
    email = checkUserAuthentication()
    print(email)
    return {"success": True}


# Utils
def jsonifyData(data):
    result = []
    for document in data:
        document["_id"] = str(document["_id"])
        result.append(document)

    return result


def countTagsAndGroupByDate(data):
    tagCounts = defaultdict(int)

    countByDate = defaultdict(int)

    for doc in data:
        created_at = doc["createdAt"]

        date_obj = datetime.strptime(created_at, "%Y-%m-%dT%H:%M:%S.%f%z")

        date_str = date_obj.strftime("%B %Y")

        countByDate[date_str] += 1

        tags = doc.get("tags", [])
        for tag in tags:
            tagCounts[tag] += 1

    tagCountsList = [{"tag": tag, "count": count} for tag, count in tagCounts.items()]

    dateCountsList = [
        {"date": date, "count": count} for date, count in countByDate.items()
    ]

    return tagCountsList, dateCountsList


# Register a new User
@app.route("/register", methods=["POST"])
def registerNewUser():
    body = request.json
    if not body.get("username") or not body.get("email") or not body.get("password"):
        return Response(
            json.dumps({"success": False, "message": "Invalid body request"}),
            status=400,
            mimetype="application/json",
        )

    emailExists = db.users.find_one({"email": body.get("email")})

    if emailExists:
        return Response(
            json.dumps({"success": False, "message": "Email already exists"}),
            status=201,
            mimetype="application/json",
        )

    if len(body.get("password")) < 6:
        return Response(
            json.dumps({"success": False, "message": "Min Password length is 6"}),
            status=400,
            mimetype="application/json",
        )

    hashedPassword = bcrypt.hashpw(
        body.get("password").encode("utf-8"), bcrypt.gensalt(10)
    )

    userInfo = {
        "username": body.get("username"),
        "email": body.get("email"),
        "profilePicture": body.get(
            "profilePicture", "https://i.ibb.co.com/tQ1tBdV/dummy-profile-picture.jpg"
        ),
        "role": body.get("role", "user"),
        "status": body.get("status", "active"),
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    doc = {**userInfo, "password": hashedPassword}

    try:
        dbResult = db.users.insert_one(doc)
        if dbResult.acknowledged:
            accessToken = jwt.encode(
                {
                    "email": body.get("email"),
                    "exp": datetime.now() + timedelta(days=1),
                },
                os.getenv("JWT_SECRET"),
                algorithm="HS256",
            )
            session["access_token"] = accessToken
            return Response(
                json.dumps(
                    {
                        "success": True,
                        "message": "User created successfully!",
                        **userInfo,
                    }
                ),
                status=200,
                mimetype="application/json",
            )
        else:
            return Response(
                json.dumps({"success": False, "message": "Failed to Create user"}),
                status=500,
                mimetype="application/json",
            )
    except Exception as e:
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to Create user", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# Login User
@app.route("/login", methods=["POST"])
def loginUser():
    body = request.json
    if not body.get("email") or not body.get("password"):
        return Response(
            json.dumps({"success": False, "message": "Invalid body request"}),
            status=400,
            mimetype="application/json",
        )

    try:
        dbResult = db.users.find_one({"email": body.get("email")})
        if (not dbResult) or (
            not bcrypt.checkpw(
                body.get("password").encode("utf-8"), dbResult.get("password", r"")
            )
        ):
            return Response(
                json.dumps({"success": False, "message": "Invalid Credentials"}),
                status=401,
                mimetype="application/json",
            )

        dbResult["_id"] = str(dbResult["_id"])
        userInfo = {key: value for key, value in dbResult.items() if key != "password"}

        accessToken = jwt.encode(
            {
                "email": userInfo.get("email"),
                "exp": datetime.now() + timedelta(days=1),
            },
            os.getenv("JWT_SECRET"),
            algorithm="HS256",
        )

        session["access_token"] = accessToken
        return Response(
            json.dumps(
                {
                    "success": True,
                    "message": "Login Successful",
                    **userInfo,
                }
            ),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        return Response(
            json.dumps(
                {"success": False, "message": "Failed Login user", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# Logout User
@app.route("/logout")
def logoutUser():
    sessionEmail = checkUserAuthentication()
    if not sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Authentication Failed!"}),
            status=401,
            mimetype="application/json",
        )

    session.pop("access_token", None)
    return Response(
        json.dumps({"success": True, "message": "Logout Successful"}),
        status=200,
        mimetype="application/json",
    )


# Sidebar Info
@app.route("/home/sidebar")
def sideBarInfo():
    try:
        dbPostResult = jsonifyData(
            db.posts.find({}, {"title": 1, "imageUrl": 1, "createdAt": 1})
            .sort({"createdAt": -1})
            .limit(6)
        )
        dbTagsTimeResult = db.posts.find({}, {"tags": 1, "createdAt": 1, "_id": 0})
        tagCountsList, dateCountsList = countTagsAndGroupByDate(dbTagsTimeResult)

        returnData = {
            "success": True,
            "data": {
                "recentPosts": dbPostResult[:3],
                "popularPosts": dbPostResult[3:],
                "tags": tagCountsList,
                "dates": dateCountsList,
            },
        }

        return Response(
            json.dumps(returnData),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        print(e)
        return Response(
            json.dumps(
                {"success": False, "message": "Failed to get Data", "error": str(e)}
            ),
            status=500,
            mimetype="application/json",
        )


# CRUD
# Create new Post
@app.route("/posts", methods=["POST"])
def createPosts():
    sessionEmail = checkUserAuthentication()
    if not sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Authentication Failed!"}),
            status=401,
            mimetype="application/json",
        )

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
        "authorEmail": sessionEmail,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "updatedAt": datetime.now(timezone.utc).isoformat(),
    }

    try:
        dbResult = db.posts.insert_one(doc)
        return Response(
            json.dumps(
                {
                    "success": True if dbResult.acknowledged else False,
                    "id": str(dbResult.inserted_id),
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
    query = request.args.get("query", "")
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
        dbResult = jsonifyData(
            db.posts.find({"title": {"$regex": query, "$options": "i"}})
            .limit(limit)
            .skip(skip)
            .sort({"createdAt": -1})
        )
        totalPostsCount = db.posts.estimated_document_count()
        pagination = {
            "currentCount": len(dbResult),
            "totalPosts": totalPostsCount,
            "has_next_page": page * limit < totalPostsCount,
            "nextPage": page + 1,
        }

        return Response(
            json.dumps(
                {
                    "success": True,
                    "pagination": pagination,
                    "data": dbResult,
                }
            ),
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
        dbResult = db.posts.find_one({"_id": id})
        if dbResult is None:
            return Response(
                json.dumps({"success": False, "message": "Post not Found"}),
                status=404,
                mimetype="application/json",
            )

        dbResult["_id"] = str(dbResult["_id"])
        authorInfoDBResult = db.users.find_one({"email": dbResult["authorEmail"]})

        authorInfo = {
            "_id": str(authorInfoDBResult["_id"]),
            "username": authorInfoDBResult["username"],
            "profilePicture": authorInfoDBResult["profilePicture"],
        }

        return Response(
            json.dumps({"success": True, **dbResult, "authorInfo": authorInfo}),
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
    sessionEmail = checkUserAuthentication()
    if not sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Authentication Failed!"}),
            status=401,
            mimetype="application/json",
        )

    body = request.json

    try:
        id = ObjectId(id)
    except Exception as e:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    oldItem = db.posts.find_one({"_id": id})
    if oldItem is None:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    if oldItem.get("authorEmail") != sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Forbidden Request"}),
            status=403,
            mimetype="application/json",
        )

    newDoc = {
        "title": body.get("title", oldItem.get("title")),
        "content": body.get("content", oldItem.get("content")),
        "imageUrl": body.get("imageUrl", oldItem.get("imageUrl")),
        "tags": body.get("tags", oldItem.get("tags")),
        "updatedAt": datetime.now(timezone.utc).isoformat(),
    }

    try:
        dbResult = db.posts.update_one({"_id": id}, {"$set": newDoc})

        if dbResult.modified_count > 0:
            return Response(
                json.dumps(
                    {
                        "success": True,
                        "message": "Post updated successfully",
                        "id": str(id),
                    }
                ),
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
    sessionEmail = checkUserAuthentication()
    if not sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Authentication Failed!"}),
            status=401,
            mimetype="application/json",
        )

    try:
        id = ObjectId(id)
    except Exception as e:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    oldItem = db.posts.find_one({"_id": id})
    if oldItem is None:
        return Response(
            json.dumps({"success": False, "message": "Post not Found"}),
            status=404,
            mimetype="application/json",
        )

    if oldItem.get("authorEmail") != sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Forbidden Request"}),
            status=403,
            mimetype="application/json",
        )

    try:
        dbResult = db.posts.delete_one({"_id": id})
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


#### User specific routes
# Get info About user
@app.route("/me")
def getUserInfo():
    sessionEmail = checkUserAuthentication()
    if not sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Authentication Failed!"}),
            status=401,
            mimetype="application/json",
        )

    try:
        dbResult = db.users.find_one({"email": sessionEmail})
        if not dbResult:
            return Response(
                json.dumps({"success": False, "message": "Data not Found"}),
                status=404,
                mimetype="application/json",
            )
        postsCount = db.posts.count_documents({"authorEmail": dbResult["email"]})

        dbResult["_id"] = str(dbResult["_id"])
        userInfo = {key: value for key, value in dbResult.items() if key != "password"}
        userInfo["postsCount"] = postsCount
        return Response(
            json.dumps(
                {"success": True, "message": "Successfully got user info", **userInfo}
            ),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        return Response(
            json.dumps(
                {
                    "success": False,
                    "message": "Failed to get user info",
                    "error": str(e),
                }
            ),
            status=500,
            mimetype="application/json",
        )


# Get user posts
@app.route("/me/posts")
def getUserPosts():
    sessionEmail = checkUserAuthentication()
    if not sessionEmail:
        return Response(
            json.dumps({"success": False, "message": "Authentication Failed!"}),
            status=401,
            mimetype="application/json",
        )

    try:
        dbResult = db.posts.find({"authorEmail": sessionEmail})

        return Response(
            json.dumps({"success": True, "data": jsonifyData(dbResult)}),
            status=200,
            mimetype="application/json",
        )

    except Exception as e:
        return Response(
            json.dumps(
                {
                    "success": False,
                    "message": "Failed to get user Posts",
                    "error": str(e),
                }
            ),
            status=500,
            mimetype="application/json",
        )


if __name__ == "__main__":
    app.run(debug=True)
