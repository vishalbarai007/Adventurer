import { useState } from "react";
import { FaCopy } from "react-icons/fa";

const CouponCard = ({ title, description, code }: { title: string; description: string; code: string }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-64">
      <div className="text-sm font-bold mb-1">{title}</div>
      <div className="text-xs mb-3">{description}</div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">Code</span>
        <div className="font-bold text-blue-600 text-xs">{code}</div>
        <button className="text-blue-600 text-xs underline">Copy</button>
      </div>
    </div>
  );
};

const CouponsAndDeals = () => {

    const [items,setItems] = useState([
        {
            title:"Uber",
            logo:"/assets/BrandLogos/Uber/Uber.png",
            description:"Grab Up to Rs 200 with Intercity Bookings",
            code:"USEIC15"
        },
        {
            title:"MakeMyTrip",
            logo:"/assets/BrandLogos/MakeMyTrip/MMK.png",
            description:"Sale: Up to Rs 2000 Off on Domestic Flights",
            code:"MMTSUPER"
        },
        {
            title:"FabHotels",
            logo:"/assets/BrandLogos/FabHotels/FabHotels.png",
            description:"AU Small Finance Bank Offer: Get Flat 30% Discount on Payments Today",
            code:"STAYAU"
        },
        {
            title:"Oyo",
            logo:"/assets/BrandLogos/OYO/Oyo.png",
            description:"Get Flat 33% Off on All OYO Hotel bookings in USA",
            code:"OYOGOUSA"
        },
        {
          title:"Trivago",
          logo:"/assets/BrandLogos/Trivago/Trivago_Logo_1.png",
          description:"Get Flat 33% Off on All OYO Hotel bookings in USA",
          code:"OYOGOUSA"
       },
    ])


  return (
    <div className="bg-gray-900 p-8 my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-white text-[100px] p-10">Coupons & Deals</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {items.map((item) => (
            <div className="bg-white shadow-md rounded-md p-4 w-72">
            <div className="h-32 w-40">
              <img src={item.logo} />
            </div>
            <div className="text-sm font-bold mb-1">{item.title}</div>
            <div className="text-xs mb-3">{item.description}</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">Code</span>
              <div className="font-bold text-blue-600 text-xs">{item.code}</div>
              <button className="flex gap-2 text-blue-600 text-xs underline"><FaCopy />Copy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsAndDeals;
// https://www.amazon.in/Redmi-Stealth-Bezel-Less-Slimmest-Pro-Grade/dp/B0CQPHMWR3?th=1