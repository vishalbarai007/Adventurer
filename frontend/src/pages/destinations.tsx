import Categories from "@/components/destinations/Categories";
import CouponsAndDeals from "@/components/destinations/CouponsAndDeals";
import Destination from "@/components/destinations/Destinations";
import ImageGallery from "@/components/destinations/ImageGallery";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from "@/components/home/Carousel";
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import ExploreAdventures from "@/components/destinations/ExploreAdventures";
import useSEO from "@/hooks/useSEO";

const Seasonal_destinations = () => {
  useSEO({
    title: 'Seasonal Trekking Destinations | Adventurer',
    description: 'Find seasonal trekking recommendations, deals on guides, category-wise trails, and top destinations worldwide.',
    keywords: 'seasonal destinations, trek routes, category trails, trekking coupons'
  });

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="Seasonal_destinations bg-[#F8F9FB] text-[#171717] min-h-screen font-jakarta">
      {/* Top Header */}
      <NavigationMenuDemo />

      {/* Full Width Hero Slider */}
      <Destination />

      {/* Main Content Container */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 space-y-16">
        <ImageGallery data-aos="fade-up" />
        <Carousel />
        <Categories data-aos="fade-up" />
        <ExploreAdventures data-aos="fade-up" />
        <CouponsAndDeals data-aos="fade-up" />
      </div>

      {/* Footer */}
      <Footer color={undefined} />
    </div>
  );
};

export default Seasonal_destinations;
