import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpClient from "../services/httpClient";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

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

const BusinessDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"listings" | "inbox">("listings");
  const [listings, setListings] = useState<Listing[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Using generic mock data fetching due to potentially no active auth session easily accessible
  // In production, user_id should be extracted contextually
  const userId = "mock_organizer_id"; // Replace with actual current user id logic

  const fetchListings = async () => {
    try {
      const res = await httpClient.get(`http://localhost:5000/api/my-listings?userId=${userId}`);
      setListings(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchChats = async () => {
    try {
      const q = query(collection(db, "chats"), where("participants", "array-contains", userId));
      const snaps = await getDocs(q);
      setChats(snaps.docs.map(d => ({ id: d.id, ...d.data() } as Chat)));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchListings();
    fetchChats();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 pt-20 text-zinc-900">
      <div className="max-w-6xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Business Dashboard</h1>
        <div className="flex gap-4 border-b pb-2 mb-6">
          <button 
            className={`font-semibold ${activeTab === 'listings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('listings')}
          >
            My Listings
          </button>
          <button 
            className={`font-semibold ${activeTab === 'inbox' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`} 
            onClick={() => setActiveTab('inbox')}
          >
            Inquiry Inbox
          </button>
        </div>

        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-800">Your Active Trips/Properties</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-semibold shadow"
              >
                + Create New Listing
              </button>
            </div>
            
            {listings.length === 0 ? (
              <div className="bg-white p-8 text-center rounded-lg shadow border border-gray-200">
                 <p className="text-gray-500 text-lg">You don't have any listings yet!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {listings.map(l => (
                  <div key={l.id} className="bg-white p-6 shadow-md rounded-lg border border-gray-100 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-xs font-bold text-green-700 bg-green-100 py-1 px-2 rounded uppercase">{l.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 line-clamp-1">{l.title}</h3>
                    <p className="text-2xl text-gray-900 font-bold mt-4">₹{l.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-3xl border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-zinc-800">Your Inquiries</h2>
            {chats.length === 0 ? <p className="text-gray-500 py-4 text-center">No active inquiries at the moment.</p> : (
              <ul className="divide-y divide-gray-100">
                {chats.map(c => (
                  <li 
                    key={c.id} 
                    className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 px-4 rounded-lg transition"
                    onClick={() => navigate(`/chat/${c.id}`)}
                  >
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-gray-900">Chat with a Traveler</p>
                      <p className="text-sm text-gray-600 line-clamp-1">{c.lastMessage || "No messages yet."}</p>
                    </div>
                    <span className="text-xs font-bold text-green-600 border border-green-600 px-3 py-1.5 rounded bg-green-50 shadow-sm hover:bg-green-100">Open</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Basic Create Listing Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-zinc-900 bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl text-zinc-900 relative">
              <h2 className="text-2xl font-bold mb-6 text-zinc-800">Create New Route</h2>
              <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  try {
                    await httpClient.post('http://localhost:5000/api/listings', {
                      organizerId: userId,
                      title: formData.get("title"),
                      price: Number(formData.get("price")),
                      type: formData.get("type"),
                    });
                    setIsModalOpen(false);
                    fetchListings(); // Refresh UI
                  } catch(error) {
                    console.error(error);
                  }
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Listing Title</label>
                  <input required name="title" className="w-full border-gray-300 border rounded-lg p-3 focus:ring focus:ring-green-100 focus:border-green-500 outline-none transition" placeholder="e.g. Weekend Gateway to Harishchandragad" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Price (₹)</label>
                  <input required type="number" name="price" className="w-full border-gray-300 border rounded-lg p-3 focus:ring focus:ring-green-100 focus:border-green-500 outline-none transition" placeholder="2500" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Category Type</label>
                  <select name="type" className="w-full border-gray-300 border rounded-lg p-3 focus:ring focus:ring-green-100 focus:border-green-500 outline-none transition bg-white">
                    <option value="trek">Adventure Trek</option>
                    <option value="villa">Private Villa</option>
                    <option value="tour">Guided Tour</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 font-medium text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                  <button type="submit" className="px-5 py-2.5 font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 transition">Create Listing</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BusinessDashboard;
