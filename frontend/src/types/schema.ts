export interface UserDocument {
  uid: string;
  email: string;
  name: string;
  role: 'traveler' | 'organizer' | 'guide'; 
  createdAt: string;
  lastLogin: string;
  onboardingProgress: number; // e.g., 33 for Step 1, 100 for Complete
  onboardingCompleted?: boolean;
  profile_picture?: string;
  authProvider?: string;
  activity?: any[];

  // 1. Traveler Preferences (Always active baseline)
  travelerProfile?: {
    userTags: string[]; // ['mountains', 'waterfalls', 'historical']
    gender?: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    emergencyContact?: { name: string; phone: string; relation: string; };
  };

  // 2. Organization Metrics (Populated if role === 'organizer')
  organizationProfile?: {
    companyName: string;
    gstNumber?: string; // Optional
    tripsConducted: number;
    touristsHelped: number;
    teamSize: number;
    specialityTags: string[]; // ['Extreme Trekking', 'Night Trails']
    statesCovered: string[]; // ['Maharashtra', 'Goa']
    isVerified: boolean;
    experienceYears?: number;
  };

  // 3. Guide Marketplace Profile (Populated if role === 'guide')
  guideProfile?: {
    nativeLocation: string; // 'Matheran', 'Malshej Ghat'
    languagesSpoken: string[]; // ['Marathi', 'Hindi', 'English']
    availability: 'weekends' | 'weekdays' | 'all';
    pricePerTrek: number; // e.g., 1000
    averageRating: number; // Derived from reviews (0.0 - 5.0)
    totalReviews: number;
    isActiveListing: boolean;
    experienceYears?: number;
  };
}

export interface GuideBooking {
  bookingId: string;
  travelerId: string;
  travelerName: string;
  guideId: string;
  guideName: string;
  trekLocation: string;
  bookingDate: string;
  amountPaid: number;
  escrowStatus: 'Held' | 'Released' | 'Disputed';
  hasLeftReview: boolean;
  createdAt: string;
}

export interface GuideReview {
  reviewId: string;
  bookingId: string; // Links to transaction to prove legitimacy
  travelerId: string;
  travelerName: string;
  guideId: string;
  ratings: {
    safety: number;         // 1-5 Stars
    womenSafety: number;    // 1-5 Stars
    languageClarity: number;// 1-5 Stars
    overall: number;        // Derived average
  };
  reviewText: string;
  replyText?: string;      // Guide's response matching requirements
  createdAt: string;
}
