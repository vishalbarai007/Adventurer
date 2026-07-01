// import { Router, Response } from 'express';
// import { authenticateToken, AuthRequest } from '../middleware/auth';
// import { db } from '../config/firebase';

// const router = Router();

// router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//     const userDoc = await db.collection('users').doc(userId).get();
//     if (userDoc.exists) {
//       const userData: any = userDoc.data();
//       return res.json({
//         id: userId,
//         email: userData.email,
//         profile_picture: userData.profile_picture,
//         name: userData.name,
//         role: userData.role,
//         profileCompleted: userData.profileCompleted ?? false,
//         onboardingCompleted: userData.onboardingCompleted ?? false,
//         socialLinks: userData.socialLinks || {
//           instagramUsername: null,
//           instagramProfileUrl: null,
//           isInstagramLinked: false
//         },
//         gender: userData.gender || null,
//         dateOfBirth: userData.dateOfBirth || null,
//         residentialAddress: userData.residentialAddress || null,
//         emergencyContact: userData.emergencyContact || {
//           name: '',
//           phone: '',
//           relation: ''
//         },
//         businessDetails: userData.businessDetails || null
//       });
//     }
//     return res.status(404).json({ error: 'User not found' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) return res.status(401).json({ error: 'Unauthorized' });

//     const updateData = { ...req.body };
//     delete updateData.id;
//     delete updateData.uid;
//     delete updateData.email;
//     delete updateData.role;
//     delete updateData.authProvider;

//     // Retain existing businessDetails.isVerified
//     if (updateData.businessDetails) {
//       const userDoc = await db.collection('users').doc(userId).get();
//       const currentData = userDoc.data();
//       updateData.businessDetails.isVerified = currentData?.businessDetails?.isVerified ?? false;
//     }

//     await db.collection('users').doc(userId).update(updateData);

//     return res.json({ message: 'Profile updated successfully' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get('/:id/public-profile', async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.params.id as string;
//     const userDoc = await db.collection('users').doc(userId).get();
//     if (userDoc.exists) {
//       const data = userDoc.data();
//       return res.json({
//         id: userId,
//         name: data?.name || '',
//         socialLinks: data?.socialLinks || {
//           instagramUsername: null,
//           instagramProfileUrl: null,
//           isInstagramLinked: false
//         },
//         profile_picture: data?.profile_picture || null
//       });
//     }
//     return res.status(404).json({ error: 'User not found' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;


import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db } from '../config/firebase';

const router = Router();

// PUT /api/user/profile/update -> Progressive onboarding tracking handler
router.put('/profile/update', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized: Missing session token payload' });

    const { step, isSkipped, ...formData } = req.body;
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) return res.status(404).json({ error: 'User account not found' });
    const userData = userDoc.data();
    const role = userData?.role || 'traveler';

    let updates: any = {
      last_updated: new Date().toISOString()
    };

    // Dynamic mathematical tracking of wizard progression steps
    if (step === 2) {
      updates.onboardingProgress = 66; // Completed step 1 (33%) and step 2 (33%)
    } else if (step === 3) {
      updates.onboardingProgress = 100; // All wizard components executed
      if (role === 'traveler') {
        updates.profileCompleted = !isSkipped;
      } else {
        updates.onboardingCompleted = !isSkipped;
      }
    }

    // Save profile attributes if the user did not click 'Skip for Now'
    if (!isSkipped) {
      if (role === 'traveler') {
        updates.travelerProfile = {
          ...userData?.travelerProfile,
          travelStyle: formData.travelStyle || userData?.travelerProfile?.travelStyle || '',
          budget: Number(formData.budget) || userData?.travelerProfile?.budget || 25000,
          duration: formData.duration || userData?.travelerProfile?.duration || '',
          userTags: formData.tags || userData?.travelerProfile?.userTags || []
        };
      } else if (role === 'organizer') {
        updates.organizationProfile = {
          ...userData?.organizationProfile,
          companyName: formData.companyName || userData?.organizationProfile?.companyName || '',
          gstNumber: formData.gstNumber || userData?.organizationProfile?.gstNumber || '',
          tripsConducted: Number(formData.tripsConducted) || userData?.organizationProfile?.tripsConducted || 0,
          touristsHelped: Number(formData.touristsHelped) || userData?.organizationProfile?.touristsHelped || 0,
          teamSize: Number(formData.teamSize) || userData?.organizationProfile?.teamSize || 1,
          specialityTags: formData.tags || userData?.organizationProfile?.specialityTags || [],
          statesCovered: formData.statesCovered || userData?.organizationProfile?.statesCovered || []
        };
      } else if (role === 'guide') {
        updates.guideProfile = {
          ...userData?.guideProfile,
          nativeLocation: formData.nativeLocation || userData?.guideProfile?.nativeLocation || '',
          languagesSpoken: formData.languagesSpoken || userData?.guideProfile?.languagesSpoken || [],
          availability: formData.availability || userData?.guideProfile?.availability || 'all',
          pricePerTrek: Number(formData.pricePerTrek) || userData?.guideProfile?.pricePerTrek || 1000
        };
      }
    }

    await userRef.update(updates);
    return res.status(200).json({ 
      message: 'Profile metrics updated successfully', 
      onboardingProgress: updates.onboardingProgress 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;