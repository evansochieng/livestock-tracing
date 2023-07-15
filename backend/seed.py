# import faker and random for seeding data
import random
from faker import Faker

from app import app
from models import db, Livestock, DeforestationArea

fake = Faker()

with app.app_context(): # ensures that application fail quickly if it is not configured

    # delete all records from the database
    Livestock.query.delete()
    DeforestationArea.query.delete()

    ###########
    # make list and add livestock data
    livestocks = []

    # Define coordinates range
    min_lat = -4.2
    max_lat = 1.2
    min_lon = 34.5
    max_lon = 40.0

    for n in range(100):
        livestock = Livestock(
            latitude=random.uniform(min_lat, max_lat),
            longitude=random.uniform(min_lon, max_lon),
            owner=f"{fake.first_name()} {fake.last_name()}",
            contact=int('2547' + str(fake.random_int(min=1000000, max=9999999)))
            )
        livestocks.append(livestock)

    db.session.add_all(livestocks)

    # make list and add deforestation areas - create 3 instances
    deforestation_areas = []

    deforested1 = DeforestationArea(
        latitude=0.28833218,
        longitude=34.853663252,
        area=630
    )
    deforestation_areas.append(deforested1)

    deforested2 = DeforestationArea(
        latitude=-1.23749905,
        longitude=36.82083005,
        area=2630
    )
    deforestation_areas.append(deforested2)

    deforested3 = DeforestationArea(
        latitude=-3.33333333,
        longitude=39.83333333,
        area=5803
    )
    deforestation_areas.append(deforested3)

    db.session.add_all(deforestation_areas)

    # commit the transaction
    db.session.commit()
