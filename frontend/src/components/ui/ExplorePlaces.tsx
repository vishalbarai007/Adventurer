import React, { useState } from 'react';
import ExploreData from '../JSON/ExplorePlaces.json';

type Explore = {
  name: string;
  imgSrc: string;
  desc: string;
};

const ExplorePlaces: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const explores: Explore[] = ExploreData;

  const handleImageClick = (index: number) => {
    setSelectedImage(index === selectedImage ? null : index);
  };

  return (
    <div className="ExplorePlaces bg-[#EADED0] min-h-screen">
      <section
        className="relative w-full py-20 px-[10vw] text-black"
        id="explore-section"
      >
        <h1
          className="text-5xl font-light text-center capitalize"
          data-aos="fade-up"
        >
          Explore Adventurous Sports
        </h1>
        <p
          className="w-1/2 min-w-[300px] block mx-auto mt-8 text-center leading-[25px] opacity-60"
          data-aos="fade-up"
        >
          Dive into the thrill of adventurous sports that ignite your spirit. Soar through the skies with paragliding, conquer cascading waters with waterfall rappelling, and challenge your endurance with trekking. Feel the adrenaline rush as you navigate scenic trails on a cycling adventure. These experiences promise breathtaking views, heart-pounding excitement, and memories that will last a lifetime. Are you ready for the adventure?
        </p>


        <div className="relative w-full h-[600px] grid grid-cols-5 grid-rows-2 gap-5 mt-24">
          {explores.map((explore, index) => {
            const isSelected = selectedImage === index;
            const isBlurred = selectedImage !== null && !isSelected;

            return (
              <div
                key={`${explore.name}-${index}`}
                className={`relative rounded-2xl overflow-hidden flex items-end p-2 transition-all duration-300 cursor-pointer ${isSelected
                    ? 'z-50 shadow-[2px_2px_10px_10px_gray]'
                    : 'hover:shadow-md'
                  } ${index === 1 ? 'row-span-2' : ''} ${index === explores.length - 1 ? 'col-span-2' : ''
                  } ${isBlurred ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={explore.imgSrc}
                  alt={`${explore.name}-image`}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 z-[-1] ${isSelected ? 'scale-[1.1]' : 'hover:opacity-80 hover:scale-105'
                    }`}
                />
                <div className="relative z-10 text-[#EADED0] p-2">
                  <h1 className="font-bold">{explore.name}</h1>
                  <p
                    className="ml-5 text-sm relative before:content-['']
                  before:absolute before:left-[-20px] before:top-1 before:bg-[url('/img/pin.png')] 
                  before:w-[15px] before:h-[15px] before:bg-contain"
                  >
                    View more
                  </p>
                  {isSelected && (
                    <p className="mt-2 text-sm">{explore.desc}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ExplorePlaces;
