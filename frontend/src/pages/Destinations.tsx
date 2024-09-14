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
  const [items] = useState<CarouselItem[]>([
    {
      image: '/assets/IND/image1.jpg',
      author: 'MUMBAI',
      title: 'Create Memories for a Lifetime',
      topic: 'Taj Hotel',
      url:'https://adventurer-omega.vercel.app/',
      description:
      " Each Taj holiday is crafted with impeccable detail for you and your loved ones. Delve into exotic international getaways or venture into wondrous natural settings. Realise moments that you will cherish for a lifetime."
    },
    {
      image: '/assets/IND/image2.jpg',
      author: 'CESS',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url:'https://adventurer-omega.vercel.app/BaseContent',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
    {
      image: '/assets/IND/image3.jpg',
      author: 'PANDA',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url:'https://adventurer-omega.vercel.app/Account',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
    {
      image: '/assets/IND/image4.jpg',
      author: 'BATMAN',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url:'https://adventurer-omega.vercel.app/',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
    {
      image: '/assets/IND/image5.jpg',
      author: 'vishal',
      title: 'DESIGN SLIDER',
      topic: 'ANIMAL',
      url:'https://adventurer-omega.vercel.app/',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt minima placeat, itaque eum neque officiis unde.',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Automatically go to the next slide every 5 seconds
  useEffect(() => {
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

  // Handle moving to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
    setTranslateX((prev) => prev - 180); // Translate left
  };

  // Handle moving to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
    setTranslateX((prev) => prev + 180); // Translate right
  };

  return (
    <div className="carousel  relative h-screen w-full overflow-hidden">
      <div className="list absolute inset-0">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item absolute inset-0 ${
              index === currentIndex ? 'z-10' : ''
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="content absolute top-1/4 w-4/5 max-w-screen-lg left-1/2 transform -translate-x-1/2 text-white">
              <div className="author font-bold">{item.author}</div>
              <div className="title text-5xl font-bold leading-tight">
                {item.title}
              </div>
              <div className="topic text-5xl font-bold leading-tight text-[#000000]">
                {item.topic}
              </div>
              <div className="description mt-4">{item.description}</div>
              <div className="buttons grid grid-cols-2 grid-rows-1 gap-5 mt-8">
                <button className="bg-gray-900 ">SEE MORE</button>
                <button className="bg-transparent">SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      {/* Thumbnail Section */}
      <div className="thumbnail absolute bottom-[50px] left-[40%] z-20 flex gap-5">
        {items.map((item, index) => (
          
          <div
            key={index}
            className="item w-40 h-60 shrink-0 relative transform transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${translateX}px)` }}
            
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

      {/* Navigation Arrows */}
      <div className="arrows absolute top-3/4 left-[17%] z-20 flex gap-5">
        <button
          onClick={prevSlide}
          className="w-10 h-10 bg-gray-900 rounded-full text-white font-bold"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-gray-200 rounded-full text-white font-bold"
        >
          &gt;
        </button>
      </div>

      {/* Progress Bar */}
      <div
        className={`time absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-[3000ms] ease-linear ${
          currentIndex === 0 ? 'w-full' : 'w-0'
        }`}
      ></div>
    </div>
  );
};

export default Carousel;
