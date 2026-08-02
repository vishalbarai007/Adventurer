import React, { useState } from "react";
import galleryItemsData from '@/data/ImageGalleryItems.json';

type GalleryItem = {
  video: string | undefined;
  image: string;
  like: number;
  name: string;
};

const ImageGallery: React.FC = () => {
  const [items] = useState<GalleryItem[]>(galleryItemsData);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  return (
    <section className="py-8 font-jakarta">
      <div className="text-center mb-8">
        <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider mb-2 block">Highlights</span>
        <h2 
          className="text-[32px] md:text-[40px] font-extrabold text-[#171717]" 
          id="target-section" 
          data-aos="fade-up"
        >
          Most Famous Spots & Trails
        </h2>
        <p 
          className="max-w-2xl mx-auto mt-3 text-gray-500 font-medium text-base leading-relaxed" 
          data-aos="fade-up"
        >
          Discover the unparalleled charm of Sahyadri peaks, historic forts, and tranquil coastal beaches. Click any location below to preview live action footage!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 md:p-8 rounded-[32px] border border-gray-200 shadow-sm">
        {/* Left Section Grid */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4" data-aos="fade-up">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`relative h-40 md:h-44 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${index === currentVideoIndex ? 'border-[#3A8DFF] shadow-md scale-[1.02]' : 'border-gray-100 hover:border-gray-300'}`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={item.image}
                alt={item.name}
                title={item.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <h3 className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white leading-tight">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
        
        {/* Right Section Video Player */}
        <div className="lg:col-span-6 h-[320px] md:h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-black relative">
          {items[currentVideoIndex].video ? (
            <video
              key={currentVideoIndex}
              src={items[currentVideoIndex].video}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              src={items[currentVideoIndex].image}
              alt="Destination"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold">
            Live Preview: {items[currentVideoIndex].name}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
