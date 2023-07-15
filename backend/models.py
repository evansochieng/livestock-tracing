# structure the models here
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# create an Livestock class
class Livestock(db.Model):
    __tablename__ = 'livestocks'

    # add attributes
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    owner = db.Column(db.String, unique=True)
    contact = db.Column(db.Integer, unique=True)

    def __repr__(self):
        return f'<Livestock Owner {self.owner}>'

# create an Deforestation class
class DeforestationArea(db.Model):
    __tablename__ = 'deforestation_areas'

    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    area = db.Column(db.Integer)

    def __repr__(self):
        return f'<Deforested Area {self.area} square-km>'