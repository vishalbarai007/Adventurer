import { cn } from "../../../lib/utils";

import {
    FaHiking,
    FaMapMarkedAlt,
    FaRegStar,
    FaUsers,
    FaComments,
    FaShieldAlt,
    FaLanguage,
    FaHandshake,
//   FaCode,
  } from "react-icons/fa";

export function FeaturesSectionDemo() {
 
const features = [
  
    {
      title: "Adventure Planning",
      description: "Find the best trekking, hiking, and adventure destinations.",
      icon: <FaHiking />,
    },
    {
      title: "Interactive Maps",
      description: "Navigate your adventures with our detailed travel maps.",
      icon: <FaMapMarkedAlt />,
    },
    {
      title: "Ratings & Reviews",
      description: "Read and write reviews from fellow adventure enthusiasts.",
      icon: <FaRegStar />,
    },
    {
      title: "Community Connection",
      description: "Connect with other travelers and share your experiences.",
      icon: <FaUsers />,
    },
    {
      title: "Live Chat & Forums",
      description: "Get instant travel tips and discuss adventures with others.",
      icon: <FaComments />,
    },
    {
      title: "Safety & Travel Tips",
      description: "Access crucial travel safety guides and preparation checklists.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Multilingual Support",
      description: "Available in both Hindi and English for better accessibility.",
      icon: <FaLanguage />,
    },
    {
      title: "Solo Traveler Matching",
      description: "Find travel partners for your next adventure.",
      icon: <FaHandshake />,
    },
  ];
  return (
   <div className="p-10 mt-24 dark:bg-neutral-900">
    <h1 className="text-4xl font-bold text-center text-brand-green dark:text-neutral-100">Top Features</h1>
     <div className="grid grid-cols-1 p-10 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
   </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-brand-green dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-green-600 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-green-600 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10  text-brand-green dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-700 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
