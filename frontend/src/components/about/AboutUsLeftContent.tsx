import React from "react";

const AboutUsLeftContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center space-y-6 font-jakarta">
      <div className="space-y-4">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
          At <strong className="font-bold text-[#171717]">Adventurer</strong>, we believe travel is about more than just visiting
          destinations—it's about creating lifelong memories, exploring
          diverse cultures, and experiencing nature at its finest. Our
          platform offers a one-stop solution for adventure enthusiasts,
          combining planning tools, personalized recommendations, and a
          community of like-minded explorers.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
          Whether you're planning your first trek or you're a seasoned
          traveler, Adventurer is here to inspire, guide, and support you.
          From detailed itineraries and safety tips to local guides and
          cultural insights, we provide everything you need to make your
          journey seamless and enjoyable.
        </p>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#171717]">10+</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-semibold">Years Experience</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#171717]">5,000+</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-semibold">Satisfied Clients</p>
        </div>
        <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#171717]">100+</h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-semibold">Locations Covered</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsLeftContent;
