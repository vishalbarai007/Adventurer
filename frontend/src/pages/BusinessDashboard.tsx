import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "@/services/httpClient";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingWizard from "@/components/auth/OnboardingWizard";
import { db } from "@/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { 
  Award, X, Star, MapPin, Calendar, Clock, MessageSquare 
} from "lucide-react";

interface Listing {
  id: string;
  title: string;
  price: number;
  type: string;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
}

interface GuideBooking {
  bookingId: string;
  travelerId: string;
  travelerName: string;
  trekLocation: string;
  bookingDate: string;
  amountPaid: number;
  escrowStatus: 'Held' | 'Released' | 'Disputed';
  hasLeftReview: boolean;
}

interface GuideReview {
  reviewId: string;
  bookingId: string;
  travelerName: string;
  ratings: {
    safety: number;
    womenSafety: number;
    languageClarity: number;
    overall: number;
  };
  reviewText: string;
  replyText?: string;
  createdAt: string;
}

const BusinessDashboard: React.FC = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  
  const role = user?.role || "organizer";
  const progress = user?.onboardingProgress ?? 100;
  const userId = user?.uid || (user as any)?.id || "mock_user";

  const [activeTab, setActiveTab] = useState<"listings" | "inbox" | "assignments" | "reviews">("listings");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Organizer state
  const [listings, setListings] = useState<Listing[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  // Guide state
  const [guideBookings, setGuideBookings] = useState<GuideBooking[]>([]);
  const [guideReviews, setGuideReviews] = useState<GuideReview[]>([]);
  const [replyInputs, setReplyInputs] = useState<{ [reviewId: string]: string }>({});
  const [replyLoading, setReplyLoading] = useState<{ [reviewId: string]: boolean }>({});

  useEffect(() => {
    if (role === 'guide') {
      setActiveTab("assignments");
    } else {
      setActiveTab("listings");
    }
  }, [role]);

  const fetchOrganizerData = async () => {
    try {
      const res = await httpClient.get(`/api/my-listings?userId=${userId}`);
      setListings(res.data);
      
      const q = query(collection(db, "chats"), where("participants", "array-contains", userId));
      const snaps = await getDocs(q);
      setChats(snaps.docs.map(d => ({ id: d.id, ...d.data() } as Chat)));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchGuideData = async () => {
    try {
      // Fetch bookings from activity logs or direct filter
      const activity = user?.activity || [];
      const bookings = activity.filter((act: any) => act.type === 'guide_booking');
      setGuideBookings(bookings);

      // Fetch reviews
      const reviewsRes = await httpClient.get(`/api/guides/${userId}/reviews`);
      setGuideReviews(reviewsRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (role === 'organizer') {
      fetchOrganizerData();
    } else if (role === 'guide') {
      fetchGuideData();
    }
  }, [role, user]);

  const handlePostReply = async (reviewId: string) => {
    const text = replyInputs[reviewId];
    if (!text || !text.trim()) return;

    setReplyLoading(prev => ({ ...prev, [reviewId]: true }));
    try {
      await httpClient.post(`/api/reviews/${reviewId}/reply`, { replyText: text });
      
      // Update local state
      setGuideReviews(prev => prev.map(rev => {
        if (rev.reviewId === reviewId) {
          return { ...rev, replyText: text };
        }
        return rev;
      }));
      setReplyInputs(prev => ({ ...prev, [reviewId]: "" }));
    } catch (err) {
      console.error(err);
      alert("Failed to submit reply. Please try again.");
    } finally {
      setReplyLoading(prev => ({ ...prev, [reviewId]: false }));
    }
  };

  // Stats calculators for guides
  const guideStats = {
    earnings: guideBookings.filter(b => b.escrowStatus === 'Released').reduce((sum, b) => sum + b.amountPaid, 0),
    escrow: guideBookings.filter(b => b.escrowStatus === 'Held').reduce((sum, b) => sum + b.amountPaid, 0),
    totalTrips: guideBookings.length,
    rating: user?.guideProfile?.averageRating || 0
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0c130e] flex flex-col p-6 pt-24 text-zinc-900 dark:text-zinc-100">
        <div className="max-w-6xl w-full mx-auto">
          
          {/* Profile Completeness Alert Banner */}
          {progress < 100 && (
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white py-4 px-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg border border-emerald-700/30">
              <div className="flex items-center gap-2.5">
                <Award className="h-5 w-5 text-emerald-400 animate-pulse" />
                <span className="text-sm font-medium">
                  Your professional profile is incomplete ({progress}%). Complete it now to activate your verified badge!
                </span>
              </div>
              <button 
                onClick={() => setIsWizardOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md whitespace-nowrap animate-bounce"
              >
                Complete Profile
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold font-serif">
                {role === 'guide' ? "Guide Professional Dashboard" : "Business Dashboard"}
              </h1>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                Logged in as: <strong className="text-emerald-600">{role}</strong>
              </p>
            </div>
          </div>

          {/* Guide Stats Section */}
          {role === 'guide' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-[#121c15] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Earnings Released</span>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-serif mt-1">₹{guideStats.earnings.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-[#121c15] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Escrow Held</span>
                <p className="text-2xl font-bold text-amber-500 font-serif mt-1">₹{guideStats.escrow.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-[#121c15] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Assignments</span>
                <p className="text-2xl font-bold font-serif mt-1">{guideStats.totalTrips}</p>
              </div>
              <div className="bg-white dark:bg-[#121c15] p-5 rounded-2xl border border-emerald-900/10 shadow-sm">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Overall Rating</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span className="text-2xl font-bold font-serif">{guideStats.rating > 0 ? guideStats.rating.toFixed(1) : "New"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 border-b dark:border-zinc-800 pb-2 mb-6">
            {role === 'organizer' && (
              <>
                <button 
                  className={`font-semibold ${activeTab === 'listings' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => setActiveTab('listings')}
                >
                  My Listings
                </button>
                <button 
                  className={`font-semibold ${activeTab === 'inbox' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => setActiveTab('inbox')}
                >
                  Inquiry Inbox
                </button>
              </>
            )}

            {role === 'guide' && (
              <>
                <button 
                  className={`font-semibold ${activeTab === 'assignments' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => setActiveTab('assignments')}
                >
                  Assignments & Past Trips
                </button>
                <button 
                  className={`font-semibold ${activeTab === 'reviews' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`} 
                  onClick={() => setActiveTab('reviews')}
                >
                  Incoming Reviews ({guideReviews.length})
                </button>
              </>
            )}
          </div>

          {/* Tab Contents: Listings */}
          {activeTab === 'listings' && role === 'organizer' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Your Active Trips/Properties</h2>
                <button 
                  onClick={() => setIsListingModalOpen(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 font-semibold shadow"
                >
                  + Create New Listing
                </button>
              </div>
              
              {listings.length === 0 ? (
                <div className="bg-white dark:bg-[#121c15] p-8 text-center rounded-2xl shadow border border-emerald-950/10">
                   <p className="text-gray-500 text-lg">You don't have any listings yet!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {listings.map(l => (
                    <div key={l.id} className="bg-white dark:bg-[#121c15] p-6 shadow-sm rounded-2xl border border-emerald-950/10 hover:shadow transition">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-xs font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 py-1 px-2 rounded uppercase">{l.type}</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1">{l.title}</h3>
                      <p className="text-2xl text-gray-900 dark:text-white font-bold mt-4">₹{l.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Contents: Inquiry Inbox */}
          {activeTab === 'inbox' && role === 'organizer' && (
            <div className="bg-white dark:bg-[#121c15] p-6 shadow-sm rounded-2xl border border-emerald-950/10 max-w-3xl">
              <h2 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">Your Inquiries</h2>
              {chats.length === 0 ? <p className="text-gray-500 py-4 text-center">No active inquiries at the moment.</p> : (
                <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {chats.map(c => (
                    <li 
                      key={c.id} 
                      className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#18271d]/30 px-4 rounded-xl transition"
                      onClick={() => navigate(`/chat/${c.id}`)}
                    >
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Chat with a Traveler</p>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-1">{c.lastMessage || "No messages yet."}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 border border-emerald-600 px-3 py-1.5 rounded bg-emerald-50 dark:bg-emerald-950/20 shadow-sm hover:bg-emerald-100">Open</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Tab Contents: Guide Assignments */}
          {activeTab === 'assignments' && role === 'guide' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Assigned Treks</h2>
              {guideBookings.length === 0 ? (
                <div className="bg-white dark:bg-[#121c15] p-12 text-center rounded-2xl border border-emerald-950/10">
                  <p className="text-gray-500">No guiding assignments recorded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guideBookings.map((b) => (
                    <div 
                      key={b.bookingId} 
                      className="bg-white dark:bg-[#121c15] p-6 rounded-2xl border border-emerald-950/10 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">ID: {b.bookingId}</span>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            b.escrowStatus === 'Held' 
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                          }`}>
                            Escrow: {b.escrowStatus}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-emerald-500" />
                            <span>Location: <strong>{b.trekLocation}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-emerald-500" />
                            <span>Date: <strong>{b.bookingDate}</strong></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            <span>Client: <strong>{b.travelerName}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t dark:border-zinc-800 pt-4 mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Guiding Fee</span>
                        <strong className="text-lg text-emerald-600 dark:text-emerald-400 font-serif">₹{b.amountPaid}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Contents: Guide Reviews with Replies */}
          {activeTab === 'reviews' && role === 'guide' && (
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Traveler Feedback</h2>
              {guideReviews.length === 0 ? (
                <div className="bg-white dark:bg-[#121c15] p-12 text-center rounded-2xl border border-emerald-950/10">
                  <p className="text-gray-500">No feedback submitted yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {guideReviews.map((rev) => (
                    <div 
                      key={rev.reviewId} 
                      className="bg-white dark:bg-[#121c15] p-6 rounded-2xl border border-emerald-950/10 shadow-sm space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm">{rev.travelerName}</h4>
                          <span className="text-[10px] text-gray-400">Booking: {rev.bookingId}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-500/20">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          <span>{rev.ratings.overall.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Ratings Matrix */}
                      <div className="grid grid-cols-3 gap-2 bg-[#f4f6f8] dark:bg-[#1b271f] p-3 rounded-xl text-xs">
                        <div className="text-center">
                          <span className="text-gray-500 block">Safety</span>
                          <strong className="text-zinc-800 dark:text-white">{rev.ratings.safety} / 5</strong>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-500 block">Women Safety</span>
                          <strong className="text-zinc-800 dark:text-white">{rev.ratings.womenSafety} / 5</strong>
                        </div>
                        <div className="text-center">
                          <span className="text-gray-500 block">Clarity</span>
                          <strong className="text-zinc-800 dark:text-white">{rev.ratings.languageClarity} / 5</strong>
                        </div>
                      </div>

                      {/* Review Comment */}
                      <div className="bg-gray-50 dark:bg-[#1a251e]/40 p-4 rounded-xl border border-gray-100 dark:border-zinc-800/40 text-sm">
                        <p className="italic text-zinc-700 dark:text-zinc-300">"{rev.reviewText}"</p>
                      </div>

                      {/* Reply Section */}
                      {rev.replyText ? (
                        <div className="bg-emerald-500/5 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-4 rounded-r-xl text-sm">
                          <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 block mb-1">Your Response:</span>
                          <p className="text-zinc-800 dark:text-zinc-200">{rev.replyText}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 pt-2 border-t dark:border-zinc-800/60">
                          <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider">Submit reply to traveler feedback</label>
                          <textarea
                            placeholder="Type your response to this traveler comment..."
                            value={replyInputs[rev.reviewId] || ""}
                            onChange={(e) => setReplyInputs(prev => ({ ...prev, [rev.reviewId]: e.target.value }))}
                            className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition"
                            rows={3}
                          />
                          <div className="flex justify-end">
                            <button
                              onClick={() => handlePostReply(rev.reviewId)}
                              disabled={replyLoading[rev.reviewId] || !replyInputs[rev.reviewId]?.trim()}
                              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow flex items-center gap-1.5"
                            >
                              <MessageSquare size={12} /> {replyLoading[rev.reviewId] ? "Submitting..." : "Post Response"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Basic Create Listing Modal for Organizers */}
          {isListingModalOpen && (
            <div className="fixed inset-0 bg-zinc-900 bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="bg-white dark:bg-[#121c15] text-zinc-950 dark:text-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative border border-emerald-900/10">
                <button onClick={() => setIsListingModalOpen(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white">
                  <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-6 font-serif">Create New Route</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    try {
                      await httpClient.post('/api/listings', {
                        organizerId: userId,
                        title: formData.get("title"),
                        price: Number(formData.get("price")),
                        type: formData.get("type"),
                      });
                      setIsListingModalOpen(false);
                      fetchOrganizerData();
                    } catch(error) {
                      console.error(error);
                    }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Listing Title</label>
                    <input required name="title" className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition" placeholder="e.g. Weekend Gateway to Harishchandragad" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Price (₹)</label>
                    <input required type="number" name="price" className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition" placeholder="2500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Category Type</label>
                    <select name="type" className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl p-3 text-sm outline-none focus:border-emerald-500 transition">
                      <option value="trek">Adventure Trek</option>
                      <option value="villa">Private Villa</option>
                      <option value="tour">Guided Tour</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => setIsListingModalOpen(false)} className="px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition">Cancel</button>
                    <button type="submit" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition">Create Listing</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Onboarding Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl">
            <button 
              onClick={() => setIsWizardOpen(false)}
              className="absolute right-4 top-4 text-white/70 hover:text-white z-10"
            >
              <X size={20} />
            </button>
            <OnboardingWizard onComplete={() => { setIsWizardOpen(false); checkAuth(); }} />
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessDashboard;
