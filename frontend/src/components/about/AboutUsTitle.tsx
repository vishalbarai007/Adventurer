import React from "react";

const AboutUsTitle: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mt-6 mb-4 font-jakarta">
      <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#3A8DFF] mb-3 bg-[#EEF5FF] px-4 py-1.5 rounded-full border border-blue-100">
        Our Story
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#171717] mb-4 leading-tight">
        About <span className="text-[#111827] relative inline-block">
          Adventurer
          <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#3A8DFF] rounded-full"></span>
        </span>
      </h1>
      <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
        Your trusted travel partner for unforgettable adventures across India and worldwide.
      </p>
    </div>
  );
};

export default AboutUsTitle;
