import React, { useState, useEffect } from "react";
import { 
  Search, MapPin, Globe, DollarSign, 
  Star, Shield, User, X, Check, Navigation, Clock, Award
} from "lucide-react";
import httpClient from "@/services/httpClient";
import Sidebar from "@/components/post-login/timeline/Sidebar";
import { UserDocument } from "@/types/schema";

export const GuideMarketplace: React.FC = () => {
  const [guides, setGuides] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter states
  const [nativeLocation, setNativeLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Booking Modal states
  const [selectedGuide, setSelectedGuide] = useState<UserDocument | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [trekLocation, setTrekLocation] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const fetchGuides = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (nativeLocation) queryParams.append("nativeLocation", nativeLocation);
      if (language) queryParams.append("language", language);
      if (maxPrice) queryParams.append("maxPrice", maxPrice);

      const response = await httpClient.get(`/api/guides?${queryParams.toString()}`);
      setGuides(response.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch guides. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [nativeLocation, language, maxPrice]);

  const handleOpenBooking = (guide: UserDocument) => {
    setSelectedGuide(guide);
    setTrekLocation(guide.guideProfile?.nativeLocation || "");
    setBookingDate("");
    setBookingSuccess(false);
    setBookingError("");
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) return;
    if (!bookingDate || !trekLocation.trim()) {
      setBookingError("Please select a date and enter the trek location.");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      await httpClient.post("/api/bookings/guide-reserve", {
        guideId: selectedGuide.uid || (selectedGuide as any).id,
        trekLocation: trekLocation.trim(),
        bookingDate
      });
      setBookingSuccess(true);
      setTimeout(() => {
        setSelectedGuide(null);
        setBookingSuccess(false);
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setBookingError(err.response?.data?.error || "Failed to book guide. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <div className="absolute">
        <Sidebar />
      </div>

      <div className="min-h-screen bg-[#edf2f7] dark:bg-[#0c130e] text-zinc-900 dark:text-zinc-100 pl-0 md:pl-[270px] pt-8 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden mb-10 border border-emerald-800/30">
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.3)_0%,transparent_70%)] pointer-events-none" />
            <span className="bg-emerald-800/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Local Guide Marketplace
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mt-4 tracking-tight">
              Discover Hidden Paths with Expert Guidance
            </h1>
            <p className="mt-3 text-emerald-300/80 text-sm md:text-base max-w-2xl">
              Hire verified local guides who know every trail, peak, and legend. Payments are held in secure escrow and only released after your trek is complete.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 rounded-2xl p-4 text-sm text-red-600 dark:text-red-300 mb-6">
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-1/4 bg-white dark:bg-[#121c15] rounded-3xl p-6 shadow-md border border-emerald-900/10 h-fit">
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3 font-serif">
                <Search size={18} className="text-emerald-500" /> Filter Guides
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Native Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-emerald-600/60" />
                    <input
                      type="text"
                      placeholder="e.g. Matheran"
                      value={nativeLocation}
                      onChange={(e) => setNativeLocation(e.target.value)}
                      className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-transparent dark:border-zinc-800/50 rounded-2xl py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Language Spoken</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3.5 h-4 w-4 text-emerald-600/60" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-transparent dark:border-zinc-800/50 rounded-2xl py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-emerald-500 outline-none transition appearance-none"
                    >
                      <option value="">Any Language</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Gujarati">Gujarati</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Max Budget (₹/Trek)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-emerald-600/60" />
                    <input
                      type="number"
                      placeholder="e.g. 1500"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-transparent dark:border-zinc-800/50 rounded-2xl py-3 pl-10 pr-4 text-sm focus:bg-white focus:border-emerald-500 outline-none transition"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => { setNativeLocation(""); setLanguage(""); setMaxPrice(""); }}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl transition text-center"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Grid Container */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
                </div>
              ) : guides.length === 0 ? (
                <div className="bg-white dark:bg-[#121c15] p-12 text-center rounded-3xl border border-emerald-950/10 shadow-md">
                  <p className="text-gray-500 dark:text-emerald-500/60 text-lg font-serif">No verified guides match your search criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guides.map((guide) => {
                    const id = guide.uid || (guide as any).id;
                    const rating = guide.guideProfile?.averageRating || 0;
                    const reviewsCount = guide.guideProfile?.totalReviews || 0;
                    
                    return (
                      <div 
                        key={id}
                        className="bg-white dark:bg-[#121c15] rounded-3xl p-6 border border-emerald-900/10 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          {/* Card Header */}
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-2xl bg-emerald-950 border border-emerald-800/40 flex items-center justify-center text-emerald-400 font-bold overflow-hidden shadow-inner">
                                {guide.profile_picture ? (
                                  <img src={guide.profile_picture} alt={guide.name} className="h-full w-full object-cover" />
                                ) : (
                                  <User size={20} />
                                )}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold font-serif leading-tight">{guide.name}</h3>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full uppercase mt-1">
                                  <Shield size={10} /> Verified Guide
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-xl text-sm font-bold border border-amber-500/20">
                              <Star size={14} className="fill-amber-500 text-amber-500" />
                              <span>{rating > 0 ? rating.toFixed(1) : "New"}</span>
                              {reviewsCount > 0 && <span className="text-[10px] text-amber-600/70">({reviewsCount})</span>}
                            </div>
                          </div>

                          {/* Profile Details */}
                          <div className="space-y-2.5 my-5 text-sm text-zinc-600 dark:text-zinc-300">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-emerald-500" />
                              <span>Native Expertise: <strong className="text-zinc-800 dark:text-white">{guide.guideProfile?.nativeLocation}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe size={16} className="text-emerald-500" />
                              <span>Languages: <strong className="text-zinc-800 dark:text-white">{guide.guideProfile?.languagesSpoken?.join(", ") || "English, Hindi"}</strong></span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-emerald-500" />
                              <span>Availability: <strong className="text-zinc-800 dark:text-white capitalize">{guide.guideProfile?.availability}</strong></span>
                            </div>
                            {guide.guideProfile?.experienceYears !== undefined && (
                              <div className="flex items-center gap-2">
                                <Award size={16} className="text-emerald-500" />
                                <span>Experience: <strong className="text-zinc-800 dark:text-white">{guide.guideProfile.experienceYears} Years</strong></span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-zinc-800 mt-4">
                          <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider block">Booking Fee</span>
                            <span className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
                              ₹{guide.guideProfile?.pricePerTrek || 1000}
                            </span>
                          </div>
                          <button
                            onClick={() => handleOpenBooking(guide)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5 text-sm"
                          >
                            <Navigation size={14} /> Hire Guide
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#121c15] text-zinc-950 dark:text-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative border border-emerald-900/20">
            <button 
              onClick={() => setSelectedGuide(null)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto h-16 w-16 bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center rounded-full text-emerald-600 dark:text-emerald-400">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold font-serif">Booking Successful!</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400/80">
                  ₹1,000 has been held securely in escrow. Check your Profile page under 'My Bookings' for details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold font-serif">Confirm Guide Booking</h3>
                  <p className="text-xs text-gray-500 mt-1">Booking for guide: <strong>{selectedGuide.name}</strong></p>
                </div>

                {bookingError && (
                  <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/30 rounded-xl p-3 text-xs text-red-600 dark:text-red-300">
                    {bookingError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Trek Location</label>
                  <input
                    type="text"
                    required
                    value={trekLocation}
                    onChange={(e) => setTrekLocation(e.target.value)}
                    className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Date of Trek</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#f4f6f8] dark:bg-[#1b271f] border border-gray-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                </div>

                <div className="bg-[#f4f6f8] dark:bg-[#1b271f] rounded-2xl p-4 space-y-2.5 text-sm border border-gray-100 dark:border-zinc-800/40">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Escrow Security Deposit</span>
                    <span className="font-semibold">₹1,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform Handling Fee</span>
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  </div>
                  <div className="h-[1px] bg-gray-200 dark:bg-zinc-800 my-1" />
                  <div className="flex justify-between font-bold">
                    <span>Total Held in Escrow</span>
                    <span className="text-emerald-600 dark:text-emerald-400">₹1,000.00</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 dark:text-emerald-500/50 leading-relaxed text-center">
                  Funds remain safely held inside Adventurer Ledgers. You can release this deposit after the completion of your trip.
                </p>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {bookingLoading ? "Escrowing Funds..." : <>Confirm & Escrow ₹1,000 <Check size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default GuideMarketplace;
