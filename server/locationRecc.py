from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import requests
import logging
from flask import jsonify, request
from functools import lru_cache

class LocationRecommender:
    def __init__(self, db_firebase):
        self.db = db_firebase
        self.geolocator = Nominatim(user_agent="tourist_recommender")

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

    def get_tourist_spots(self):
        """Fetch tourist spots from Firebase"""
        try:
            spots_ref = self.db.collection('Famous_Places')  # Fetch from Famous_Places collection
            spots = spots_ref.get()
            return [{
                'id': spot.id,
                'name': spot.to_dict().get('Place_Name'),
                'latitude': spot.to_dict().get('latitude'),
                'longitude': spot.to_dict().get('longitude'),
                'description': spot.to_dict().get('Description', ''),
                'rating': spot.to_dict().get('rating', 0)
            } for spot in spots]
        except Exception as e:
            logging.error(f"Error fetching tourist spots: {str(e)}")
            return []

    def find_nearby_spots(self, user_location, max_distance=20):
        """Find tourist spots within specified straight-line distance"""
        tourist_spots = self.get_tourist_spots()
        nearby_spots = []
        all_spots_with_distance = []

        for spot in tourist_spots:
            # Skip spots with missing coordinates
            if not spot.get('latitude') or not spot.get('longitude'):
                continue

            # Calculate straight-line distance using geodesic
            straight_distance = geodesic(
                (user_location['latitude'], user_location['longitude']),
                (spot['latitude'], spot['longitude'])
            ).km

            # Add distance to the spot data
            spot['distance'] = round(straight_distance, 2)
            all_spots_with_distance.append(spot)

            # If the straight-line distance is within the max_distance, add it to the nearby_spots list
            if straight_distance <= max_distance:
                nearby_spots.append(spot)

        # If no spots are within the max_distance, return the top 5 closest spots
        if not nearby_spots:
            print("No spots found within the specified range. Returning the top 5 closest spots.")
            nearby_spots = sorted(all_spots_with_distance, key=lambda x: x['distance'])[:5]

        # Sort by distance
        return sorted(nearby_spots, key=lambda x: x['distance'])

def create_flask_routes(app, db_firebase):
    """Create Flask routes for location recommendations"""
    recommender = LocationRecommender(db_firebase)

    @app.route("/api/nearby-spots", methods=["POST"])
    def get_nearby_spots():
        try:
            data = request.json
            user_coords = data.get('coordinates')

            # If browser coordinates are provided, use them
            if user_coords and 'latitude' in user_coords and 'longitude' in user_coords:
                user_location = {
                    'latitude': float(user_coords['latitude']),
                    'longitude': float(user_coords['longitude'])
                }
            else:
                # If browser coordinates are not provided, fall back to IP-based location
                ip_address = request.remote_addr
                if ip_address == '127.0.0.1':
                    # For development, use a default location
                    user_location = {
                        'latitude': 19.0760,
                        'longitude': 72.8777,
                        'city': 'Mumbai',
                        'region': 'Mumbai'
                    }
                else:
                    user_location = recommender.get_location_from_ip(ip_address)

                if not user_location:
                    # Provide a default location if all else fails
                    user_location = {
                        'latitude': 28.6139,
                        'longitude': 77.2090,
                        'city': 'New Delhi',
                        'region': 'Delhi'
                    }

            max_distance = data.get('maxDistance', 20)  # Default 20km
            nearby_spots = recommender.find_nearby_spots(user_location, max_distance)

            return jsonify({
                "user_location": user_location,
                "spots": nearby_spots
            })
        except Exception as e:
            logging.error(f"Error in nearby-spots endpoint: {str(e)}")
            return jsonify({"error": str(e)}), 500
