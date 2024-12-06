

import React, { useState } from "react";
import ExploreData from "../JSON/ExplorePlaces.json";

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
        className="relative w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-[10vw] text-black"
        id="explore-section"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-light text-center capitalize"
          data-aos="fade-up"
        >
          Explore Adventurous Sports
        </h1>
        <p
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 min-w-[300px] mx-auto mt-4 sm:mt-6 md:mt-8 text-center leading-[25px] opacity-60"
          data-aos="fade-up"
        >
          Dive into the thrill of adventurous sports that ignite your spirit.
          Soar through the skies with paragliding, conquer cascading waters with
          waterfall rappelling, and challenge your endurance with trekking.
          Feel the adrenaline rush as you navigate scenic trails on a cycling
          adventure. These experiences promise breathtaking views,
          heart-pounding excitement, and memories that will last a lifetime.
          Are you ready for the adventure?
        </p>

        <div className="relative w-full mt-8 sm:mt-12 md:mt-16 lg:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {explores.map((explore, index) => {
              const isSelected = selectedImage === index;
              const isBlurred = selectedImage !== null && !isSelected;

              // Special classes for Trekking and Forest Camping
              /* const isTrekking = explore.name === "Trekking"; */
              /* const isForestCamping = explore.name === "Forest Camping"; */

              return (

                <div
                  key={`${explore.name}-${index}`}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                    ${isSelected ? "z-50 shadow-[2px_2px_10px_10px_gray]" : "hover:shadow-md"}
                    ${index === 1 ? 'row-span-2' : ''} ${index === explores.length - 1 ? 'col-span-2' : ''}
                    ${isBlurred ? "opacity-80 scale-95" : "opacity-100 scale-100"}`}
                  onClick={() => handleImageClick(index)}
                >
                  {/* Black Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 ">
                    {/* Image */}
                    <img
                      src={explore.imgSrc}
                      alt={`${explore.name}-image`}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500
                      ${isSelected ? "scale-110 opacity-50 bg-opacity-1" : "hover:opacity-80 hover:scale-105"}`}
                    />
                  </div>


                  {/* Content */}
                  <div className="absolute flex flex-col justify-end p-6 text-[#EADED0]">
                    <h2 className="text-2xl font-bold mb-2">{explore.name}</h2>
                    <p className="text-sm opacity-90 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                      View more
                    </p>
                    {isSelected && (
                      <p className="mt-4 text-sm">{explore.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorePlaces;
