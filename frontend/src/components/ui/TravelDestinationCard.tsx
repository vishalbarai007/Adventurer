import React from 'react';

interface TravelDestinationCardProps {
  imageSrc: string;
  location: string;
  destination: string;
}

const TravelDestinationCard: React.FC<TravelDestinationCardProps> = ({ imageSrc, location, destination }) => {
  return (
    <div className="flex relative flex-col items-start pt-80 pr-12 pb-16 pl-6 aspect-[0.591] rounded-[30px] max-md:px-5 max-md:pt-24">
      {/* Main Image */}
      <img loading="lazy" src={imageSrc} alt={`${destination} in ${location}`} className="object-cover absolute inset-0 size-full" />
      
      {/* Overlay Icon */}
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/95f5d6ace3da92f78532f7b9e4a440567cd49900f59a224086bc5b20439f520f?placeholderIfAbsent=true&apiKey=f8544c1e7c5a48b3a4877fbcd40708d6" alt="" className="object-contain aspect-[20] w-[60px]" />
      
      {/* Location and Destination */}
      <div className="relative text-base">{location}</div>
      <div className="relative mt-3.5 text-3xl">{destination}</div>
    </div>
  );
};

export default TravelDestinationCard;
