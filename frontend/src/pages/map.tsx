import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in Leaflet with React
// (This is needed because the default icons use relative paths that don't work in a bundled app)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TouristSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  rating: number;
  distance: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
}

// Component to recenter map when user location changes
const MapRecenter = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

// Component to store map reference
const MapRef = ({ setMapRef }: { setMapRef: (map: L.Map) => void }) => {
  const map = useMap();
  
  useEffect(() => {
    setMapRef(map);
  }, [map, setMapRef]);
  
  return null;
};

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(userCoords);
          fetchNearbySpots(userCoords);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to IP-based location via our backend
          fetchNearbySpots(null);
          setError("Could not access your location. Using approximate location from IP.");
        }
      );
    } else {
      // Fallback to IP-based location
      fetchNearbySpots(null);
      setError("Your browser doesn't support geolocation. Using approximate location from IP.");
    }
  };

  const fetchNearbySpots = async (coordinates: { latitude: number; longitude: number } | null) => {
    try {
      const response = await axios.post('/api/nearby-spots', {
        coordinates,
        maxDistance
      });
      
      if (response.data && response.data.spots) {
        setSpots(response.data.spots);
        
        // If we didn't have user location and the backend provided one based on IP
        if (!userLocation && response.data.user_location) {
          setUserLocation(response.data.user_location);
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching nearby spots:", err);
      setError("Failed to fetch nearby tourist spots.");
      setLoading(false);
    }
  };

  // Get user location and fetch spots on initial load
  useEffect(() => {
    getUserLocation();
  }, []);

  // Refetch when max distance changes
  useEffect(() => {
    if (userLocation) {
      fetchNearbySpots(userLocation);
    }
  }, [maxDistance]);

  // Create a custom icon for the user
  const userIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: 'text-blue-500 bg-white rounded-full border-2 border-blue-500'
  });

  // Create a custom icon for tourist spots
  const touristIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: 'text-red-500 bg-white rounded-full border-2 border-red-500'
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-800">Nearby Tourist Spots</h1>
        <div className="mt-2 flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="maxDistance" className="block text-sm font-medium text-gray-700">
              Search Radius (km)
            </label>
            <input
              type="range"
              id="maxDistance"
              min="5"
              max="50"
              step="5"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="mt-1 block w-full"
            />
            <span className="text-sm text-gray-500">{maxDistance} km</span>
          </div>
          <button
            onClick={() => getUserLocation()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Refresh Location
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        <div className="w-2/3 h-full relative">
          {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : userLocation ? (
            <MapContainer
              center={[userLocation.latitude, userLocation.longitude]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Store map reference */}
              <MapRef setMapRef={setMapInstance} />
              
              {/* Recenter map when user location changes */}
              <MapRecenter position={[userLocation.latitude, userLocation.longitude]} />
              
              {/* User location marker */}
              <Marker 
                position={[userLocation.latitude, userLocation.longitude]}
                icon={userIcon}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">Your Location</h3>
                    {userLocation.city && (
                      <p>{userLocation.city}, {userLocation.region}</p>
                    )}
                  </div>
                </Popup>
              </Marker>

              {/* Tourist spot markers */}
              {spots.map((spot) => (
                <Marker
                  key={spot.id}
                  position={[spot.latitude, spot.longitude]}
                  icon={touristIcon}
                >
                  <Popup>
                    <div className="max-w-xs">
                      <h3 className="font-bold text-lg">{spot.name}</h3>
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(spot.rating) ? "text-yellow-500" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">({spot.rating.toFixed(1)})</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{spot.description.substring(0, 150)}...</p>
                      <p className="text-sm font-medium">Distance: {spot.distance} km</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p>Location data is unavailable</p>
            </div>
          )}
        </div>

        {/* Sidebar with spot list */}
        <div className="w-1/3 bg-white shadow-inner overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Tourist Spots ({spots.length})</h2>
            
            {spots.length === 0 && !loading ? (
              <p className="text-gray-500">No tourist spots found nearby</p>
            ) : (
              <ul className="space-y-4">
                {spots.map((spot) => (
                  <li 
                    key={spot.id} 
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => {
                      if (mapInstance) {
                        mapInstance.setView([spot.latitude, spot.longitude], 15);
                      }
                    }}
                  >
                    <h3 className="font-bold">{spot.name}</h3>
                    <div className="flex items-center my-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(spot.rating) ? "text-yellow-500" : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-600">({spot.rating.toFixed(1)})</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{spot.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {spot.distance} km away
                      </span>
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (mapInstance) {
                            mapInstance.setView([spot.latitude, spot.longitude], 15);
                          }
                        }}
                      >
                        View on map
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;