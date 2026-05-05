import { getDistance } from 'geolib';
import { db } from '../config/firebase';

export class LocationRecommender {
  
  async getLocationFromIp(ipAddress: string) {
    try {
      // Use node built-in fetch
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      if (response.ok) {
        const data: any = await response.json();
        if (data.error) return null;
        return {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city,
          region: data.region
        };
      }
      return null;
    } catch (e) {
      console.error(`Error getting location from IP: ${e}`);
      return null;
    }
  }

  async getTouristSpots() {
    try {
      const spotsRef = db.collection('Famous_Places');
      const snapshot = await spotsRef.get();
      const spots: any[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        spots.push({
          id: doc.id,
          name: data.Place_Name,
          latitude: data.latitude,
          longitude: data.longitude,
          description: data.Description || '',
          rating: data.rating || 0
        });
      });
      return spots;
    } catch (e) {
      console.error(`Error fetching tourist spots: ${e}`);
      return [];
    }
  }

  async findNearbySpots(userLocation: { latitude: number, longitude: number }, maxDistanceKm: number = 20) {
    const touristSpots = await this.getTouristSpots();
    let nearbySpots: any[] = [];
    const allSpotsWithDistance: any[] = [];

    for (const spot of touristSpots) {
      if (!spot.latitude || !spot.longitude) continue;

      // getDistance returns distance in meters
      const distanceMeters = getDistance(
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: spot.latitude, longitude: spot.longitude }
      );
      
      const distanceKm = Number((distanceMeters / 1000).toFixed(2));
      const spotWithDistance = { ...spot, distance: distanceKm };
      allSpotsWithDistance.push(spotWithDistance);

      if (distanceKm <= maxDistanceKm) {
        nearbySpots.push(spotWithDistance);
      }
    }

    if (nearbySpots.length === 0) {
      console.log("No spots found within the specified range. Returning the top 5 closest spots.");
      allSpotsWithDistance.sort((a, b) => a.distance - b.distance);
      nearbySpots = allSpotsWithDistance.slice(0, 5);
    } else {
      nearbySpots.sort((a, b) => a.distance - b.distance);
    }

    return nearbySpots;
  }
}
