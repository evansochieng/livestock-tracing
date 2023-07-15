# Will hold all my helper functions.

### Function to calculate distance between points
import geopy.distance

# create a function to calculate the distance between deforested area and livestock
def calculate_distance(coord1, coord2):
    # Calculate the distance between livestock and deforested area
    return geopy.distance.geodesic(coord1, coord2).km