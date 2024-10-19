import { useState } from "react";
import { FcLike } from "react-icons/fc";


const ImageGallery = () => {
    const [like, setlike] = useState(0);
    const [items, setItems] = useState([
        {
            image: '/assets/IND/image1.jpg',
            like: 0,
            name:'Gateway Of India'
        },
        {
            image: '/assets/IND/image2.jpg',
            like: 0,
            name:'Taj Mahal'
        },
        {
            image: '/assets/IND/image3.jpg',
            like: 0,
            name:'Banaras'
        },
        {
            image: '/assets/IND/image4.jpg',
            like: 0,
            name:'Konark Temple'

        },
        {
            image: '/assets/IND/image5.jpg',
            like: 0,
            name:'Hawa Mahal'
        },
        {
            image: '/assets/IND/image1.jpg',
            like: 0,
            name:'Qutub Minar'
        },
    ]);



  return (
    <>
    <div className=" flex gap-2 image-gallery h-screen w-full bg-white">
           

        <div className="left-section relative h-full w-[50%] bg-white flex flex-col justify-center items-center">
           <div className="grid grid-cols-2 gap-4 p-10">
            {items.map((item, index) => (
                <div key={index} className="overflow-hidden rounded-xl relative">
                    <img src={item.image} alt={`Image ${index + 1}`} title={item.name} className="w-full h-[200px] object-cover rounded-xl transition-all duration-400 hover:scale-125" />
                    <h2 className=" text-center text-2xl font-bold absolute top-[80%] left-[25%] text-white">{item.name}</h2>
                    <button 
                        onClick={() => setItems(prevItems => prevItems.map((prevItem, i) => 
                            i === index ? { ...prevItem, like: (prevItem.like || 0) + 1 } : prevItem
                        ))} 
                        className="bg-white absolute bottom-2 left-2 text-black px-2 py-1 rounded-full"
                    >
                        <FcLike /> {item.like || 0}
                    </button>
                </div>
            ))}
           </div>
        </div>

        <video
        src="/assets/Videos/GatewayOfIndia.mp4"
        className="w-[60%] h-full object-cover border p-5 border-none"
        autoPlay
        loop
        muted
        />

    </div>
    </>
  )
}

export default ImageGallery;