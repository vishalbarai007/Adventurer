import { useState, useRef, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import couponsData from '../JSON/CouponsData.json';

type Coupon = {
  title: string;
  logo: string;
  description: string;
  code: string;
};

const CouponCard = ({ title, description, code, logo }: Coupon) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert(`${code} copied to clipboard!`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full">
      <div className="h-32 w-full mb-2">
        <img src={logo} alt={`${title} logo`} className="w-full h-full object-contain" />
      </div>
      <div className="text-sm font-bold mb-1">{title}</div>
      <div className="text-xs mb-3">{description}</div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Code</span>
        <div className="font-bold text-blue-600 text-xs">{code}</div>
        <button onClick={handleCopy} className="flex gap-2 text-blue-600 text-xs underline">
          <FaCopy /> Copy
        </button>
      </div>
    </div>
  );
};

const CouponsAndDeals = () => {
  const [items] = useState<Coupon[]>(couponsData);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        let newVisibleCards = 1;
        if (containerWidth >= 1024) newVisibleCards = 6;
        else if (containerWidth >= 768) newVisibleCards = 4;
        else if (containerWidth >= 640) newVisibleCards = 3;
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
    <div className="Coupons&Deals bg-[#1F3D3B] p-4 sm:p-6 md:p-8 rounded-t-[50px] sm:rounded-t-[75px] md:rounded-t-[100px]" style={{ boxShadow: "0 -5px 40px black" }} data-aos="fade-up">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-center capitalize text-white p-4 sm:p-6 md:p-10">Coupons & Deals</h2>
      <div className="relative">
        <div
          ref={carouselRef}
          className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ gridAutoColumns: `${cardWidth}px` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full snap-start">
              <CouponCard
                title={item.title}
                logo={item.logo}
                description={item.description}
                code={item.code}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button
          onClick={() => slideCards(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-900 p-2 rounded-full hover:text-black hover:bg-white z-10 text-white"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => slideCards(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-900 p-2 rounded-full hover:text-black hover:bg-white z-10 text-white"
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

export default CouponsAndDeals;

