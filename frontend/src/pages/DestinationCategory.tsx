import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { NavigationMenuDemo } from "../components/Shadcn/main/NavigationMenu";
import Footer from "../components/Developer/support/Footer";
import DestinationModal from "../components/Developer/main/DestinationModal";

// Import all JSON data
import trekkingData from "../components/JSON/trekking.json";
import waterfallsData from "../components/JSON/waterfalls.json";
import beachesData from "../components/JSON/beaches.json";
import sanctuaryData from "../components/JSON/sanctuary.json";
import familyFriendlyData from "../components/JSON/family-friendly.json";
import historicalData from "../components/JSON/historical.json";
import wildlifeData from "../components/JSON/wildlife.json";
import soloTravelData from "../components/JSON/solo-travel.json";

// Type definition for a destination
interface Destination {
  id: string;
  title: string;
  images: string[];
  bestSeason: string;
  description: string;
  location: string;
}

const categoryDataMap: Record<string, Destination[]> = {
  "trekking": trekkingData,
  "waterfalls": waterfallsData,
  "beaches": beachesData,
  "sanctuary": sanctuaryData,
  "family-friendly": familyFriendlyData,
  "historical": historicalData,
  "wildlife": wildlifeData,
  "solo-travel": soloTravelData,
};

const formatCategoryTitle = (category: string) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DestinationCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const data = useMemo(() => {
    if (category && categoryDataMap[category]) {
      return categoryDataMap[category];
    }
    return [];
  }, [category]);

  const title = category ? formatCategoryTitle(category) : "Destinations";

  if (!category || !categoryDataMap[category]) {
    return (
      <div className="min-h-screen bg-[#012c18] flex flex-col items-center justify-center text-white">
        <NavigationMenuDemo />
        <div className="text-center mt-20">
          <h1 className="text-4xl font-serif text-brand-gold mb-4">Category Not Found</h1>
          <p className="text-white/70 mb-8">We couldn't find destinations for "{category}".</p>
          <Link to="/pre-login-homepage" className="px-6 py-3 bg-brand-gold text-brand-green font-bold rounded-full">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000a05] flex flex-col font-jakarta">
      <NavigationMenuDemo />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#012c18]/80 to-[#000a05] z-0" />
          {data.length > 0 && (
            <img 
              src={data[0].images[0]} 
              alt="Background" 
              className="w-full h-full object-cover opacity-20 filter blur-sm"
            />
          )}
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <p className="text-brand-gold font-mono tracking-[0.3em] uppercase mb-4 text-sm">
            Explore Maharashtra
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            {title} <span className="text-brand-gold">Destinations</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Discover the best spots for {title.toLowerCase()} in Maharashtra. 
            Click on any destination to view details and start planning your next adventure.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => setSelectedDestination(dest)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-gold/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.images[0]} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-brand-gold transition-colors">{dest.title}</h3>
                  <p className="text-sm text-white/70 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {dest.location}
                  </p>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-white/60 line-clamp-3 text-sm mb-4 flex-grow">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-2 py-1 rounded">
                    {dest.bestSeason}
                  </span>
                  <span className="text-white/40 text-sm group-hover:text-white transition-colors flex items-center gap-1">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer color={undefined} />

      <DestinationModal 
        isOpen={!!selectedDestination} 
        onClose={() => setSelectedDestination(null)} 
        destination={selectedDestination} 
      />
    </div>
  );
};

export default DestinationCategory;
