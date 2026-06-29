"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/post-login/timeline/Sidebar"
import MobileNavbar from "@/components/profile/MobileNavbar"
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileTabs from "@/components/profile/ProfileTabs"
import PostGrid from "@/components/profile/PostGrid"
import UploadModal from "@/components/profile/UploadModal"
import CreateOptionsModal from "@/components/profile/CreateOptionsModal"
import type { Post } from "@/types/posts"
import { useAuth } from "@/contexts/AuthContext"
import httpClient from "@/services/httpClient"
import OnboardingWizard from "@/components/auth/OnboardingWizard"
import { 
  Star, Shield, MapPin, Calendar, DollarSign, X, Check, AlertTriangle, ArrowRight 
} from "lucide-react"

interface GuideBooking {
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

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [activeTab, setActiveTab] = useState("posts")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateOptions, setShowCreateOptions] = useState(false)
  const [selectedContentType, setSelectedContentType] = useState<"blog" | "image" | "video">("image")
  
  // Escrow & review states
  const [releaseLoading, setReleaseLoading] = useState<{ [bookingId: string]: boolean }>({});
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<GuideBooking | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showProgressDetailsModal, setShowProgressDetailsModal] = useState(false);
  
  // Review metrics
  const [safetyRating, setSafetyRating] = useState(5);
  const [womenSafetyRating, setWomenSafetyRating] = useState(5);
  const [languageClarityRating, setLanguageClarityRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      imageUrl: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056002/adventurer_assets_migration/images/Vishal_mzgtcl.png",
      caption: "Definition: A chudail is an individual who fuses elements of both gothic and grunge fashion styles.",
      likes: 245,
      comments: 32,
      title: "CHUDAIL",
      contentType: "image"
    },
    {
      id: "2",
      imageUrl: "/assets/Developers/Yug.png",
      caption: "Definition: A person who embraces a fashion style characterized by practicality, durability.",
      likes: 189,
      comments: 17,
      title: "FAQIR",
      contentType: "image"
    },
    {
      id: "3",
      imageUrl: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055942/adventurer_assets_migration/images/Rahul_piiquh.png",
      caption: "A Brief Journey Through 90s Counterculture",
      likes: 320,
      comments: 45,
      title: "GRUNGE",
      contentType: "blog"
    },
    {
      id: "4",
      imageUrl: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056002/adventurer_assets_migration/images/Vishal_mzgtcl.png",
      caption: "Dark aesthetics combined with laid-back vibes",
      likes: 178,
      comments: 23,
      title: "GOTHIC",
      contentType: "video"
    }
  ])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCreateClick = () => {
    setShowCreateOptions(true)
  }

  const handleOptionSelect = (option: "blog" | "image" | "video") => {
    setSelectedContentType(option)
    setShowCreateOptions(false)
    setShowUploadModal(true)
  }

  const handleUpload = (newPost: Post) => {
    setPosts([newPost, ...posts])
    setShowUploadModal(false)
  }

  const handleReleaseEscrow = async (bookingId: string) => {
    if (!confirm("Are you sure you want to release the ₹1,000 escrow? This will transfer funds to the guide.")) return;

    setReleaseLoading(prev => ({ ...prev, [bookingId]: true }));
    try {
      await httpClient.post("/api/bookings/release-escrow", { bookingId });
      await checkAuth(); // Refresh profile bookings activity status
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to release escrow. Please try again.");
    } finally {
      setReleaseLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleOpenReviewModal = (booking: GuideBooking) => {
    setSelectedBookingForReview(booking);
    setSafetyRating(5);
    setWomenSafetyRating(5);
    setLanguageClarityRating(5);
    setReviewText("");
    setReviewError("");
    setReviewSuccess(false);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReview) return;
    if (!reviewText.trim()) {
      setReviewError("Please write a small experience review first.");
      return;
    }

    setReviewLoading(true);
    setReviewError("");

    try {
      await httpClient.post("/api/reviews/submit", {
        guideId: selectedBookingForReview.guideId,
        ratings: {
          safety: safetyRating,
          womenSafety: womenSafetyRating,
          languageClarity: languageClarityRating
        },
        reviewText: reviewText.trim()
      });

      setReviewSuccess(true);
      await checkAuth(); // Updates traveler activity logs showing review left

      setTimeout(() => {
        setSelectedBookingForReview(null);
        setReviewSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setReviewError(err.response?.data?.error || "Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  };

  // Get active traveler bookings from context activity
  const travelerBookings: GuideBooking[] = (user?.activity || [])
    .filter((act: any) => act.type === 'guide_booking')
    .map((act: any) => ({
      bookingId: act.bookingId,
      travelerId: act.travelerId,
      travelerName: act.travelerName,
      guideId: act.guideId,
      guideName: act.guideName,
      trekLocation: act.trekLocation,
      bookingDate: act.bookingDate,
      amountPaid: act.amountPaid || 1000,
      escrowStatus: act.escrowStatus || 'Held',
      hasLeftReview: act.hasLeftReview || false,
      createdAt: act.timestamp || ''
    }));

  const StarSelector = ({ label, val, setVal }: { label: string, val: number, setVal: (v: number) => void }) => (
    <div>
      <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setVal(star)}
            className="hover:scale-110 transition-transform duration-100"
          >
            <Star className={`h-6 w-6 ${star <= val ? 'fill-amber-500 text-amber-500' : 'text-gray-300 dark:text-zinc-700'}`} />
          </button>
        ))}
      </div>
    </div>
  );

  const showProgressBanner = user?.onboardingProgress !== undefined && user.onboardingProgress < 100;
  const progressPercent = user?.onboardingProgress || 33;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <div className="hidden md:block absolute">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-[300px]">
          <ProfileHeader 
            isMobile={isMobile} 
            onCreateClick={handleCreateClick}
            onCompleteProfileClick={() => setShowProgressDetailsModal(true)}
          />

          {showProgressBanner && (
            <div className="mx-6 my-4 p-5 rounded-3xl bg-gradient-to-r from-emerald-950 to-zinc-900 border border-emerald-800/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Profile Completion: {progressPercent}%
                  </span>
                  <span className="text-xs text-gray-400">
                    {progressPercent === 33 ? "Step 1 of 3 complete" : "Step 2 of 3 complete"}
                  </span>
                </div>
                {/* Progress bar container */}
                <div className="w-full bg-emerald-950/60 border border-emerald-900/30 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-emerald-300/80 mt-2.5">
                  {progressPercent === 33 
                    ? "Complete your profile metrics (experience, capabilities) and preferences to unlock the trusted traveler status."
                    : "Almost there! Complete your activity preferences and specialties to finish setting up your account."}
                </p>
              </div>
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 whitespace-nowrap self-stretch md:self-center"
              >
                Complete Setup <ArrowRight size={14} />
              </button>
            </div>
          )}

          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} />

          {activeTab === "bookings" ? (
            <div className="px-6 py-4 max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-bold font-serif border-b dark:border-zinc-800 pb-2">Hired Trek Guides & Bookings</h2>
              
              {travelerBookings.length === 0 ? (
                <div className="bg-[#f8f9fa] dark:bg-[#121c15] p-12 text-center rounded-2xl border border-emerald-950/10 shadow-sm">
                  <p className="text-gray-500">You haven't hired any local guides yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {travelerBookings.map((b) => (
                    <div 
                      key={b.bookingId} 
                      className="bg-white dark:bg-[#121c15] p-5 rounded-2xl border border-emerald-900/10 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg font-serif">{b.guideName}</h3>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full mt-1 uppercase border border-amber-500/20">
                              <Shield size={10} /> Local Guide
                            </span>
                          </div>
                          
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border ${
                            b.escrowStatus === 'Held' 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                          }`}>
                            Escrow: {b.escrowStatus}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                          <div className="flex items-center gap-2">
                            <MapPin size={15} className="text-emerald-500" />
                            <span>Trek: <strong className="text-zinc-800 dark:text-white">{b.trekLocation}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={15} className="text-emerald-500" />
                            <span>Date: <strong className="text-zinc-800 dark:text-white">{b.bookingDate}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={15} className="text-emerald-500" />
                            <span>Amount: <strong className="text-zinc-800 dark:text-white">₹{b.amountPaid}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Escrow & Review CTA buttons */}
                      <div className="border-t dark:border-zinc-800/80 pt-4 mt-4 flex gap-2">
                        {b.escrowStatus === 'Held' && (
                          <button
                            onClick={() => handleReleaseEscrow(b.bookingId)}
                            disabled={releaseLoading[b.bookingId]}
                            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition"
                          >
                            {releaseLoading[b.bookingId] ? "Releasing..." : "Release Escrow"}
                          </button>
                        )}

                        {b.escrowStatus === 'Released' && !b.hasLeftReview && (
                          <button
                            onClick={() => handleOpenReviewModal(b)}
                            className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
                          >
                            <Star size={12} className="fill-white" /> Leave Verified Review
                          </button>
                        )}

                        {b.hasLeftReview && (
                          <div className="w-full text-center py-2 bg-gray-100 dark:bg-zinc-800/40 text-gray-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1">
                            <Check size={12} /> Feedback Submitted
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <PostGrid posts={posts} isMobile={isMobile} />
          )}
        </div>

        {isMobile && <MobileNavbar setShowUploadModal={() => handleCreateClick()} />}

        {showCreateOptions && (
          <CreateOptionsModal 
            onClose={() => setShowCreateOptions(false)} 
            onOptionSelect={handleOptionSelect} 
          />
        )}

        {showUploadModal && (
          <UploadModal 
            onClose={() => setShowUploadModal(false)} 
            onUpload={handleUpload} 
            contentType={selectedContentType}
          />
        )}
      </div>

      {/* Verified Rating Modal */}
      {selectedBookingForReview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#121c15] text-zinc-950 dark:text-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative border border-emerald-900/10">
            <button 
              onClick={() => setSelectedBookingForReview(null)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            {reviewSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto h-16 w-16 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center rounded-full text-emerald-600 dark:text-emerald-400">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold font-serif">Review Posted!</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400/80">Thank you for rating guide safety and communication clarity.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-serif">Verified Guide Review</h3>
                  <p className="text-xs text-gray-400 mt-1">Reviewing: <strong>{selectedBookingForReview.guideName}</strong></p>
                </div>

                {reviewError && (
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/20 rounded-xl p-3 text-xs text-red-600 dark:text-red-300 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="flex-shrink-0" />
                    <span>{reviewError}</span>
                  </div>
                )}

                <div className="space-y-3.5 bg-gray-50 dark:bg-[#1b271f] p-4 rounded-2xl border border-gray-100 dark:border-zinc-800/40">
                  <StarSelector label="Trek & Route Safety" val={safetyRating} setVal={setSafetyRating} />
                  <StarSelector label="Women Traveler Safety" val={womenSafetyRating} setVal={setWomenSafetyRating} />
                  <StarSelector label="Language / Communication" val={languageClarityRating} setVal={setLanguageClarityRating} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Write Your Experience</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell other travelers about this guide's knowledge, trails took, safety precautions, behavior..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {reviewLoading ? "Submitting Review..." : <>Submit Verified Review <Check size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Onboarding Wizard Modal */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl">
            <button 
              onClick={() => setShowOnboardingModal(false)}
              className="absolute right-4 top-4 text-emerald-300 hover:text-white z-10 p-1.5 bg-emerald-950/60 hover:bg-emerald-900 rounded-full transition"
            >
              <X size={20} />
            </button>
            <OnboardingWizard 
              onComplete={() => {
                setShowOnboardingModal(false);
                checkAuth();
              }}
            />
          </div>
        </div>
      )}

      {/* Profile Progress Details Modal */}
      {showProgressDetailsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-[#121c15] text-black dark:text-white rounded-3xl border border-emerald-800/20 p-6 shadow-2xl">
            <button 
              onClick={() => setShowProgressDetailsModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-emerald-400 dark:hover:text-white z-10 p-1 rounded-full"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold mb-4 font-serif text-[#012c18] dark:text-emerald-400">Profile Progress</h3>
            
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1.5">
                <span>Overall Completion</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-emerald-950/60 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-emerald-900/30 pt-4 mb-6">
              <h4 className="text-sm font-bold text-gray-700 dark:text-emerald-300 mb-3">Complete your Profile</h4>
              <ul className="space-y-3 text-xs">
                {/* Display list based on user role */}
                {user?.role === 'traveler' && (
                  <>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-emerald-500 font-bold">1</span> Biography / Name
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">30% (Completed)</span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.travelerProfile?.gender ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>2</span> Gender & DOB
                      </span>
                      <span className={`font-semibold ${user?.travelerProfile?.gender ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.travelerProfile?.gender ? "20% (Completed)" : "20% (Pending)"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.travelerProfile?.emergencyContact?.name ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>3</span> Emergency Contact
                      </span>
                      <span className={`font-semibold ${user?.travelerProfile?.emergencyContact?.name ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.travelerProfile?.emergencyContact?.name ? "20% (Completed)" : "20% (Pending)"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.travelerProfile?.userTags?.length ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>4</span> Preferences / Tags
                      </span>
                      <span className={`font-semibold ${user?.travelerProfile?.userTags?.length ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.travelerProfile?.userTags?.length ? "30% (Completed)" : "30% (Pending)"}
                      </span>
                    </li>
                  </>
                )}

                {user?.role === 'guide' && (
                  <>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-emerald-500 font-bold">1</span> Biography / Name
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">30% (Completed)</span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.guideProfile?.nativeLocation ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>2</span> Native Location
                      </span>
                      <span className={`font-semibold ${user?.guideProfile?.nativeLocation ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.guideProfile?.nativeLocation ? "30% (Completed)" : "30% (Pending)"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.guideProfile?.pricePerTrek ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>3</span> Guiding Price
                      </span>
                      <span className={`font-semibold ${user?.guideProfile?.pricePerTrek ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.guideProfile?.pricePerTrek ? "20% (Completed)" : "20% (Pending)"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.guideProfile?.languagesSpoken?.length ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>4</span> Languages Spoken
                      </span>
                      <span className={`font-semibold ${user?.guideProfile?.languagesSpoken?.length ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.guideProfile?.languagesSpoken?.length ? "20% (Completed)" : "20% (Pending)"}
                      </span>
                    </li>
                  </>
                )}

                {user?.role === 'organizer' && (
                  <>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className="text-emerald-500 font-bold">1</span> Company Name & GST
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">30% (Completed)</span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.organizationProfile?.experienceYears ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>2</span> Guiding Experience
                      </span>
                      <span className={`font-semibold ${user?.organizationProfile?.experienceYears ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.organizationProfile?.experienceYears ? "20% (Completed)" : "20% (Pending)"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.organizationProfile?.tripsConducted ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>3</span> Operations Metrics
                      </span>
                      <span className={`font-semibold ${user?.organizationProfile?.tripsConducted ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.organizationProfile?.tripsConducted ? "20% (Completed)" : "20% (Pending)"}
                      </span>
                    </li>
                    <li className="flex justify-between items-center py-1">
                      <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <span className={user?.organizationProfile?.specialityTags?.length ? "text-emerald-500 font-bold" : "text-gray-400 font-bold"}>4</span> Speciality & States
                      </span>
                      <span className={`font-semibold ${user?.organizationProfile?.specialityTags?.length ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`}>
                        {user?.organizationProfile?.specialityTags?.length ? "30% (Completed)" : "30% (Pending)"}
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button 
              onClick={() => {
                setShowProgressDetailsModal(false);
                setShowOnboardingModal(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Complete your profile <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile;