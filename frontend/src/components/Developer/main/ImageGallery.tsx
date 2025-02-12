import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import galleryItemsData from '../../JSON/ImageGalleryItems.json';

type GalleryItem = {
  video: string | undefined;
  image: string;
  like: number;
  name: string;
};

const ImageGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(galleryItemsData);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const handleLike = (index: number) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, like: item.like + 1 } : item
      )
    );
  };

  const handleImageClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="bg-[#EADED0] px-4 sm:px-4 lg:px-8">
      <h1 
        className="text-3xl sm:text-3xl lg:text-5xl font-light text-center capitalize" 
        id="target-section" 
        data-aos="fade-up"
      >
        Most Famous in Maharashtra
      </h1>
      <p 
        className="w-full sm:w-full lg:w-1/2 min-w-[300px] block mx-auto mt-4 sm:mt-4 lg:mt-8 text-center leading-relaxed opacity-60 pb-6 sm:pb-6 lg:pb-10" 
        data-aos="fade-up"
      >
        Discover the unparalleled charm of Maharashtra, a treasure trove of culture, history, and natural beauty. From the majestic forts of Raigad and Sinhagad to the serene beaches of Alibaug and Ganpatipule, every destination tells a story. Explore the breathtaking Sahyadri hills, enchanting caves of Ajanta and Ellora, and vibrant cities like Mumbai and Pune. Whether you're seeking adventure, tranquility, or heritage, Maharashtra has something extraordinary for everyone. Start your unforgettable journey here!
      </p>
      
      <div className="flex flex-col sm:flex-col lg:flex-row gap-2 image-gallery justify-center items-center min-h-screen w-full bg-[#EADED0]">
        <div 
          className="left-section relative w-full sm:w-full lg:w-[50%] bg-[#EADED0] flex flex-col justify-center items-center" 
          data-aos="fade-up"
        >
          <div className="grid grid-cols-2 gap-2 sm:gap-2 lg:gap-4 p-2 sm:p-2 lg:p-10">
            {items.map((item, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-xl relative mb-2 sm:mb-2 lg:mb-0 cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={item.image}
                  alt={`Image ${index + 1}`}
                  title={item.name}
                  className="w-full h-[150px] sm:h-[150px] lg:h-[200px] object-cover rounded-xl transition-all duration-400 hover:scale-125"
                />
                <h2 className="text-center text-base sm:text-base lg:text-2xl font-bold absolute top-[75%] sm:top-[75%] lg:top-[80%] left-1/2 transform -translate-x-1/2 text-[#EADED0] text-stroke">
                  {item.name}
                </h2>
                {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(index);
                  }}
                  className="bg-[#EADED0] absolute flex justify-center items-center gap-1 sm:gap-1 lg:gap-2 bottom-1 sm:bottom-1 lg:bottom-2 left-1 sm:left-1 lg:left-2 text-black px-1 sm:px-1 lg:px-2 py-1 rounded-full text-xs sm:text-xs lg:text-base"
                >
                  <FcLike className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4" /> {item.like}
                </button> */}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full h-[100%] sm:w-full lg:w-[60%] flex items-center justify-center align-middle p-2 sm:p-2 lg:p-5">
          {items[currentVideoIndex].video && (
            <video
              key={currentVideoIndex}
              src={items[currentVideoIndex].video}
              className="w-full h-[300px] sm:h-[300px] lg:h-full object-cover border p-1 sm:p-1 lg:p-5 border-none"
              autoPlay
              loop
              muted
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

