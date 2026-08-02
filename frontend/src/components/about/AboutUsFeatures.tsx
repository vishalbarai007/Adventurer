import React from "react";
import { Shield, Award, PhoneCall } from "lucide-react";

const AboutUsFeatures: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Safety",
      description: "Travel safely with our experienced local guides and comprehensive safety protocols built over 10 years of expertise.",
    },
    {
      icon: Award,
      title: "Value",
      description: "Premium curated travel experiences and competitive pricing without ever compromising on quality or safety.",
    },
    {
      icon: PhoneCall,
      title: "Support",
      description: "Dedicated 24/7 client assistance and ground support for a completely convenient, hassle-free adventure.",
    },
  ];

  return (
    <div className="mt-12 max-w-[1280px] mx-auto px-6 mb-16 font-jakarta">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-[#171717]">
          Why Choose <span className="text-[#3A8DFF]">Adventurer</span>?
        </h2>
        <div className="w-16 h-1 bg-[#3A8DFF] mx-auto mt-3 rounded-full opacity-80" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col items-center text-center hover:border-gray-300 transition-all duration-300"
          >
            {/* Icon Container */}
            <div className="p-4 bg-gray-100 rounded-2xl text-[#111827] mb-6 group-hover:bg-[#111827] group-hover:text-white transition-all duration-300 shadow-sm">
              <feature.icon className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-[#171717] mb-3">
              {feature.title}
            </h3>
            
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsFeatures;
