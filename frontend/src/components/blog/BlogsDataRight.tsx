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
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    features: ["65L Capacity", "Rain Cover Incl.", "Hydration Slot"],
    affiliateUrl: "https://www.decathlon.in"
  }
];

const BlogsDataRight: React.FC = () => {
  return (
    <aside className="w-full lg:w-[32%] font-jakarta">
      {/* Sidebar Header */}
      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <FiTag className="text-[#3A8DFF]" size={18} />
          <h3 className="text-base font-bold text-[#171717]">Essential Trek Gear</h3>
        </div>
        <span className="text-[10px] font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full uppercase bg-gray-50">
          Sponsored
        </span>
      </div>

      {/* Ads List */}
      <div className="space-y-6">
        {adProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative h-44 bg-gray-50 overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#111827] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {product.discount}
              </span>
              <span className="absolute bottom-3 right-3 bg-white/90 text-[#171717] text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm border border-gray-200">
                {product.category}
              </span>
            </div>

            {/* Product Body */}
            <div className="p-5">
              <h4 className="font-bold text-[#171717] text-sm leading-snug mb-1 hover:text-[#3A8DFF] transition-colors">
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

              <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 font-medium">
                {product.description}
              </p>

              {/* Tags / Features */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.features.map((feature, i) => (
                  <span key={i} className="text-[10px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price & Buy Button */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div>
                  <span className="text-base font-extrabold text-[#171717]">{product.price}</span>
                  <span className="text-xs text-gray-400 line-through ml-1.5">{product.originalPrice}</span>
                </div>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#111827] hover:bg-[#1F2937] text-white px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
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
      <div className="mt-6 bg-[#111827] text-white p-6 rounded-[24px] border border-gray-800 shadow-sm">
        <span className="text-[10px] font-bold text-[#3A8DFF] uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full inline-block mb-3 border border-white/10">
          Special Offer
        </span>
        <h4 className="font-extrabold text-lg leading-snug mb-2">Gear Up For Your Next Trek</h4>
        <p className="text-xs text-gray-300 mb-4 leading-relaxed font-medium">
          Get an extra 15% off on high-quality adventure and camping rentals.
        </p>
        <div className="flex justify-between items-center bg-white/10 border border-white/15 p-3 rounded-xl">
          <span className="text-xs font-mono font-bold tracking-wider text-white">
            Promo: ADVENTURER15
          </span>
          <span className="text-xs font-bold text-[#3A8DFF] hover:underline cursor-pointer">
            Apply
          </span>
        </div>
      </div>

      {/* Info Notice */}
      <div className="mt-6 flex items-start gap-1.5 text-[11px] text-gray-400 leading-normal px-1 font-medium">
        <FiInfo size={13} className="flex-shrink-0 mt-0.5 text-gray-400" />
        <span>
          Purchases made through affiliate links support Adventurer at no extra cost to you.
        </span>
      </div>
    </aside>
  );
};

export default BlogsDataRight;
