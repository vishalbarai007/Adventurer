import { useState, useEffect, useRef, FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Compass } from 'lucide-react';

interface CarouselItem {
  image: string;
  author: string;
  title: string;
  topic: string;
  url: string;
  description: string;
}

const Carousel: FC = () => {
  const [items] = useState<CarouselItem[]>([
    {
      "image": "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056494/adventurer_assets_migration/images/Rajmachi_hmbkia.jpg",
      "author": "FORTS",
      "title": "Freedom Begins Here",
      "topic": "Historic Fort Trekking",
      "url": "/destinations/historical",
      "description": "Uncover the spirit of freedom as you trek across historic forts. Each step brings you closer to breathtaking views and rich heritage."
    },
    {
      "image": "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056287/adventurer_assets_migration/images/Summer2_sq4skx.jpg",
      "author": "BEACHES",
      "title": "Ride the Waves",
      "topic": "Coastal Water Sports",
      "url": "/destinations/beaches",
      "description": "Dive into adventure with thrilling water sports. From jet skiing to surfing, feel the rush of adrenaline on serene beaches."
    },
    {
      "image": "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778057683/adventurer_assets_migration/images/thoseghar_qaik9s.jpg",
      "author": "WATERFALLS",
      "title": "Dive Deep in Nature",
      "topic": "Plunging Adventures",
      "url": "/destinations/waterfalls",
      "description": "Experience the exhilarating plunge into nature’s wonders. Conquer waterfalls with a heart-pounding jump into the wild."
    },
    {
      "image": "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778057442/adventurer_assets_migration/images/andheri_ycuval.jpg",
      "author": "SANCTUARY",
      "title": "Lifetime Memories",
      "topic": "Wildlife Safaris",
      "url": "/destinations/sanctuary",
      "description": "Explore the untamed beauty of sanctuaries. Witness majestic animals in their natural habitats and create cherished memories."
    },
    {
      "image": "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056300/adventurer_assets_migration/images/Mahabaleshwar_yf3qxa.png",
      "author": "HILL STATIONS",
      "title": "Serene Escapes",
      "topic": "Family & Friends",
      "url": "/destinations/family-friendly",
      "description": "Rejuvenate in the tranquil beauty of hill stations. Perfect for bonding with loved ones amidst picturesque landscapes."
    },
    {
      "image": "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056188/adventurer_assets_migration/images/SoloTravelling_xywhrh.png",
      "author": "THE SOLO EXPLORER",
      "title": "Find Your Path",
      "topic": "Solo Adventures",
      "url": "/destinations/solo-travel",
      "description": "Embark on a journey of self-discovery. Perfect for independent adventurers seeking solitude and uncharted paths."
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const autoNext = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    timeoutRef.current = setInterval(autoNext, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full h-[85vh] min-h-[620px] overflow-hidden font-jakarta bg-[#111827]">
      {/* Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentItem.image} 
          alt={currentItem.title} 
          loading="eager"
          className="w-full h-full object-cover transition-all duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-black/30 to-black/50" />
      </div>

      {/* Main Showcase Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1280px] mx-auto px-6 lg:px-20 py-16 flex flex-col justify-between text-white">
        <div>
          <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full border border-white/20 inline-flex items-center gap-1.5 backdrop-blur-md">
            <Compass className="w-4 h-4" />
            {currentItem.author} • {currentItem.topic}
          </span>
        </div>

        <div className="max-w-3xl space-y-4 mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
            {currentItem.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
            {currentItem.description}
          </p>
          <div className="pt-3">
            <Link 
              to={currentItem.url} 
              className="inline-flex items-center gap-2 bg-white text-[#111827] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg text-base"
            >
              Explore {currentItem.author}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Thumbnail Selector at bottom */}
        <div className="flex items-center gap-3 overflow-x-auto pt-4 pb-2 scrollbar-hide border-t border-white/15">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-28 md:h-18 rounded-xl overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-[#3A8DFF] scale-105 shadow-lg opacity-100' : 'border-white/30 opacity-60 hover:opacity-100'}`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white uppercase tracking-wider truncate max-w-[90%]">
                {item.author}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;