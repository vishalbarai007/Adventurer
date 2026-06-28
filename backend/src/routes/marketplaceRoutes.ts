import { Router, Response, Request } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db, admin } from '../config/firebase';
import { GuideBooking, GuideReview, UserDocument } from '../types/schema';

const router = Router();

// Helper: update booking status inside a user's activity array
const updateActivityBooking = async (userId: string, bookingId: string, updates: Partial<any>) => {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await userRef.get();
  if (userDoc.exists) {
    const data = userDoc.data();
    const activity = data?.activity || [];
    let updated = false;
    const newActivity = activity.map((act: any) => {
      if (act.bookingId === bookingId) {
        updated = true;
        return { ...act, ...updates };
      }
      return act;
    });
    if (updated) {
      await userRef.update({ activity: newActivity });
    }
  }
};

// 1. POST /api/users/onboarding-progression
router.post('/users/onboarding-progression', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { role, onboardingProgress, travelerProfile, organizationProfile, guideProfile } = req.body;

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentData = userDoc.data();
    const updateData: any = {
      onboardingProgress: onboardingProgress ?? 100,
      onboardingCompleted: (onboardingProgress ?? 100) === 100 ? true : false,
      profileCompleted: (onboardingProgress ?? 100) === 100 ? true : false,
    };

    if (role === 'traveler') {
      updateData.travelerProfile = {
        ...(currentData?.travelerProfile || {}),
        ...travelerProfile
      };
    } else if (role === 'organizer') {
      updateData.organizationProfile = {
        ...(currentData?.organizationProfile || {}),
        ...organizationProfile,
        isVerified: currentData?.organizationProfile?.isVerified ?? false
      };
    } else if (role === 'guide') {
      updateData.guideProfile = {
        ...(currentData?.guideProfile || {}),
        ...guideProfile,
        averageRating: currentData?.guideProfile?.averageRating ?? 0,
        totalReviews: currentData?.guideProfile?.totalReviews ?? 0,
        isActiveListing: guideProfile?.isActiveListing ?? true
      };
    }

    await userRef.update(updateData);
    return res.status(200).json({ message: 'Onboarding progress updated successfully', onboardingProgress: updateData.onboardingProgress });
  } catch (error: any) {
    console.error('Onboarding progression error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 2. POST /api/bookings/guide-reserve
router.post('/bookings/guide-reserve', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const travelerId = req.user?.id;
    if (!travelerId) return res.status(401).json({ error: 'Unauthorized' });

    const { guideId, trekLocation, bookingDate } = req.body;
    if (!guideId || !trekLocation || !bookingDate) {
      return res.status(400).json({ error: 'Guide ID, trek location and booking date are required' });
    }

    // Get traveler info
    const travelerDoc = await db.collection('users').doc(travelerId).get();
    if (!travelerDoc.exists) return res.status(404).json({ error: 'Traveler not found' });
    const travelerData = travelerDoc.data();
    const travelerName = travelerData?.name || 'Anonymous Traveler';

    // Get guide info
    const guideDoc = await db.collection('users').doc(guideId).get();
    if (!guideDoc.exists) return res.status(404).json({ error: 'Guide not found' });
    const guideData = guideDoc.data();
    const guideName = guideData?.name || 'Local Guide';

    const bookingRef = db.collection('guideBookings').doc();
    const bookingId = bookingRef.id;

    const bookingData: GuideBooking = {
      bookingId,
      travelerId,
      travelerName,
      guideId,
      guideName,
      trekLocation,
      bookingDate,
      amountPaid: 1000, // ₹1,000 held in escrow
      escrowStatus: 'Held',
      hasLeftReview: false,
      createdAt: new Date().toISOString()
    };

    await bookingRef.set(bookingData);

    // Create activity log reference point
    const activityLog = {
      type: 'guide_booking',
      bookingId,
      travelerId,
      travelerName,
      guideId,
      guideName,
      trekLocation,
      bookingDate,
      amountPaid: 1000,
      escrowStatus: 'Held',
      hasLeftReview: false,
      timestamp: new Date().toISOString()
    };

    // Update traveler's activity
    await db.collection('users').doc(travelerId).update({
      activity: admin.firestore.FieldValue.arrayUnion(activityLog)
    });

    // Update guide's activity
    await db.collection('users').doc(guideId).update({
      activity: admin.firestore.FieldValue.arrayUnion(activityLog)
    });

    return res.status(200).json(bookingData);
  } catch (error: any) {
    console.error('Guide reservation error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 3. POST /api/bookings/release-escrow
router.post('/bookings/release-escrow', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { bookingId } = req.body;
    if (!bookingId) return res.status(400).json({ error: 'Booking ID is required' });

    const bookingRef = db.collection('guideBookings').doc(bookingId);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) return res.status(404).json({ error: 'Booking not found' });
    const bookingData = bookingDoc.data() as GuideBooking;

    if (bookingData.travelerId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to release this escrow' });
    }

    if (bookingData.escrowStatus !== 'Held') {
      return res.status(400).json({ error: `Escrow status is already: ${bookingData.escrowStatus}` });
    }

    // Release escrow
    await bookingRef.update({ escrowStatus: 'Released' });

    // Update status in both user activities
    await updateActivityBooking(bookingData.travelerId, bookingId, { escrowStatus: 'Released' });
    await updateActivityBooking(bookingData.guideId, bookingId, { escrowStatus: 'Released' });

    return res.status(200).json({ message: 'Escrow released successfully' });
  } catch (error: any) {
    console.error('Release escrow error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 4. POST /api/reviews/submit (Verified review loop with gatekeeper check)
router.post('/reviews/submit', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const travelerId = req.user?.id;
    if (!travelerId) return res.status(401).json({ error: 'Unauthorized' });

    const { guideId, ratings, reviewText } = req.body;
    if (!guideId || !ratings || !reviewText) {
      return res.status(400).json({ error: 'Guide ID, ratings, and review text are required' });
    }

    const { safety, womenSafety, languageClarity } = ratings;
    if (
      typeof safety !== 'number' || safety < 1 || safety > 5 ||
      typeof womenSafety !== 'number' || womenSafety < 1 || womenSafety > 5 ||
      typeof languageClarity !== 'number' || languageClarity < 1 || languageClarity > 5
    ) {
      return res.status(400).json({ error: 'Ratings must be numbers between 1 and 5' });
    }

    // GATEKEEPER: check that a matching booking exists with escrowStatus === 'Released' and hasLeftReview === false
    const bookingsSnapshot = await db.collection('guideBookings')
      .where('travelerId', '==', travelerId)
      .where('guideId', '==', guideId)
      .where('escrowStatus', '==', 'Released')
      .where('hasLeftReview', '==', false)
      .limit(1)
      .get();

    if (bookingsSnapshot.empty) {
      return res.status(403).json({
        error: 'Anti-Fraud Gatekeeper: Review blocked. You must have a completed booking (Released escrow) with this guide and have not reviewed it yet.'
      });
    }

    const bookingDoc = bookingsSnapshot.docs[0];
    const bookingId = bookingDoc.id;
    const bookingData = bookingDoc.data() as GuideBooking;

    // Calculate overall rating
    const overall = parseFloat(((safety + womenSafety + languageClarity) / 3).toFixed(2));

    // Get traveler info
    const travelerDoc = await db.collection('users').doc(travelerId).get();
    const travelerName = travelerDoc.data()?.name || 'Anonymous Traveler';

    const reviewRef = db.collection('guideReviews').doc();
    const reviewId = reviewRef.id;

    const reviewData: GuideReview = {
      reviewId,
      bookingId,
      travelerId,
      travelerName,
      guideId,
      ratings: {
        safety,
        womenSafety,
        languageClarity,
        overall
      },
      reviewText,
      createdAt: new Date().toISOString()
    };

    // Save review
    await reviewRef.set(reviewData);

    // Update hasLeftReview in booking
    await bookingDoc.ref.update({ hasLeftReview: true });

    // Update hasLeftReview in user activities
    await updateActivityBooking(travelerId, bookingId, { hasLeftReview: true });
    await updateActivityBooking(guideId, bookingId, { hasLeftReview: true });

    // TRIGGERS guide's rating and reviews recalculation
    const reviewsSnapshot = await db.collection('guideReviews').where('guideId', '==', guideId).get();
    const allReviews = reviewsSnapshot.docs.map(doc => doc.data() as GuideReview);
    const totalReviews = allReviews.length;
    const averageRating = totalReviews > 0
      ? parseFloat((allReviews.reduce((sum, rev) => sum + rev.ratings.overall, 0) / totalReviews).toFixed(2))
      : 0;

    await db.collection('users').doc(guideId).update({
      'guideProfile.averageRating': averageRating,
      'guideProfile.totalReviews': totalReviews
    });

    return res.status(200).json(reviewData);
  } catch (error: any) {
    console.error('Review submit error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 5. GET /api/guides (Filterable App Store grid search)
router.get('/guides', async (req: Request, res: Response) => {
  try {
    const { nativeLocation, language, maxPrice } = req.query;

    let query: admin.firestore.Query = db.collection('users').where('role', '==', 'guide');

    const snapshot = await query.get();
    let guides = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // In-memory filters for flexible substring/array checks
    if (nativeLocation) {
      const locFilter = (nativeLocation as string).toLowerCase();
      guides = guides.filter((g: any) => g.guideProfile?.nativeLocation?.toLowerCase().includes(locFilter));
    }

    if (language) {
      const langFilter = (language as string).toLowerCase();
      guides = guides.filter((g: any) => 
        g.guideProfile?.languagesSpoken?.some((l: string) => l.toLowerCase() === langFilter)
      );
    }

    if (maxPrice) {
      const priceFilter = parseFloat(maxPrice as string);
      guides = guides.filter((g: any) => (g.guideProfile?.pricePerTrek ?? 0) <= priceFilter);
    }

    // Filter out guides without a listing profile setup
    guides = guides.filter((g: any) => g.guideProfile);

    return res.status(200).json(guides);
  } catch (error: any) {
    console.error('Get guides error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 6. GET /api/guides/:id/reviews
router.get('/guides/:id/reviews', async (req: Request, res: Response) => {
  try {
    const guideId = req.params.id;
    const snapshot = await db.collection('guideReviews').where('guideId', '==', guideId).get();
    const reviews = snapshot.docs.map(doc => doc.data() as GuideReview);
    return res.status(200).json(reviews);
  } catch (error: any) {
    console.error('Get guide reviews error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// 7. POST /api/reviews/:id/reply
router.post('/reviews/:id/reply', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const guideId = req.user?.id;
    if (!guideId) return res.status(401).json({ error: 'Unauthorized' });

    const reviewId = req.params.id as string;
    const { replyText } = req.body;

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ error: 'Reply text is required' });
    }

    const reviewRef = db.collection('guideReviews').doc(reviewId);
    const reviewDoc = await reviewRef.get();

    if (!reviewDoc.exists) return res.status(404).json({ error: 'Review not found' });
    const reviewData = reviewDoc.data() as GuideReview;

    if (reviewData.guideId !== guideId) {
      return res.status(403).json({ error: 'Only the assigned guide can reply to this review' });
    }

    await reviewRef.update({ replyText: replyText.trim() });
    return res.status(200).json({ message: 'Reply posted successfully', replyText: replyText.trim() });
  } catch (error: any) {
    console.error('Reply post error:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
