# import flask
from flask import Flask, make_response, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

from flask_cors import CORS

from models import db, Livestock, DeforestationArea

import sqlite3

from helpers import *

import pandas as pd
import numpy as np
import json

# create an instance of Flask
app = Flask(__name__)

# configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///livestock_tracing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # will avoid building too much unnecessary data in memory

# enable CORS for all routes
CORS(app)

# set up migrations using the Flask application instance and the SQLAlchemy instance
migrate = Migrate(app, db)

# initialize application for use within our database configuration
db.init_app(app)

# Generate a secret key or use an existing one
app.secret_key = os.urandom(24)

### Create routes for serving data to the client-side ###

# Serve all deforested areas
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

# Serve all livestock in the database
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

# grab livestock at risk
def grab_at_risk_livestock(data):
    return data

# Serve animals at risk
@app.route('/livestock_at_risk')
def get_livestock_in_deforested_areas():

    ### Create a connection to the databases and extract all the data as a DataFrame ###
    # Livestock and Deforested Area data
    tracing_conn = sqlite3.connect('./instance/livestock_tracing.db')

    # livestock data
    livestock_query = "SELECT * FROM livestocks;"
    livestock_data = pd.read_sql(livestock_query, tracing_conn)

    # deforested areas data
    deforested_query = "SELECT * FROM deforestation_areas;"
    deforested_data = pd.read_sql(deforested_query, tracing_conn)

    tracing_conn.close()

    ### Extract the latitude and longitude pairs of livestock locations ###
    # get latitudes&longitudes
    livestock_lat = livestock_data['latitude'].tolist()
    livestock_lon = livestock_data['longitude'].tolist()
    # livestock_lat = []
    # livestock_lon = []
    # for livestock in Livestock.query.all():
    #     livestock_lat.append(livestock.latitude)
    #     livestock_lon.append(livestock.longitude)

    # Create a list of tuples for animal coordinates
    livestock_coordinates = list(zip(livestock_lat, livestock_lon))

    ###

    ### Extract the latitude and longitude pairs of deforested areas ###
    # get latitudes&longitudes
    deforested_lat = deforested_data['latitude'].tolist()
    deforested_lon = deforested_data['longitude'].tolist()
    # deforested_lat = []
    # deforested_lon = []
    # for def_area in DeforestationArea.query.all():
    #     deforested_lat.append(def_area.latitude)
    #     deforested_lon.append(def_area.longitude)

    # Create a list of tuples for coordinatesof deforested areas
    deforested_coordinates = list(zip(deforested_lat, deforested_lon))

    ###

    ### Calculate distance between livestock and deforested area ###
    # create an empty list to store lists of distances 
    livestock_distances = []
    
    # calculate distances and add to the list above
    for livestock_coord in livestock_coordinates:
        distances = [calculate_distance(livestock_coord, deforested_coord) for deforested_coord in deforested_coordinates]
        livestock_distances.append(distances)
        
    # create an array with the distances
    livestock_distances = np.array(livestock_distances)

    ###

    ### Define a buffer from the deforested area that defines Area of Risk
    # This basically tells me how many kms away from the deforested area
    # should we consider area of risk
    risk_buffer = 100

    #### Find the livestock in the areas at risk ###
    livestock_in_deforested_areas = livestock_data[np.min(livestock_distances, axis=1) <= risk_buffer].copy()

    # # Collect the animals at risk dataframe and use it to subset safe animals

    # Convert dataframe to JSON with formatted output
    json_data = livestock_in_deforested_areas.to_json(orient='records', indent=4)
    parsed_json = json.loads(json_data)
    formatted_json = json.dumps(parsed_json, indent=None)

    # Return JSON response
    return formatted_json

# Serve safe animals
@app.route("/safe_livestock")
def get_safe_livestock():
    
    ### Create a connection to the databases and extract all the data as a DataFrame ###
    # Livestock and Deforested Area data
    tracing_conn = sqlite3.connect('./instance/livestock_tracing.db')

    # livestock data
    livestock_query = "SELECT * FROM livestocks;"
    livestock_data = pd.read_sql(livestock_query, tracing_conn)

    tracing_conn.close()

    ###

    return "Kimeumana"

if __name__ == '__main__':
    app.run(port=5555, debug=True)
