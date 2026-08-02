import React from "react";

const AdventurerTeam =
  "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055972/adventurer_assets_migration/images/Faviconrans_r8yzq5.png";

const AboutUsContentRight: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full font-jakarta">
      <div className="relative group p-6 md:p-8 bg-white rounded-3xl border border-gray-200 shadow-md max-w-md w-full overflow-hidden transition-all duration-300">
        <div className="relative flex flex-col items-center text-center z-10">
          <div className="relative mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:scale-105 transition-transform duration-300">
            <img
              src={AdventurerTeam}
              alt="Adventurer Logo"
              className="w-44 h-44 md:w-52 md:h-52 object-contain rounded-xl"
            />
          </div>
          <span className="text-[#3A8DFF] font-bold tracking-wider text-xs uppercase mb-1">
            Official Platform Logo
          </span>
          <h2 className="text-[#171717] text-2xl font-extrabold mb-2">
            Adventurer Team
          </h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xs">
            Connecting passionate explorers with the hidden natural wonders of the world since 2014.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsContentRight;
