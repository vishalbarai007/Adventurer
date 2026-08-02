import React from "react";
import AboutUsTitle from "@/components/about/AboutUsTitle";
import AboutUsLeftContent from "@/components/about/AboutUsLeftContent";
import AboutUsContentRight from "@/components/about/AboutUsContentRight";
import AboutUsFeatures from "@/components/about/AboutUsFeatures";
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import useSEO from "@/hooks/useSEO";

const About_us: React.FC = () => {
  useSEO({
    title: 'About Us | Adventurer',
    description: 'Learn about Adventurer, our mission to simplify trekking adventure trips, our security tools, and our local guide integration.',
    keywords: 'about adventurer, trekking company, secure treks, travel platform team'
  });

  return (
    <div className="bg-[#F8F9FB] text-[#171717] min-h-screen font-jakarta">
      {/* Navigation */}
      <NavigationMenuDemo />

      {/* Header / Title Section */}
      <div className="max-w-[1280px] mx-auto px-6 pt-12 pb-6">
        <AboutUsTitle />
      </div>

      {/* Main Narrative Content */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center py-8">
        {/* Right Section - Styled Brand/Team Profile */}
        <div className="order-1 md:order-2">
          <AboutUsContentRight />
        </div>
        {/* Left Section - Description Narrative & Stats */}
        <div className="order-2 md:order-1">
          <AboutUsLeftContent />
        </div>
      </div>

      {/* Highlights / Features Grid */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <AboutUsFeatures />
      </div>

      {/* Footer */}
      <Footer color={undefined} />
    </div>
  );
};

export default About_us;
