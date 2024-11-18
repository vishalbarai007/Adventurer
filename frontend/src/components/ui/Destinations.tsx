import React, { useState, useEffect, useRef, FC } from 'react';
import { Link } from 'react-router-dom';
import ScrollDownButton from './ScrollDownButton';
// import Pre_login_menubar from './pre_login_menubar';
// import ass from '../../assets/Seasons/Summer1.jpg'

interface CarouselItem {
  image: string;
  author: string;
  title: string;
  topic: string;
  url: string;
  description: string;
}

const Carousel: FC = () => {
  const [items, setItems] = useState<CarouselItem[]>([
    {
      "image": "/assets/forts/Rajmachi.png",
      "author": "FORTS",
      "title": "Freedom Begins from Here",
      "topic": "Trekking",
      "url": "https://adventurer-omega.vercel.app/",
      "description": "Uncover the spirit of freedom as you trek across historic forts. Each step brings you closer to breathtaking views and unforgettable experiences."
    },
    {
      "image": "/assets/Seasons/Summer2.jpg",
      "author": "BEACHES",
      "title": "Ride the Waves",
      "topic": "Water Sports",
      "url": "https://adventurer-omega.vercel.app/BaseContent",
      "description": "Dive into adventure with thrilling water sports. From jet skiing to surfing, feel the rush of adrenaline on serene beaches."
    },
    {
      "image": "/assets/waterfalls/thoseghar.jpg",
      "author": "WATERFALLS",
      "title": "Dive Deep in Nature",
      "topic": "Plunging Adventures",
      "url": "https://adventurer-omega.vercel.app/Account",
      "description": "Experience the exhilarating plunge into nature’s wonders. Conquer waterfalls with a heart-pounding jump that connects you to the wild."
    },
    {
      "image": "/assets/sanctuary/andheri.jpg",
      "author": "SANCTUARY",
      "title": "Create Memories for a Lifetime",
      "topic": "Wildlife Safari",
      "url": "https://adventurer-omega.vercel.app/",
      "description": "Explore the untamed beauty of sanctuaries. Witness majestic animals in their natural habitats and create memories you’ll cherish forever."
    },
    {
      "image": "/assets/IND/Mahabaleshwar.png",
      "author": "HILL STATIONS",
      "title": "Serene Escapes",
      "topic": "Family & Friends",
      "url": "https://adventurer-omega.vercel.app/",
      "description": "Rejuvenate in the tranquil beauty of hill stations. Perfect for bonding with loved ones amidst picturesque landscapes."
    },
    {
      "image": "/assets/IND/SoloTravelling.png",
      "author": "THE SOLO EXPLORER",
      "title": "Find Your Path",
      "topic": "Solo Adventures",
      "url": "https://adventurer-omega.vercel.app/",
      "description": "Embark on a journey of self-discovery. Perfect for independent adventurers seeking solitude and the thrill of uncharted paths."
    },
    {
      "image": "/assets/IND/EcoTrails.png",
      "author": "THE NATURE LOVER",
      "title": "Harmony with Nature",
      "topic": "Eco Trails",
      "url": "https://adventurer-omega.vercel.app/Account",
      "description": "Connect with the earth on peaceful eco trails. Immerse yourself in flora and fauna that will soothe your soul."
    },
    // {
    //   "image": "/assets/Seasons/Winter1.jpg",
    //   "author": "THE THRILL SEEKER",
    //   "title": "Chasing Adrenaline",
    //   "topic": "Extreme Sports",
    //   "url": "https://adventurer-omega.vercel.app/BaseContent",
    //   "description": "For those who crave the extreme. Take on challenges that push your limits and leave you with unforgettable stories."
    // },
    // {
    //   "image": "/assets/Seasons/Winter1.jpg",
    //   "author": "THE FAMILY TRAVELER",
    //   "title": "Adventures for All Ages",
    //   "topic": "Group Adventures",
    //   "url": "https://adventurer-omega.vercel.app/",
    //   "description": "Perfect for family bonding. Discover activities and destinations that cater to every member of your tribe."
    // }
  ]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Comment out the auto-change functionality
    
    const autoNext = () => {
      nextSlide();
      timeoutRef.current = setTimeout(autoNext, 5000);
    };

    timeoutRef.current = setTimeout(autoNext, 5000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    
  }, []);

  const nextSlide = () => {
    if (sliding) return;
    setSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex) % items.length);
    setBackgroundIndex((prevIndex) => (prevIndex) % items.length);
    slideThumbnails(-1);
  };

  const prevSlide = () => {
    if (sliding) return;
    setSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex + items.length) % items.length);
    setBackgroundIndex((prevIndex) => (prevIndex + items.length) % items.length);
    slideThumbnails(1);
  };

  const slideThumbnails = (direction: number) => {
    if (thumbnailRef.current) {
      const itemWidth = thumbnailRef.current.children[0].clientWidth;
      const gap = 25; // Adjust this value to match your gap between items
      thumbnailRef.current.style.transition = 'transform 0.3s ease-in-out';
      thumbnailRef.current.style.transform = `translateX(${direction * (itemWidth + gap)}px)`;

      setTimeout(() => {
        rotateItems(direction);
        thumbnailRef.current!.style.transition = 'none';
        thumbnailRef.current!.style.transform = 'translateX(0)';
        setSliding(false);
      }, 300);
    }
  };

  const rotateItems = (direction: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      if (direction < 0) {
        const firstItem = newItems.shift();
        if (firstItem) newItems.push(firstItem);
      } else {
        const lastItem = newItems.pop();
        if (lastItem) newItems.unshift(lastItem);
      }
      return newItems;
    });
  };

  return (
<div className="carousel relative h-screen w-full overflow-hidden ">
        <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url(${items[backgroundIndex].image})` }}
      ></div>

      <div className="list absolute inset-0">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item absolute inset-0 duration-1000 ${
              index === currentIndex ? 'z-10 opacity-100' : 'opacity-0'
            }`}
            style={{
              zIndex: index === 0 && index !== currentIndex ? -1 : 'auto',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            
            <div className="content absolute top-1/4 w-4/5 max-w-screen-lg left-1/2 transform -translate-x-1/2 text-[#EADED0]">
              <div className="author font-bold text-[#EADED0] text-stroke">{item.author}</div>
              <div className="title text-5xl text-[#EADED0] text-stroke font-bold leading-tight">
                {item.title}
              </div>
              <div className="topic text-5xl font-bold leading-tight text-[#000000]">
                {item.topic}
              </div>
              <div className="description mt-4">{item.description}</div>
              <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-8">
                <button className="bg-[#1F3D3B]">SEE MORE</button>
                <button className="BookButton bg-[#233115]">BOOK NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='thumbnail overflow-hidden absolute bottom-[50px] left-[40%] p-5'>
      <div ref={thumbnailRef} className=" flex gap-5">
        {items.map((item, index) => (
          <div
            key={index}
            className="item w-40 h-60 shrink-0 relative"
          >
            <Link to={item.url}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="content absolute bottom-2 left-2 right-2 text-[#EADED0]">
                <div className="title font-medium">{item.title}</div>
                <div className="description font-light">{item.topic}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>

      <div className="arrows absolute top-3/4 left-[25%] z-20 flex gap-5">
        <button onClick={prevSlide} className="w-16 h-16 rounded-full text-[#EADED0] font-bold">
          &lt;
        </button>
        <button onClick={nextSlide} className="w-16 h-16 rounded-full text-[#EADED0] font-bold">
          &gt;
        </button>
      </div>

      <div
        className={`time absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-[3000ms] ease-linear`}
        style={{ width: `${(currentIndex + 1) / items.length * 100}%` }}
      ></div>
    </div>
  );
};

const Destinations: React.FC = () => {
  return (
    <div className="destinations-page">
      <Carousel />
      <ScrollDownButton/>
    </div>
  );
};

export default Destinations;