import { useState, useRef, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import couponsData from '@/data/CouponsData.json';

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
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between h-full font-jakarta">
      <div>
        <div className="h-24 w-full mb-3 flex items-center justify-center p-2 bg-gray-50 rounded-xl">
          <img src={logo} alt={title} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="text-base font-bold text-[#171717] mb-1">{title}</div>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed font-medium">{description}</p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
        <div className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-mono font-bold text-[#111827]">
          {code}
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-[#3A8DFF] hover:text-[#111827] transition-colors">
          <FaCopy size={12} /> Copy
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
    <section className="bg-[#111827] text-white p-8 md:p-12 rounded-[32px] font-jakarta shadow-sm border border-gray-800" data-aos="fade-up">
      <div className="text-center mb-8">
        <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider mb-2 block">Exclusive Offers</span>
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-white">Coupons & Deals</h2>
      </div>

      <div className="relative px-4">
        <div
          ref={carouselRef}
          className="grid grid-flow-col auto-cols-max gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ gridAutoColumns: `${cardWidth - 18}px` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full">
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CouponsAndDeals;
