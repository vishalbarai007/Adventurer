import { useState } from "react";

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
            description:"Grab Up to Rs 200 with Intercity Bookings",
            code:"USEIC15"
        },
        {
            title:"MakeMyTrip",
            description:"Sale: Up to Rs 2000 Off on Domestic Flights",
            code:"MMTSUPER"
        },
        {
            title:"FabHotels",
            description:"AU Small Finance Bank Offer: Get Flat 30% Discount on Payments Today",
            code:"STAYAU"
        },
        {
            title:"Oyo",
            description:"Get Flat 33% Off on All OYO Hotel bookings in USA",
            code:"OYOGOUSA"
        }
    ])


  return (
    <div className="bg-gray-900 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-[0px]">Coupons & Deals</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {items.map((item, index) => (
            <div className="bg-white shadow-md rounded-md p-4 w-64">
            <div className="text-sm font-bold mb-1">{item.title}</div>
            <div className="text-xs mb-3">{item.description}</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-xs">Code</span>
              <div className="font-bold text-blue-600 text-xs">{item.code}</div>
              <button className="text-blue-600 text-xs underline">Copy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsAndDeals;
 