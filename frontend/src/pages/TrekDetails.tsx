import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { mockTrips } from "../components/JSON/mockTrips";
import toast, { Toaster } from 'react-hot-toast';
import httpClient from "../services/httpClient";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const TrekDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isInjecting, setIsInjecting] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isProcessingBooking, setIsProcessingBooking] = useState(false);
  
  // Using first mock trip for demonstration
  const trip = mockTrips[0];
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

      if (existingChatId) {
        navigate(`/chat/${existingChatId}`);
      } else {
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

        navigate(`/chat/${newChatRef.id}`);
      }
    } catch (e) {
      console.error("Error creating chat handshake: ", e);
      toast.error("Failed to start inquiry.");
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

        if(verifyRes.data.success) {
            toast.success(`Booking Confirmed! Escrow status: ${paymentMode === 'Online' ? 'Held' : 'Pending_Cash'}`);
            setIsBookingModalOpen(false);
        } else {
            toast.error("Payment Verification Failed.");
        }
    } catch(e) {
        console.error(e);
        toast.error("Error verifying payment.");
    }
  };

  const handleOnlinePayment = async () => {
    setIsProcessingBooking(true);
    try {
        toast.loading("Preparing Escrow...", { id: 'booking' });
        
        // 1. Create order
        const orderRes = await httpClient.post('http://localhost:5000/api/create-order', {
            price: trip.price,
            organizerId: organizerId
        });
        
        const orderId = orderRes.data.id;
        
        // 2. Load Razorpay
        const res = await loadRazorpayScript();
        if (!res) {
            toast.error("Razorpay SDK failed to load.", { id: 'booking' });
            return;
        }

        // 3. Open Razorpay (Mock Mode)
        const options = {
            key: "rzp_test_dummy_key", 
            amount: trip.price * 100,
            currency: "INR",
            name: "Adventurer",
            description: `Escrow Payment for ${trekName}`,
            order_id: orderId,
            handler: function (response: any) {
                // This triggers on successful payment
                toast.loading("Verifying Payment...", { id: 'booking' });
                verifyPayment(response, 'Online');
            },
            prefill: {
                name: "Vishal Barai",
                email: "traveler@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#16a34a"
            }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
        toast.dismiss('booking');

    } catch(e) {
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
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 font-sans text-zinc-900 relative">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        
        <div className="relative">
          <img src={trip.image} 
               alt="Trek View" 
               className="w-full h-[450px] object-cover" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-bold text-green-700 text-sm tracking-widest uppercase">{trip.type}</span>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <p className="text-green-600 uppercase tracking-widest text-sm font-bold mb-2">{trip.type}</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{trekName}</h1>
            </div>
            <div className="bg-green-50 px-6 py-4 rounded-xl border border-green-100 whitespace-nowrap">
              <p className="text-sm text-green-800 font-semibold mb-1">Starting from</p>
              <p className="text-4xl font-black text-green-700">₹{trip.price}</p>
            </div>
          </div>
          
          <div className="my-8 prose prose-lg text-gray-600 max-w-none">
            <p className="leading-relaxed">
              {trip.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-50 -mx-8 sm:-mb-12 px-8 py-6 gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                {trip.organizerName.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Organized professionally by</p>
                <p className="font-bold text-gray-900 text-lg">{trip.organizerName}</p>
              </div>
            </div>
            
            <div className="flex gap-4 w-full sm:w-auto">
                <button 
                onClick={handleInquire}
                disabled={isInjecting}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 px-8 rounded-xl transition disabled:opacity-70 flex justify-center items-center gap-2"
                >
                {isInjecting ? "Connecting..." : "Contact Organizer"}
                </button>

                <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl shadow-xl transition transform hover:-translate-y-1 active:translate-y-0 flex justify-center items-center gap-2"
                >
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
                      <button 
                        onClick={handleOnlinePayment}
                        disabled={isProcessingBooking}
                        className="w-full flex justify-between items-center bg-zinc-900 hover:bg-black text-white p-4 rounded-xl transition shadow"
                      >
                          <span className="font-bold text-lg">Pay Online (Escrow)</span>
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">100% Safe</span>
                      </button>

                      <button 
                        onClick={handleCashPayment}
                        disabled={isProcessingBooking}
                        className="w-full flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-zinc-900 font-bold text-lg p-4 rounded-xl transition border border-gray-300"
                      >
                          Pay Cash on Arrival
                      </button>
                  </div>

                  <button 
                    onClick={() => setIsBookingModalOpen(false)}
                    className="mt-6 w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-800"
                  >
                      Cancel
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default TrekDetails;
