import React from "react";

const AboutUsLeftContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="space-y-4">
        <p className="text-[#EADED0] text-base md:text-lg leading-relaxed font-light">
          At <strong className="font-semibold text-white">Adventurer</strong>, we believe travel is about more than just visiting
          destinations—it's about creating lifelong memories, exploring
          diverse cultures, and experiencing nature at its finest. Our
          platform offers a one-stop solution for adventure enthusiasts,
          combining planning tools, personalized recommendations, and a
          community of like-minded explorers.<br/>
          <span className="text-[#233115] font-semibold">Adventurer</span> refers to all travelers, trekkers, and wanderers who are passionate about exploring and embracing adventure in their lives.
        </p>
        <p className="text-[#EADED0] text-base md:text-lg leading-relaxed font-light">
          Whether you're planning your first trek or you're a seasoned
          traveler, Adventurer is here to inspire, guide, and support you.
          From detailed itineraries and safety tips to local guides and
          cultural insights, we provide everything you need to make your
          journey seamless and enjoyable.
        </p>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EADED0]/20">
        <div className="text-center p-3 bg-[#EADED0]/5 rounded-xl border border-[#EADED0]/10 hover:border-[#233115]/30 transition-all duration-300">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#233115]">10+</h3>
          <p className="text-xs md:text-sm text-[#EADED0] mt-1 font-medium">Years of Experience</p>
        </div>
        <div className="text-center p-3 bg-[#EADED0]/5 rounded-xl border border-[#EADED0]/10 hover:border-[#233115]/30 transition-all duration-300">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#233115]">5,000+</h3>
          <p className="text-xs md:text-sm text-[#EADED0] mt-1 font-medium">Satisfied Clients</p>
        </div>
        <div className="text-center p-3 bg-[#EADED0]/5 rounded-xl border border-[#EADED0]/10 hover:border-[#233115]/30 transition-all duration-300">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#233115]">100+</h3>
          <p className="text-xs md:text-sm text-[#EADED0] mt-1 font-medium">Locations Covered</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsLeftContent;
