import { Router, Request, Response } from 'express';
import { LocationRecommender } from '../utils/geo';

const router = Router();
const recommender = new LocationRecommender();

router.post('/nearby-spots', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userCoords = data.coordinates;
    let userLocation: any = null;

    if (userCoords && userCoords.latitude && userCoords.longitude) {
      userLocation = {
        latitude: parseFloat(userCoords.latitude),
        longitude: parseFloat(userCoords.longitude)
      };
    } else {
      let ipAddress = req.ip || req.socket.remoteAddress;
      // Handle IPv4 mapped IPv6
      if (ipAddress && ipAddress.includes('::ffff:')) {
        ipAddress = ipAddress.split('::ffff:')[1];
      }
      
      if (ipAddress === '127.0.0.1' || ipAddress === '::1' || !ipAddress) {
        userLocation = {
          latitude: 19.0760,
          longitude: 72.8777,
          city: 'Mumbai',
          region: 'Maharashtra'
        };
      } else {
        userLocation = await recommender.getLocationFromIp(ipAddress);
      }

      if (!userLocation) {
        userLocation = {
          latitude: 28.6139,
          longitude: 77.2090,
          city: 'New Delhi',
          region: 'Delhi'
        };
      }
    }

    const maxDistance = data.maxDistance || 20;
    const nearbySpots = await recommender.findNearbySpots(userLocation, maxDistance);

    return res.json({
      user_location: userLocation,
      spots: nearbySpots
    });

  } catch (error: any) {
    console.error(`Error in nearby-spots endpoint: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
