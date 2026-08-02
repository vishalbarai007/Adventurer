import { Link } from "react-router-dom";
import item from "@/data/CarousalData.json";
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
        if (containerWidth >= 1024) newVisibleCards = 4;
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
    <section className="bg-[#111827] text-white p-8 md:p-12 rounded-[32px] font-jakarta shadow-sm border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider mb-1 block">Curated Trails</span>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white">Recommended Destinations</h2>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative px-2">
        <div
          ref={carouselRef}
          className="grid grid-flow-col auto-cols-max gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ gridAutoColumns: `${cardWidth - 18}px` }}
        >
          {item.map((curr, index) => (
            <div key={index} className="w-full">
              <Link to={curr.url} className="block relative h-[320px] rounded-[24px] overflow-hidden group shadow-sm border border-gray-700">
                <img
                  src={curr.image}
                  alt={curr.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="font-extrabold text-lg leading-snug">{curr.title}</div>
                  <div className="text-xs text-gray-300 font-medium mt-1">{curr.location}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => slideCards(-1)}
          className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white text-[#111827] p-3 rounded-full hover:bg-gray-200 transition-colors shadow-md z-10"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => slideCards(1)}
          className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white text-[#111827] p-3 rounded-full hover:bg-gray-200 transition-colors shadow-md z-10"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
