import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import categoriesData from '../JSON/CatagoriesData.json';

type CategoryItem = {
  image?: string;
  heading: string;
  link: string;
  like: number;
};

const Categories: React.FC = () => {
  const [items, setItems] = useState<CategoryItem[]>(categoriesData);

  const handleLike = (index: number) => {
    setItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, like: item.like + 1 } : item
      )
    );
  };

  return (
    <>
      <h1 className="font-extrabold text-center text-[60px]">Your Travel Categories</h1>
      <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 mx-20 bg-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl relative w-[335px] h-[256px] bg-zinc-700"
          >
            {item.image && (
              <div className="overflow-hidden rounded-xl w-full h-full">
                <img
                  src={item.image}
                  alt={`Image ${index + 1}`}
                  title={item.heading}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-1000 hover:scale-125"
                />
              </div>
            )}
            <h2 className="text-center text-2xl font-bold absolute top-[80%] left-[25%] text-white">
              {item.heading}
            </h2>
            <button
              onClick={() => handleLike(index)}
              className="bg-white absolute flex gap-2 align-middle justify-center bottom-2 left-2 text-black px-2 py-1 rounded-full"
            >
              <FcLike /> {item.like}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
