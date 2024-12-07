import { Link } from "react-router-dom";
import item from "../JSON/CarousalData.json";
import { useRef, useState, useEffect } from "react";

const Carousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        let newVisibleCards = 1;
        if (containerWidth >= 1024) newVisibleCards = 5;
        else if (containerWidth >= 768) newVisibleCards = 3;
        else if (containerWidth >= 640) newVisibleCards = 2;
        setVisibleCards(newVisibleCards);
        setCardWidth(containerWidth / newVisibleCards);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const slideCards = (direction: number) => {
    if (carouselRef.current) {
      const scrollAmount = cardWidth * visibleCards * direction;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#1F3D3B]  p-4 sm:p-6 md:p-8 lg:p-10 mt-28 text-white rounded-xl relative" style={{ boxShadow: "0 -5px 40px black" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-2xl sm:text-3xl font-semibold">Recommended Destinations for You</h2>
        {/* <Link to="/destinations" className="text-sm underline">
          See more
        </Link> */}
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ gridAutoColumns: `${cardWidth}px` }}
        >
          {item.map((item, index) => (
            <div
              key={index}
              className="relative w-full aspect-[2/3] snap-start"
            >
              <Link to={item.url} className="block h-full">
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-400 hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-sm">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-gray-400">{item.location}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => slideCards(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-900 p-2 rounded-full hover:text-black hover:bg-white z-10"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => slideCards(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-900 p-2 rounded-full hover:text-black hover:bg-white z-10"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;

