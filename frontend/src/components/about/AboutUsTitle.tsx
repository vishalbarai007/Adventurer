import React from "react";

const AboutUsTitle: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mt-8 mb-4">
      <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#233115] mb-3 bg-[#EADED0]/10 px-3 py-1 rounded-full">
        Our Story
      </span>
      <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-[#EADED0] mb-4 leading-tight">
        About <span className="text-[#233115] relative inline-block">
          Adventurer
          <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#233115] rounded-full opacity-60"></span>
        </span>
      </h1>
      <p className="text-lg md:text-xl text-[#D4D9D1] font-light leading-relaxed">
        Your trusted travel partner for unforgettable adventures across Maharashtra.
      </p>
      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#233115] to-transparent mx-auto mt-6 opacity-60" />
    </div>
  );
};

export default AboutUsTitle;
