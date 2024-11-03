import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import galleryItemsData from '../JSON/ImageGalleryItems.json';

type GalleryItem = {
  image: string;
  like: number;
  name: string;
};

const ImageGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(galleryItemsData);

  const handleLike = (index: number) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, like: item.like + 1 } : item
      )
    );
  };

  return (
    <>
    <h1 className="text-5xl font-light text-center capitalize" id="target-section" data-aos="fade-up">Travel in Maharashtra </h1>
    <p className="w-1/2 min-w-[300px] block mx-auto mt-8 text-center leading-[25px] opacity-60 pb-10" data-aos="fade-up">Experience popular Adventurers. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nesciunt, rerum dolorum laudantium optio tempore, reiciendis quod obcaecati architecto fugit neque vitae cum est maiores nulla provident, enim magni illo.</p>
    <div className="flex gap-2 image-gallery h-screen w-full bg-white">
      <div className="left-section relative h-full w-[50%] bg-white flex flex-col justify-center items-center" data-aos="fade-up">
        <div className="grid grid-cols-2 gap-4 p-10">
          {items.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-xl relative">
              <img
                src={item.image}
                alt={`Image ${index + 1}`}
                title={item.name}
                className="w-full h-[200px] object-cover rounded-xl transition-all duration-400 hover:scale-125"
              />
              <h2 className="text-center text-2xl font-bold absolute top-[80%] left-[25%] text-white">
                {item.name}
              </h2>
              <button
                onClick={() => handleLike(index)}
                className="bg-white absolute bottom-2 left-2 text-black px-2 py-1 rounded-full"
              >
                <FcLike /> {item.like}
              </button>
            </div>
          ))}
        </div>
      </div>

      <video
        src="/assets/Videos/GatewayOfIndia.mp4"
        className="w-[60%] h-full object-cover border p-5 border-none"
        autoPlay
        loop
        muted

      />
    </div>
    </>
  );
};

export default ImageGallery;
