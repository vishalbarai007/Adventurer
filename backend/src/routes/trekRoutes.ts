import { Router, Response } from 'express';
import { authenticateToken, checkRole, AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';

const router = Router();

router.get('/my-listings', authenticateToken, async (req: AuthRequest, res: Response) => {
  const userId = req.query.userId || req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const snapshot = await db.collection('listings').where('organizerId', '==', userId).get();
    const listings: any[] = [];
    snapshot.forEach(doc => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json(listings);
  } catch (error: any) {
    console.error(`Error fetching my listings: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

// For creating a listing, enforce organizer role
router.post('/listings', authenticateToken, checkRole(['organizer', 'vendor']), async (req: AuthRequest, res: Response) => {
  const userId = req.body.organizerId || req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const data = req.body;
    const listingRef = db.collection('listings').doc();
    const listingData = {
      listingId: listingRef.id,
      organizerId: userId,
      type: data.type || "trek",
      title: data.title || "New Trip",
      price: data.price || 0,
      location: data.location || {},
      slots: data.slots || 0,
      images: data.images || [],
      createdAt: new Date()
    };
    
    await listingRef.set(listingData);
    return res.status(201).json(listingData);
  } catch (error: any) {
    console.error(`Error creating listing: ${error}`);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
