import React from "react";
import AboutUsTitle from "@/components/about/AboutUsTitle";
import AboutUsLeftContent from "@/components/about/AboutUsLeftContent";
import AboutUsContentRight from "@/components/about/AboutUsContentRight";
import AboutUsFeatures from "@/components/about/AboutUsFeatures";
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";

const About_us: React.FC = () => {
  return (
    <div className="bg-[rgb(149,113,79)] min-h-screen font-sans selection:bg-[#233115]/30 selection:text-white">
      {/* Navigation */}
      <NavigationMenuDemo />

      {/* Header / Title Section */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <AboutUsTitle />
      </div>

      {/* Main Narrative Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
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
      <AboutUsFeatures />

      {/* Footer */}
      <Footer color="#233115" />
    </div>
  );
};

export default About_us;
