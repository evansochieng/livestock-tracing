# import flask
from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db, Livestock, DeforestationArea

# create an instance of Flask
app = Flask(__name__)

# configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///livestock_tracing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # will avoid building too much unnecessary data in memory

# set up migrations using the Flask application instance and the SQLAlchemy instance
migrate = Migrate(app, db)

# initialize application for use within our database configuration
db.init_app(app)

# create a simple route for testing

@app.route('/')
def index():
    return '<h1>Welcome to the Livestock Traceability System!</h1>'

@app.route('/deforested_areas')
def deforested_areas():
    d_areas = []

    # get all deforested areas from database
    for d_area in DeforestationArea.query.all():
        d_area_dict = {
            "latitude": d_area.latitude,
            "longitude": d_area.longitude,
            "area": d_area.area
        }
        d_areas.append(d_area_dict)

    response = make_response(
        jsonify(d_areas),
        200
    )
    
    return response

@app.route('/livestock')
def livestocks():
    livestocks = []

    # get all the livestock in the database
    for livestock in Livestock.query.all():
        livestock_dict = {
            "latitude": livestock.latitude,
            "longitude": livestock.longitude,
            "owner": livestock.owner,
            "contact": livestock.contact
        }
        livestocks.append(livestock_dict)

    # return a json of livestock records
    response = make_response(
        jsonify(livestocks),
        200
    )
    
    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
