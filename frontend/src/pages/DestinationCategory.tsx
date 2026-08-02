import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import Footer from "@/components/common/Footer";
import DestinationModal from "@/components/destinations/DestinationModal";

// Import all JSON data
import trekkingData from "@/data/trekking.json";
import waterfallsData from "@/data/waterfalls.json";
import beachesData from "@/data/beaches.json";
import sanctuaryData from "@/data/sanctuary.json";
import familyFriendlyData from "@/data/family-friendly.json";
import historicalData from "@/data/historical.json";
import wildlifeData from "@/data/wildlife.json";
import soloTravelData from "@/data/solo-travel.json";

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

  const data = useMemo(() => {
    if (!category) return [];
    return categoryDataMap[category.toLowerCase()] || [];
  }, [category]);

  const title = category ? formatCategoryTitle(category) : "Destinations";

  return (
    <div className="bg-[#F8F9FB] text-[#171717] min-h-screen font-jakarta flex flex-col">
      <NavigationMenuDemo />

      {/* Hero Section */}
      <div className="bg-[#111827] text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto text-center relative z-10 flex flex-col items-center">
          <span className="text-[#3A8DFF] font-bold text-sm tracking-wider uppercase mb-3">
            Explore Destinations
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {title} Destinations
          </h1>
          <p className="text-gray-300 max-w-2xl text-base md:text-lg font-medium leading-relaxed">
            Discover the best spots for {title.toLowerCase()} in Maharashtra. 
            Click on any destination to view details and start planning your next adventure.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => setSelectedDestination(dest)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.images[0]} 
                  alt={dest.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold text-white mb-1">{dest.title}</h3>
                  <p className="text-sm text-gray-200 flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#3A8DFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {dest.location}
                  </p>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 line-clamp-3 text-sm mb-4 flex-grow font-medium leading-relaxed">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-[#111827] bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    {dest.bestSeason}
                  </span>
                  <span className="text-[#111827] font-bold text-sm group-hover:text-[#3A8DFF] transition-colors flex items-center gap-1">
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
