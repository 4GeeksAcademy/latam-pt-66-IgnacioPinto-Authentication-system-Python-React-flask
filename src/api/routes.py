"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

# Importamos lo necesario para crear y validar tokens
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


### ESTE ES Todo MI CODIGO

# Endpoint signup para registrarse por primera vez
@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"msg": "Email and password are required"}), 400

    # verificamos que el usuario no exista
    existing_user = User.query.filter_by(email=body["email"]).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    # creamos el usuario
    new_user = User(
        email=body["email"],
        password=body["password"],
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Endpoint login para iniciar session
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email", None)
    password = body.get("password", None)

    # validamos en la BD
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    # Si es correcto, se crea el token
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200

# Endpoint privado
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    # solo se llega hasta aca si el token es valido
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id, "email": user.email, "msg": "Access granted to private zone"}), 200
