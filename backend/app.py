# import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from models import db

# create an instance of Flask
app = Flask(__name__)

# configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///livestock_tracing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# set up migrations using the Flask application instance and the SQLAlchemy instance
migrate = Migrate(app, db)

# initialize application for use within our database configuration
db.init_app(app)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
