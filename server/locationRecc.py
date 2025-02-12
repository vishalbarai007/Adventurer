from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from firebase_admin import firestore
import requests
import json
from functools import lru_cache
import logging

class LocationRecommender:
    def __init__(self, db_firebase):
        self.db = db_firebase
        self.geolocator = Nominatim(user_agent="tourist_recommender")
        self.GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"  # You'll need to add this

    @lru_cache(maxsize=100)
    def get_location_from_ip(self, ip_address):
        """Get location from IP address using ipapi.co service"""
        try:
            response = requests.get(f'https://ipapi.co/{ip_address}/json/')
            if response.status_code == 200:
                data = response.json()
                return {
                    'latitude': float(data.get('latitude')),
                    'longitude': float(data.get('longitude')),
                    'city': data.get('city'),
                    'region': data.get('region')
                }
            return None
        except Exception as e:
            logging.error(f"Error getting location from IP: {str(e)}")
            return None

    def get_driving_distance(self, origin, destination):
        """Calculate driving distance using Google Maps Distance Matrix API"""
        try:
            origin_str = f"{origin['latitude']},{origin['longitude']}"
            dest_str = f"{destination['latitude']},{destination['longitude']}"

            url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin_str}&destinations={dest_str}&mode=driving&key={self.GOOGLE_MAPS_API_KEY}"

            response = requests.get(url)
            data = response.json()

            if data['status'] == 'OK':
                distance = data['rows'][0]['elements'][0]['distance']['value'] / 1000  # Convert to km
                return distance
            return None
        except Exception as e:
            logging.error(f"Error calculating driving distance: {str(e)}")
            return None

    def get_tourist_spots(self):
        """Fetch tourist spots from Firebase"""
        try:
            spots_ref = self.db.collection('tourist_spots')
            spots = spots_ref.get()
            return [{
                'id': spot.id,
                'name': spot.to_dict().get('name'),
                'latitude': spot.to_dict().get('latitude'),
                'longitude': spot.to_dict().get('longitude'),
                'description': spot.to_dict().get('description'),
                'rating': spot.to_dict().get('rating', 0)
            } for spot in spots]
        except Exception as e:
            logging.error(f"Error fetching tourist spots: {str(e)}")
            return []

    def find_nearby_spots(self, user_location, max_distance=20):
        """Find tourist spots within specified distance"""
        tourist_spots = self.get_tourist_spots()
        nearby_spots = []

        for spot in tourist_spots:
            # First do a rough check using straight-line distance
            straight_distance = geodesic(
                (user_location['latitude'], user_location['longitude']),
                (spot['latitude'], spot['longitude'])
            ).km

            # If straight-line distance is within 1.5x max_distance, check driving distance
            if straight_distance <= max_distance * 1.5:
                driving_distance = self.get_driving_distance(
                    user_location,
                    {'latitude': spot['latitude'], 'longitude': spot['longitude']}
                )

                if driving_distance and driving_distance <= max_distance:
                    spot['distance'] = round(driving_distance, 2)
                    nearby_spots.append(spot)

        # Sort by distance
        return sorted(nearby_spots, key=lambda x: x['distance'])

def create_flask_routes(app, db_firebase):
    """Create Flask routes for location recommendations"""
    recommender = LocationRecommender(db_firebase)

    @app.route("/api/nearby-spots", methods=["POST"])
    def get_nearby_spots():
        data = request.json
        user_coords = data.get('coordinates')

        # If browser coordinates are provided
        if user_coords and 'latitude' in user_coords and 'longitude' in user_coords:
            user_location = {
                'latitude': float(user_coords['latitude']),
                'longitude': float(user_coords['longitude'])
            }
        else:
            # Get location from IP
            ip_address = request.remote_addr
            user_location = recommender.get_location_from_ip(ip_address)

            if not user_location:
                return jsonify({
                    "error": "Could not determine location"
                }), 400

        max_distance = data.get('maxDistance', 20)  # Default 20km
        nearby_spots = recommender.find_nearby_spots(user_location, max_distance)

        return jsonify({
            "user_location": user_location,
            "spots": nearby_spots
        })
