import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiBookOpen } from "react-icons/fi";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface BlogsCarouselProps {
  destinations: Blog[];
}

export default function BlogsCarousel({ destinations }: BlogsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoplay]);

  if (!destinations || destinations.length === 0) return null;

  return (
    <div 
      className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-2 font-jakarta"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      <div className="relative w-full h-[460px] flex items-center justify-center overflow-hidden">
        {destinations.map((blog, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={blog.id}
              className={`absolute w-full h-full transition-all duration-500 ease-out select-none
                ${isActive ? "opacity-100 scale-100 z-20 pointer-events-auto" : "opacity-0 scale-95 z-10 pointer-events-none"}
              `}
            >
              <div className="w-full h-full bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-sm flex flex-col group text-[#171717]">
                <div className="relative h-[240px] w-full overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 z-20 text-xs font-bold uppercase tracking-wider bg-[#111827] text-white px-3 py-1 rounded-full shadow-sm">
                    Featured
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-[#171717] leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 font-medium leading-relaxed">
                      {blog.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      className="w-full bg-[#111827] text-white font-bold rounded-full py-3 hover:bg-[#1F2937] transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                    >
                      <FiBookOpen className="w-4 h-4" />
                      <span>Read Featured Story</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation */}
      <div className="flex items-center justify-between w-full mt-4 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-white border border-gray-200 text-[#171717] hover:bg-gray-100 transition-colors shadow-sm"
            aria-label="Previous Slide"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-[#111827] text-white hover:bg-[#1F2937] transition-colors shadow-sm"
            aria-label="Next Slide"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-[#3A8DFF]" : "w-2 bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
