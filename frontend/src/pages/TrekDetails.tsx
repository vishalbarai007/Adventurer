import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const TrekDetails: React.FC = () => {
  const navigate = useNavigate();
  const [isInjecting, setIsInjecting] = useState(false);
  
  // Mock data for the specific trek/villa logic matching the dashboard mock ids
  const organizerId = "mock_organizer_id";
  const currentUser = { uid: "traveler_123" }; 
  const trekName = "Harishchandragad Monsoon Trek";

  const handleInquire = async () => {
    setIsInjecting(true);
    try {
      // 1. Check if chat exists uniquely indexing participants
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
        // Chat exists, redirect instantly
        navigate(`/chat/${existingChatId}`);
      } else {
        // 2. Create new chat doc backbone Handshake
        const newChatRef = await addDoc(chatsRef, {
          participants: [currentUser.uid, organizerId],
          lastMessage: `Hi! I'm interested in the ${trekName}`,
          updatedAt: serverTimestamp()
        });

        // 3. Add automated initial message recursively to subcollection
        await addDoc(collection(db, "chats", newChatRef.id, "messages"), {
          senderId: currentUser.uid,
          text: `Hi! I'm interested in the ${trekName}. Can you share more details?`,
          timestamp: serverTimestamp()
        });

        // Redirect
        navigate(`/chat/${newChatRef.id}`);
      }
    } catch (e) {
      console.error("Error creating chat handshake: ", e);
      alert("Failed to start inquiry. Check your firebase configuraton.");
    } finally {
      setIsInjecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 font-sans text-zinc-900">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Hero Header Mock */}
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format&fit=crop" 
               alt="Trek View" 
               className="w-full h-[450px] object-cover" />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-bold text-green-700 text-sm tracking-widest uppercase">Popular</span>
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          {/* Title and Price */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <p className="text-green-600 uppercase tracking-widest text-sm font-bold mb-2">Trekking & Camping</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{trekName}</h1>
            </div>
            <div className="bg-green-50 px-6 py-4 rounded-xl border border-green-100 whitespace-nowrap">
              <p className="text-sm text-green-800 font-semibold mb-1">Starting from</p>
              <p className="text-4xl font-black text-green-700">₹2,500</p>
            </div>
          </div>
          
          {/* Content Block */}
          <div className="my-8 prose prose-lg text-gray-600 max-w-none">
            <p className="leading-relaxed">
              Experience the thrilling climb and the majestic views from Konkankada. Highly recommended for experienced trekkers and nature enthusiasts looking for an unforgettable weekend escaping the hustle of the city. 
              The route offers sprawling valleys, historic forts, and an incredible sunset.
            </p>
          </div>

          {/* Action Footer */}
          <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-50 -mx-8 sm:-mb-12 px-8 py-6 gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                S
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Organized professionally by</p>
                <p className="font-bold text-gray-900 text-lg">Summit Seekers</p>
              </div>
            </div>
            
            <button 
              onClick={handleInquire}
              disabled={isInjecting}
              className="w-full sm:w-auto bg-zinc-900 hover:bg-black text-white font-bold py-4 px-10 rounded-xl shadow-xl transition transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isInjecting ? "Connecting..." : "Contact Organizer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetails;
