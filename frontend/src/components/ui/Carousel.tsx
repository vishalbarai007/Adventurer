import { Link } from "react-router-dom";
import item from "../JSON/CarousalData.json";
import { useRef } from "react";

const Carousel = () => {
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const slideThumbnails = (direction: number) => {
    console.log(`Sliding thumbnails by ${direction}`); // Debug log for button click
    if (thumbnailRef.current) {
      const scrollAmount = thumbnailRef.current.clientWidth / 2; // Scroll by half the width
      thumbnailRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  return (
    <div className="bg-[#1F3D3B] h-max p-10 mt-28 text-white rounded-xl relative" style={{ boxShadow: "0 -5px 40px black" }}>
      <div className=" justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Recommended Destinations for You</h2>
        <Link to="/destinations" className="text-sm underline">
          See more
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={thumbnailRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {item.map((item, index) => (
            <div
              key={index}
              className="relative min-w-[200px] max-w-[320px] h-[450px] shrink-0 bg-gray-800 rounded-xl overflow-hidden"
            >
              <Link to={item.url}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-400 hover:scale-125"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-sm">
                  <div className="font-semibold">{item.title} </div>
                  <div className="text-gray-400">{item.location}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => slideThumbnails(-1)}
          className="arrows absolute w-12  left-0 top-1/2 -translate-y-1/2 bg-zinc-900 p-3 rounded-full hover:bg-white"
        >
          &#8249;
        </button>
        <button
          onClick={() => slideThumbnails(1)}
          className="arrows absolute w-12  right-0 top-1/2 -translate-y-1/2 bg-zinc-900 p-3 rounded-full hover:bg-white"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
