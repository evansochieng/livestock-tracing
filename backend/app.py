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
    return '<h1>Welcome to the Livestock Information System!</h1>'

@app.route('/deforested_areas')
def deforested_areas():
    d_areas = []
    for d_area in DeforestationArea.query.all():
        d_area_dict = {
            "latitude": d_area.latitude,
            "longitude": d_area.longitude,
            "area": d_area.area
        }
        d_areas.append(d_area_dict)

    # response_body = f'''
    #     <h1>Area 1 has {d_areas[0].area} KM2 under deforestation.</h1>
    #     <h2>Area 2 has {d_areas[1].area} KM2 deforested.</h2>
    #     <h2>Area 3 has  {d_areas[2].area} KM2 deforested.</h2>
    # '''
    response = make_response(
        jsonify(d_areas),
        200
    )
    
    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
