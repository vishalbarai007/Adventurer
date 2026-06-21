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
        id: userId,
        email: userData.email,
        profile_picture: userData.profile_picture,
        name: userData.name,
        role: userData.role,
        profileCompleted: userData.profileCompleted ?? false,
        onboardingCompleted: userData.onboardingCompleted ?? false,
        socialLinks: userData.socialLinks || {
          instagramUsername: null,
          instagramProfileUrl: null,
          isInstagramLinked: false
        },
        gender: userData.gender || null,
        dateOfBirth: userData.dateOfBirth || null,
        residentialAddress: userData.residentialAddress || null,
        emergencyContact: userData.emergencyContact || {
          name: '',
          phone: '',
          relation: ''
        },
        businessDetails: userData.businessDetails || null
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

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.uid;
    delete updateData.email;
    delete updateData.role;
    delete updateData.authProvider;

    // Retain existing businessDetails.isVerified
    if (updateData.businessDetails) {
      const userDoc = await db.collection('users').doc(userId).get();
      const currentData = userDoc.data();
      updateData.businessDetails.isVerified = currentData?.businessDetails?.isVerified ?? false;
    }

    await db.collection('users').doc(userId).update(updateData);

    return res.json({ message: 'Profile updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/public-profile', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.params.id as string;
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const data = userDoc.data();
      return res.json({
        id: userId,
        name: data?.name || '',
        socialLinks: data?.socialLinks || {
          instagramUsername: null,
          instagramProfileUrl: null,
          isInstagramLinked: false
        },
        profile_picture: data?.profile_picture || null
      });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
