import React, { useState, useMemo } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { mockTrips } from "../components/JSON/mockTrips";
import toast, { Toaster } from 'react-hot-toast';
import httpClient from "../services/httpClient";
import Sidebar from "../components/Developer/main/PostLoginComponents/sidebar";
import { Search, Calendar, ChevronLeft, ChevronRight, MapPin, IndianRupee, X } from "lucide-react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BookingModal = ({ trip, onClose }: { trip: any, onClose: () => void }) => {
  const [isInjecting, setIsInjecting] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);

  const organizerId = trip.organizerId;
  const currentUser = { uid: "traveler_123" };
  const trekName = trip.title;

  const handleInquire = async () => {
    setIsInjecting(true);
    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("participants", "array-contains", currentUser.uid));
      const snaps = await getDocs(q);

      let existingChatId: string | null = null;
      snaps.forEach(doc => {
        const data = doc.data();
        if (data.participants && data.participants.includes(organizerId)) {
          existingChatId = doc.id;
        }
      });

      if (!existingChatId) {
        const newChatRef = await addDoc(chatsRef, {
          participants: [currentUser.uid, organizerId],
          lastMessage: `Hi! I'm interested in the ${trekName}`,
          updatedAt: serverTimestamp()
        });
        await addDoc(collection(db, "chats", newChatRef.id, "messages"), {
          senderId: currentUser.uid,
          text: `Hi! I'm interested in the ${trekName}. Can you share more details?`,
          timestamp: serverTimestamp()
        });
        toast.success("Chat started!");
      } else {
        toast.success("Chat already exists!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to connect to organizer.");
    } finally {
      setIsInjecting(false);
    }
  };

  const verifyPayment = async (paymentData: any, paymentMode: 'Online' | 'Cash') => {
    try {
      const verifyRes = await httpClient.post('http://localhost:5000/api/verify-payment', {
        transactionId: paymentData?.razorpay_payment_id || `txn_cash_${Date.now()}`,
        amount: trip.price,
        paymentMode: paymentMode,
        organizerId: organizerId,
        percentagePaid: paymentMode === 'Online' ? 100 : 0
      });

      if (verifyRes.data.success) {
        toast.success(`Booking Confirmed! Escrow status: ${paymentMode === 'Online' ? 'Held' : 'Pending_Cash'}`);
        setIsBookingModalOpen(false);
        onClose();
      } else {
        toast.error("Payment Verification Failed.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error verifying payment.");
    }
  };

  const handleOnlinePayment = async () => {
    setIsProcessingBooking(true);
    try {
      toast.loading("Preparing Escrow...", { id: 'booking' });
      const orderRes = await httpClient.post('http://localhost:5000/api/create-order', {
        price: trip.price,
        organizerId: organizerId
      });

      const orderId = orderRes.data.id;
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load.", { id: 'booking' });
        return;
      }

      const options = {
        key: "rzp_test_dummy_key",
        amount: trip.price * 100,
        currency: "INR",
        name: "Adventurer",
        description: `Escrow Payment for ${trekName}`,
        order_id: orderId,
        handler: function (response: any) {
          toast.loading("Verifying Payment...", { id: 'booking' });
          verifyPayment(response, 'Online');
        },
        prefill: { name: "Vishal Barai", email: "traveler@example.com", contact: "9999999999" },
        theme: { color: "#16a34a" }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      toast.dismiss('booking');
    } catch (e) {
      console.error(e);
      toast.error("Failed to initialize payment.", { id: 'booking' });
    } finally {
      setIsProcessingBooking(false);
    }
  };

  const handleCashPayment = async () => {
    setIsProcessingBooking(true);
    toast.loading("Registering Cash Booking...", { id: 'booking' });
    await verifyPayment(null, 'Cash');
    setIsProcessingBooking(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 relative my-auto">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-white/50 hover:bg-white/90 backdrop-blur text-gray-800 p-2 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="relative">
          <img src={trip.image} alt="Trek View" className="w-full h-[350px] object-cover" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-bold text-green-700 text-sm tracking-widest uppercase">{trip.type}</span>
          </div>
        </div>
        <div className="p-6 md:p-10 max-h-[50vh] overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <p className="text-green-600 uppercase tracking-widest text-sm font-bold mb-2">{trip.type}</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{trekName}</h1>
              <div className="flex items-center gap-4 mt-3 text-gray-600 font-medium text-sm">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {trip.startDate} to {trip.endDate}</span>
              </div>
            </div>
            <div className="bg-green-50 px-6 py-4 rounded-xl border border-green-100 whitespace-nowrap shadow-sm shrink-0">
              <p className="text-sm text-green-800 font-semibold mb-1">Starting from</p>
              <p className="text-4xl font-black text-green-700">₹{trip.price}</p>
            </div>
          </div>
          <div className="my-6 prose prose-lg text-gray-600 max-w-none">
            <p className="leading-relaxed">{trip.description}</p>
          </div>
          <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row justify-between items-center bg-gray-50 -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 px-6 sm:px-10 py-6 gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
                {trip.organizerName.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Organized professionally by</p>
                <p className="font-bold text-gray-900 text-lg">{trip.organizerName}</p>
              </div>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button onClick={handleInquire} disabled={isInjecting} className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-xl transition disabled:opacity-70 flex justify-center items-center gap-2 whitespace-nowrap">
                {isInjecting ? "Connecting..." : "Contact Organizer"}
              </button>
              <button onClick={() => setIsBookingModalOpen(true)} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-xl transition transform hover:-translate-y-1 active:translate-y-0 flex justify-center items-center gap-2 whitespace-nowrap">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Secure Escrow Booking</h2>
            <p className="text-gray-600 mb-6">Choose your preferred payment method. Funds paid online are held safely in escrow until you meet the organizer.</p>
            <div className="space-y-4">
              <button onClick={handleOnlinePayment} disabled={isProcessingBooking} className="w-full flex justify-between items-center bg-zinc-900 hover:bg-black text-white p-4 rounded-xl transition shadow">
                <span className="font-bold text-lg">Pay Online (Escrow)</span>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">100% Safe</span>
              </button>
              <button onClick={handleCashPayment} disabled={isProcessingBooking} className="w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-zinc-900 font-bold text-lg p-4 rounded-xl transition border border-gray-300">
                Pay Cash on Arrival
              </button>
            </div>
            <button onClick={() => setIsBookingModalOpen(false)} className="mt-6 w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-800">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const TrekDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrek, setSelectedTrek] = useState<any | null>(null);
  const treksPerPage = 10;

  const filteredAndSortedTreks = useMemo(() => {
    let result = [...mockTrips];
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(lowerQuery) || t.organizerName.toLowerCase().includes(lowerQuery));
    }
    if (dateFilter) {
      result = result.filter(t => t.startDate && new Date(t.startDate) >= new Date(dateFilter));
    }
    result.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
    return result;
  }, [searchQuery, dateFilter]);

  const totalPages = Math.ceil(filteredAndSortedTreks.length / treksPerPage);
  const indexOfLastTrek = currentPage * treksPerPage;
  const indexOfFirstTrek = indexOfLastTrek - treksPerPage;
  const currentTreks = filteredAndSortedTreks.slice(indexOfFirstTrek, indexOfLastTrek);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };

  React.useEffect(() => { setCurrentPage(1); }, [searchQuery, dateFilter]);

  return (
    <>
      <div className="fixed top-0 left-0 h-full z-10 hidden md:block">
        <Sidebar />
      </div>
      <div className="min-h-screen bg-gray-50 md:pl-64 pt-6 pb-12 font-sans text-zinc-900 relative">
        <Toaster position="top-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Upcoming Treks</h1>
              <p className="text-gray-500 mt-1">Discover and book your next adventure</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
                <input type="text" placeholder="Search treks or organizers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-green-500 transition-colors sm:text-sm" />
              </div>
              <div className="relative w-full sm:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Calendar className="h-5 w-5 text-gray-400" /></div>
                <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-green-500 transition-colors sm:text-sm cursor-pointer" />
              </div>
            </div>
          </div>
          {currentTreks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentTreks.map((trek) => (
                <div key={trek.id} onClick={() => setSelectedTrek(trek)} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row">
                  <div className="relative sm:w-2/5 h-56 sm:h-auto overflow-hidden">
                    <img src={trek.image} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                      <span className="font-bold text-green-700 text-xs tracking-wider uppercase">{trek.type}</span>
                    </div>
                  </div>
                  <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">{trek.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{trek.description}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2 text-green-600" />
                        <span className="font-medium">{trek.startDate ? new Date(trek.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'}) : 'TBA'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        <span className="font-medium">{trek.organizerName}</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-900 font-bold text-xl">
                          <IndianRupee className="w-5 h-5 mr-0.5" />
                          {trek.price}
                        </div>
                        <button className="text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No treks found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or date filters.</p>
              <button onClick={() => { setSearchQuery(''); setDateFilter(''); }} className="mt-6 px-6 py-2 bg-green-50 text-green-600 font-bold rounded-xl hover:bg-green-100 transition-colors">Clear Filters</button>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12 gap-4">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-green-600 hover:border-green-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm"><ChevronLeft className="w-5 h-5" /></button>
              <span className="text-sm font-semibold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-green-600 hover:border-green-600 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-600 transition-all shadow-sm"><ChevronRight className="w-5 h-5" /></button>
            </div>
          )}
        </div>
      </div>
      {selectedTrek && (<BookingModal trip={selectedTrek} onClose={() => setSelectedTrek(null)} />)}
    </>
  );
};

export default TrekDetails;
