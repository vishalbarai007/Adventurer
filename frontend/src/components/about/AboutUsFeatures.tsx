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
    <div className="mt-20 max-w-6xl mx-auto px-6 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-extrabold text-[#EADED0]">
          Why Choose <span className="text-[#233115]">Adventurer</span>?
        </h2>
        <div className="w-16 h-1 bg-[#233115] mx-auto mt-4 rounded-full opacity-60" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="group relative p-8 rounded-3xl bg-[#EADED0]/5 border border-[#EADED0]/10 hover:border-[#233115]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#233115]/5 flex flex-col items-center text-center hover:-translate-y-1"
          >
            {/* Icon Container */}
            <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-[#233115] mb-6 group-hover:bg-[#233115] group-hover:text-white transition-all duration-300 shadow-md">
              <feature.icon className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#233115] mb-3">
              {feature.title}
            </h3>
            
            <p className="text-[#D4D9D1] text-sm leading-relaxed font-light">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsFeatures;
