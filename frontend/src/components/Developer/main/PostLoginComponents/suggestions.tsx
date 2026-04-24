import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, X, MapPin, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getSeason, seasonalSuggestions, recentOrgTrips } from "../../../../utils/seasonalData";

type RightSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function Suggestions({ isOpen, onToggle }: RightSidebarProps) {
  const [currentSeason, setCurrentSeason] = useState<string>("summer");
  
  useEffect(() => {
    setCurrentSeason(getSeason());
  }, []);

  const items = seasonalSuggestions[currentSeason] || [];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-5 z-[60] flex items-center justify-center rounded-full bg-[#012c18] p-2.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#024d2b] hover:scale-110 active:scale-95 ${
          isOpen ? "right-[255px]" : "right-4"
        }`}
      >
        {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[270px] transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } border-l-2 border-[#012c18]/20 bg-[#edf2f7] text-[#012c18] shadow-2xl`}
      >
        <button onClick={onToggle} className="absolute top-4 left-4 p-1.5 text-[#012c18]/60 hover:text-[#012c18]">
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-full flex-col overflow-y-auto custom-scrollbar p-6 pt-14 gap-6">
          
          {/* Section 1: Seasonal Destinations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold capitalize">{currentSeason} Gems</h2>
              <span className="text-[10px] bg-[#012c18] text-white px-2 py-0.5 rounded-full">Season's Best</span>
            </div>
            
            <div className="space-y-4">
              {items.map((place) => (
                <motion.div 
                  key={place.id}
                  whileHover={{ y: -5 }}
                  className="rounded-xl overflow-hidden bg-white shadow-md border border-[#012c18]/10"
                >
                  <img src={place.image} alt={place.name} className="h-24 w-full object-cover" />
                  <div className="p-3">
                    <h3 className="text-sm font-bold flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-green-700" /> {place.name}
                    </h3>
                    <p className="text-[10px] text-gray-500">{place.tag}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Active Organization Trips (Marketplace) */}
          <div className="border-t border-[#012c18]/10 pt-6">
            <h2 className="text-md font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Upcoming Treks
            </h2>
            {recentOrgTrips.map((trip) => (
              <div key={trip.id} className="p-3 bg-[#012c18] text-white rounded-xl shadow-lg">
                <p className="text-[9px] uppercase tracking-widest opacity-70">{trip.companyName}</p>
                <h3 className="text-xs font-semibold mt-1">{trip.name}</h3>
                <button className="mt-3 w-full py-1.5 bg-white text-[#012c18] text-[10px] font-bold rounded-lg hover:bg-gray-200 transition-colors">
                  Join Group
                </button>
              </div>
            ))}
          </div>

          {/* Section 3: Future Personalization Hook */}
          <div className="rounded-xl p-4 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
            <h3 className="text-xs font-bold text-green-900 flex items-center gap-1">
              <Users className="h-3 w-3" /> Adventurer Match
            </h3>
            <p className="text-[9px] text-green-800 mt-1">
              Want more {currentSeason} treks? Complete your profile to see matches.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
