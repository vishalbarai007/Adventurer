import React from "react";

const AdventurerTeam =
  "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055972/adventurer_assets_migration/images/Faviconrans_r8yzq5.png";

const AboutUsContentRight: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative group p-6 md:p-8 bg-[#EADED0]/5 rounded-3xl border border-[#EADED0]/10 shadow-2xl backdrop-blur-sm max-w-md w-full overflow-hidden transition-all duration-500 hover:shadow-[#233115]/10">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#233115]/5 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#EADED0]/5 pointer-events-none group-hover:scale-125 transition-transform duration-500" />

        <div className="relative flex flex-col items-center text-center z-10">
          <div className="relative mb-6 p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
            <img
              src={AdventurerTeam}
              alt="Adventurer Logo"
              className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-xl drop-shadow-[0_8px_24px_rgba(35,49,21,0.2)]"
            />
          </div>
          <span className="text-[#233115] font-semibold tracking-wider text-xs uppercase mb-1">
            Official Platform Logo
          </span>
          <h2 className="text-[#EADED0] text-xl font-bold font-serif mb-2">
            Adventurer Team
          </h2>
          <p className="text-xs text-[#D4D9D1] leading-relaxed max-w-xs">
            Connecting passionate explorers with the hidden natural wonders of Maharashtra since 2014.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContentRight;
