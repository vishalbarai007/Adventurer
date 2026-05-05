import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';

const router = Router();

router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData: any = userDoc.data();
      return res.json({
        id: userId, // Keep id as requested by frontend
        email: userData.email,
        profile_picture: userData.profile_picture,
        name: userData.name
      });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const updateData = req.body;
    await db.collection('users').doc(userId).update(updateData);

    return res.json({ message: 'Profile updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
