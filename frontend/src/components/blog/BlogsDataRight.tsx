import React from 'react';
import { FiShoppingCart, FiStar, FiTag, FiInfo } from 'react-icons/fi';

interface AdProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  affiliateUrl: string;
}

const adProducts: AdProduct[] = [
  {
    id: "1",
    name: "TrekPro X-Grip High-Ankle Boots",
    category: "Footwear",
    description: "Conquer rugged terrain with waterproof lining, reinforced ankle support, and Vibram grip soles.",
    price: "₹5,499",
    originalPrice: "₹7,999",
    discount: "31% OFF",
    rating: 4.8,
    reviews: 142,
    image: "/assets/trekking_boots.png",
    features: ["Waterproof", "Vibram Sole", "Ankle Guard"],
    affiliateUrl: "https://www.decathlon.in"
  },
  {
    id: "2",
    name: "Sierra Dome 4-Person Camping Tent",
    category: "Shelter",
    description: "Ultralight, double-layer dome tent with windproof rainfly and mesh ventilation.",
    price: "₹7,899",
    originalPrice: "₹11,999",
    discount: "34% OFF",
    rating: 4.9,
    reviews: 98,
    image: "/assets/camping_tent.png",
    features: ["Windproof", "4-Person Capacity", "Dual Layer"],
    affiliateUrl: "https://www.decathlon.in"
  },
  {
    id: "3",
    name: "SummitExped 65L Trekking Backpack",
    category: "Gear",
    description: "Ergonomic load distribution system, integrated rain cover, and easy-access hydration pocket.",
    price: "₹3,999",
    originalPrice: "₹5,999",
    discount: "33% OFF",
    rating: 4.7,
    reviews: 215,
    image: "/assets/trekking_backpack.png",
    features: ["65L Capacity", "Rain Cover Incl.", "Hydration Slot"],
    affiliateUrl: "https://www.decathlon.in"
  }
];

const BlogsDataRight: React.FC = () => {
  return (
    <div className="BlogsContainerRight w-full md:w-[30%] p-6 bg-slate-100/70 border-t md:border-t-0 md:border-l border-slate-200/50 flex flex-col h-[calc(100vh-5rem)] md:h-screen overflow-y-auto">
      {/* Sidebar Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiTag className="text-green-700" size={18} />
          <h3 className="text-lg font-bold text-gray-800">Essential Trekking Gear</h3>
        </div>
        <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded tracking-widest uppercase bg-white">
          Sponsored
        </span>
      </div>

      {/* Ads List */}
      <div className="space-y-6 flex-grow pr-1">
        {adProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-50 overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {product.discount}
              </span>
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            {/* Product Body */}
            <div className="p-4">
              <h4 className="font-bold text-gray-800 text-sm leading-snug mb-1 hover:text-green-700 transition-colors">
                {product.name}
              </h4>
              
              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviews})</span>
              </div>

              <p className="text-xs text-gray-500 leading-normal mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Tags / Features */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.features.map((feature, i) => (
                  <span key={i} className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price & Buy Button */}
              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div>
                  <span className="text-base font-extrabold text-gray-900">{product.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-1.5">{product.originalPrice}</span>
                </div>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-200 flex items-center gap-1 shadow-sm hover:shadow"
                >
                  <FiShoppingCart size={12} />
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional Banner Widget */}
      <div className="mt-8 bg-gradient-to-br from-green-800 to-green-950 text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
        <div className="relative z-10">
          <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest bg-green-900/50 px-2 py-0.5 rounded border border-green-700/50 inline-block mb-2">
            Special Offer
          </span>
          <h4 className="font-extrabold text-base leading-snug mb-1">Gear Up For Your Next Trek</h4>
          <p className="text-xs text-green-100/80 mb-4 leading-normal">
            Get an extra 15% off on high-quality adventure and camping rentals.
          </p>
          <div className="flex justify-between items-center bg-green-900/30 border border-green-700/30 p-2.5 rounded-xl">
            <span className="text-xs font-mono font-bold tracking-wider text-green-200">
              Promo: ADVENTURER15
            </span>
            <span className="text-[11px] font-bold text-white underline cursor-pointer hover:text-green-200">
              Apply
            </span>
          </div>
        </div>
        {/* Background Decorative Circle */}
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-green-700/20 rounded-full blur-xl"></div>
      </div>

      {/* Info Notice */}
      <div className="mt-6 flex items-start gap-1.5 text-[10px] text-gray-400 leading-normal px-1">
        <FiInfo size={12} className="flex-shrink-0 mt-0.5" />
        <span>
          Purchases made through these sponsored links may earn Adventurer a small affiliate commission at no extra cost to you.
        </span>
      </div>
    </div>
  );
};

export default BlogsDataRight;
