import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button-slate";
import { FiChevronLeft, FiChevronRight, FiBookOpen } from "react-icons/fi";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface BlogsCarouselProps {
  destinations: Blog[]; // Named destinations to keep compatibility with existing data prop
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

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(nextSlide, 4500); // 4.5 seconds for better reading time
    return () => clearInterval(interval);
  }, [currentIndex, isAutoplay]);

  if (!destinations || destinations.length === 0) return null;

  return (
    <div 
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-8"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* 3D Carousel Container */}
      <div className="relative w-full h-[520px] md:h-[580px] flex items-center justify-center overflow-hidden pt-8">
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {destinations.map((blog, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + destinations.length) % destinations.length;
            const isNext = index === (currentIndex + 1) % destinations.length;

            return (
              <div
                key={blog.id}
                className={`absolute w-full max-w-[340px] md:max-w-[380px] h-[460px] md:h-[500px] transition-all duration-700 ease-out select-none
                  ${isActive 
                    ? "z-30 opacity-100 scale-100 translate-x-0 rotate-0 cursor-default" 
                    : isPrev 
                      ? "z-20 opacity-40 scale-85 -translate-x-[50%] md:-translate-x-[65%] -rotate-3 blur-[2px] pointer-events-none" 
                      : isNext 
                        ? "z-20 opacity-40 scale-85 translate-x-[50%] md:translate-x-[65%] rotate-3 blur-[2px] pointer-events-none" 
                        : "z-10 opacity-0 scale-75 translate-x-0 rotate-0 blur-[6px] pointer-events-none"
                  }
                `}
              >
                <Card className="w-full h-full bg-[#121c17]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col group">
                  <CardContent className="p-0 h-full flex flex-col relative">
                    
                    {/* Image Area with Overlay */}
                    <div className="relative h-[220px] md:h-[260px] w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121c17] via-transparent to-transparent z-10" />
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Floating Blog Badge */}
                      <span className="absolute top-4 left-4 z-20 text-[10px] font-mono tracking-widest uppercase bg-[#ffaa1c] text-[#012c18] font-bold px-3 py-1 rounded-full shadow-md">
                        Featured Post
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-3">
                        <h3 className="text-xl md:text-2xl font-bold font-serif text-white leading-snug group-hover:text-[#ffaa1c] transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <p className="text-white/60 text-xs md:text-sm line-clamp-3 leading-relaxed font-light">
                          {blog.description}
                        </p>
                      </div>

                      {/* Read More button aligned with website theme */}
                      <div className="pt-4">
                        <Button
                          variant="default"
                          className="w-full bg-gradient-to-r from-[#ffaa1c] to-[#ff7757] text-[#012c18] font-bold rounded-full py-5 hover:shadow-lg hover:shadow-[#ffaa1c]/25 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          <FiBookOpen className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                          <span>Read Article</span>
                        </Button>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modern Controls and Indicators Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full justify-between max-w-md border-t border-white/10 pt-6">
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200 active:scale-95 shadow-md"
            aria-label="Previous Slide"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200 active:scale-95 shadow-md"
            aria-label="Next Slide"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bullet Slide Indicators */}
        <div className="flex items-center gap-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 
                ${index === currentIndex 
                  ? "w-8 bg-[#ffaa1c]" 
                  : "w-2 bg-white/30 hover:bg-white/50"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
