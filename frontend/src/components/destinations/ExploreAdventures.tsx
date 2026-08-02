import React, { useState } from "react";
import ExploreData from "@/data/ExplorePlaces.json";

type Explore = {
  name: string;
  imgSrc: string;
  desc: string;
};

const ExploreAdventures: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const explores: Explore[] = ExploreData;

  const handleImageClick = (index: number) => {
    setSelectedImage(index === selectedImage ? null : index);
  };

  return (
    <section className="py-8 font-jakarta" id="explore-section">
      <div className="text-center mb-8">
        <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider mb-2 block">Thrill & Sports</span>
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#171717]" data-aos="fade-up">
          Explore Adventurous Sports
        </h2>
        <p className="max-w-2xl mx-auto mt-3 text-gray-500 font-medium text-base leading-relaxed" data-aos="fade-up">
          Dive into the thrill of adventurous sports that ignite your spirit. From paragliding to waterfall rappelling and high altitude treks.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[260px]">
        {explores.map((explore, index) => {
          const isSelected = selectedImage === index;

          return (
            <div
              key={`${explore.name}-${index}`}
              className={`relative rounded-[24px] overflow-hidden cursor-pointer shadow-sm border border-gray-200 bg-white transition-all duration-300
                ${index === 1 ? 'row-span-2' : ''} ${index === explores.length - 1 ? 'col-span-2' : ''}`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={explore.imgSrc}
                alt={explore.name}
                loading="lazy"
                className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{explore.name}</h3>
                <p className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#3A8DFF] rounded-full"></span>
                  {isSelected ? 'Click to minimize' : 'Click to view description'}
                </p>
                {isSelected && (
                  <p className="mt-3 text-sm text-gray-200 font-medium leading-relaxed bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                    {explore.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreAdventures;