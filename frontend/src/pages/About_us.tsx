import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface CarouselItem {
  image: string;
  author: string;
  title: string;
  topic: string;
  url: string;
  description: string;
}

const Carousel: React.FC = () => {
  const [items, setItems] = useState<CarouselItem[]>([
    {
      image: '/assets/IND/image1.jpg',
      author: 'MUMBAI',
      title: 'Create Memories for a Lifetime',
      topic: 'Taj Hotel',
      url: 'https://adventurer-omega.vercel.app/',
      description: "Each Taj holiday is crafted with impeccable detail for you and your loved ones. Delve into exotic international getaways or venture into wondrous natural settings. Realise moments that you will cherish for a lifetime."
    },
    {
      image: '/assets/IND/image2.jpg',
      author: 'CESS',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url: 'https://adventurer-omega.vercel.app/BaseContent',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
    {
      image: '/assets/IND/image3.jpg',
      author: 'PANDA',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url: 'https://adventurer-omega.vercel.app/Account',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
    {
      image: '/assets/IND/image4.jpg',
      author: 'BATMAN',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url: 'https://adventurer-omega.vercel.app/',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
    {
      image: '/assets/IND/image5.jpg',
      author: 'vishal',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url: 'https://adventurer-omega.vercel.app/',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [sliding, setSliding] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const autoNext = () => {
      nextSlide();
      timeoutRef.current = setTimeout(autoNext, 3000);
    };

    timeoutRef.current = setTimeout(autoNext, 3000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    if (sliding) return;
    setSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    slideThumbnails(-1);
  };

  const prevSlide = () => {
    if (sliding) return;
    setSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    slideThumbnails(1);
  };

  const slideThumbnails = (direction: number) => {
    if (thumbnailRef.current) {
      const itemWidth = thumbnailRef.current.children[0].clientWidth;
      const gap = 20; // Adjust this value to match your gap between items
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
    <div className="carousel relative h-screen w-full overflow-hidden">
      <div className="list absolute inset-0">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'z-10 opacity-100' : 'opacity-0'}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="content absolute top-1/4 w-4/5 max-w-screen-lg left-1/2 transform -translate-x-1/2 text-white">
              <div className="author font-bold">{item.author}</div>
              <div className={`title text-5xl font-bold leading-tight transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                {item.title}
              </div>
              <div className="topic text-5xl font-bold leading-tight text-[#000000]">
                {item.topic}
              </div>
              <div className="description mt-4">{item.description}</div>
              <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-8">
                <button className="bg-gray-900">SEE MORE</button>
                <button className="bg-transparent">SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="thumbnail absolute bottom-[50px] left-[40%] z-20 flex gap-5">
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
              <div className="content absolute bottom-2 left-2 right-2 text-white">
                <div className="title font-medium">{item.title}</div>
                <div className="description font-light">{item.topic}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="arrows absolute top-3/4 left-[17%] z-20 flex gap-5">
        <button onClick={prevSlide} className="w-10 h-10 bg-gray-900 rounded-full text-white font-bold">
          &lt;
        </button>
        <button onClick={nextSlide} className="w-10 h-10 bg-gray-200 rounded-full text-white font-bold">
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
      {/* Add any additional content for the Destinations page here */}
    </div>
  );
};

export default Destinations;