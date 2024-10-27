import { useState } from "react";
import { FcLike } from "react-icons/fc";

const Categories = () => {
  const [items, setItems] = useState([
    {
      image: "/assets/Seasons/Autumn1.jpg",
      heading: "Wildlife & Nature",
      link: "www.xyz.com",
      like: 0,
    },
    {
      image: "/assets/Seasons/Autumn2.jpg",
      heading: "Wildlife & Nature",
      link: "www.xyz.com",
      like: 0,
    },
    {
      image: "/assets/Seasons/Autumn3.jpg",
      heading: "Wildlife & Nature",
      link: "www.xyz.com",
      like: 0,
    },
    {
      image: "/assets/Seasons/Spring1.jpg",
      heading: "Wildlife & Nature",
      link: "www.xyz.com",
      like: 0,
    },
    {
        image: "/assets/Seasons/Winter1.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        image: "/assets/Seasons/Winter2.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        image: "/assets/Seasons/Summer3.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        image: "/assets/Seasons/Summer2.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        image: "/assets/Seasons/Summer1.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        image: "/assets/Seasons/Spring2.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        image: "/assets/Seasons/Spring3.jpg",
        heading: "Wildlife & Nature",
        link: "www.xyz.com",
        like: 0,
      },
      {
        // image: "/assets/Seasons/image5.jpg",
        heading: "SEE MORE",
        link: "www.xyz.com",
        like: 0,
      },
    // Add other items as needed
  ]);

  return (
    <>
       <h1 className="font-extrabold text-center text-[60px]">Your Travel Categories</h1>
      <div className="justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8 mx-20 bg-white">
        {items.map((item, Seasonsex) => (
          <div
            key={Seasonsex}
            className="rounded-xl relative w-[335px] h-[256px] bg-zinc-700"
          >
            <div className="overflow-hidden rounded-xl w-full h-full">
              <img
                src={item.image}
                alt={`Image ${Seasonsex + 1}`}
                title={item.heading}
                className="w-full h-full object-cover rounded-xl transition-transform duration-1000 hover:scale-125"
              />
            </div>
            <h2 className="text-center text-2xl font-bold absolute top-[80%] left-[25%] text-white">
              {item.heading}
            </h2>
            <button
              onClick={() =>
                setItems((prevItems) =>
                  prevItems.map((prevItem, i) =>
                    i === Seasonsex
                      ? { ...prevItem, like: (prevItem.like || 0) + 1 }
                      : prevItem
                  )
                )
              }
              className="bg-white absolute flex gap-2 align-middle justify-center bottom-2 left-2 text-black px-2 py-1 rounded-full"
            >
              <FcLike /> {item.like || 0}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
