import { useState } from "react";
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
    <div className="bg-white shadow-md rounded-md p-4 w-72">
      <div className="h-32 w-40">
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

  return (
<div className="Coupons&Deals bg-gray-900 p-8 my-10 rounded-t-[100px]" style={{ boxShadow: "0 -5px 40px black" }} data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-6 text-center text-white text-[100px] p-10">Coupons & Deals</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {items.map((item, index) => (
          <CouponCard
            key={index}
            title={item.title}
            logo={item.logo}
            description={item.description}
            code={item.code}
          />
        ))}
      </div>
    </div>
  );
};

export default CouponsAndDeals;
