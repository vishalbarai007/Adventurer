import React, { useState } from 'react';
import ExploreData from '../JSON/ExplorePlaces.json';

type Explore = {
  name: string;
  imgSrc: string;
};

const ExplorePlaces: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const explores: Explore[] = ExploreData;

  const handleImageClick = (index: number) => {
    setSelectedImage(index === selectedImage ? null : index); // Toggle selected image
  };

  return (
    <section className="relative w-full py-20 px-[10vw] text-black" id="explore-section">
      <h1 className="text-2xl font-light text-center capitalize" data-aos="fade-up">
        Explore Your Place
      </h1>
      <p
        className="w-1/2 min-w-[300px] block mx-auto mt-8 text-center leading-[25px] opacity-60"
        data-aos="fade-up"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum sem augue, vitae bibendum
        nibh tempor nec. Aenean quis commodo lectus, in rhoncus lorem.
      </p>

      <div className="relative w-full h-[600px] grid grid-cols-5 grid-rows-2 gap-5 mt-24">
        {explores.map((explore, index) => (
          <div
          key={`${explore.name}-${index}`}
          className={`relative rounded-2xl overflow-hidden flex items-end p-2 ${
            index === 1 ? 'row-span-2' : ''
          } ${index === explores.length - 1 ? 'col-span-2' : ''} ${
            selectedImage !== null && selectedImage !== index ? 'blur-sm' : ''
          } ${selectedImage === index ? 'shadow-[2px_2px_10px_10px_gray]' : ''}`}
          onClick={() => handleImageClick(index)}
          data-aos="fade-up"
        >
        
            <img
              src={explore.imgSrc}
              alt={`${explore.name}-image`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 z-[-1] ${
                selectedImage === index ? 'scale-[1.1]' : 'hover:opacity-80 hover:scale-110'
              }`}
            />
            <div className="relative z-10 text-white">
              <h3 className="font-light">{explore.name}</h3>
              <p className="ml-5 text-sm relative before:content-[''] before:absolute before:left-[-20px] before:top-1 before:bg-[url('/img/pin.png')] before:w-[15px] before:h-[15px] before:bg-contain">
                View city
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExplorePlaces;
