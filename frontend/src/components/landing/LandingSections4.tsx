import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, staggerContainer } from './LandingSections';
import { Link } from 'react-router-dom';
import Footer from '@/components/common/Footer';

// Re-export Footer as LandingFooter to ensure 100% website consistency
export const LandingFooter = Footer;

// --- Section 10: Blogs Showcase Section (Matching Uploaded Reference Image #2) ---
export const AdventuresGallery = () => {
  const blogs = [
    { 
      title: "What to Pack for a Desert Tour", 
      date: "Dec 5, 2025", 
      img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      title: "What to Pack for a Desert Tour", 
      date: "Dec 5, 2025", 
      img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80" 
    },
    { 
      title: "What to Pack for a Desert Tour", 
      date: "Dec 5, 2025", 
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" 
    },
  ];

  return (
    <section className="py-[100px] px-6 lg:px-20 max-w-[1280px] mx-auto font-jakarta bg-white">
      {/* Header Row Matching Image #2 */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <motion.span variants={fadeUp} className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
            Blogs
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[36px] md:text-[46px] font-extrabold text-[#111827] leading-[1.1]">
            Adventures from<br />Around the World
          </motion.h2>
        </div>

        {/* Action Buttons Matching Image #2 */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <Link 
            to="/blogs"
            className="border border-[#111827] bg-white text-[#111827] px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            All Blogs
          </Link>
          <Link 
            to="/blogs"
            className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
            aria-label="View all blogs"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* 3 Column Image Cards Grid Matching Image #2 */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((b, i) => (
          <motion.div key={i} variants={fadeUp} className="relative h-[460px] rounded-[28px] overflow-hidden group cursor-pointer shadow-sm border border-gray-200 bg-white">
            <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-1">
              <span className="text-[12px] font-medium text-white/80">{b.date}</span>
              <h3 className="text-xl md:text-[22px] font-extrabold leading-snug drop-shadow-md">
                {b.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// --- Section 11: Final CTA ---
export const FinalCTA = () => {
  return (
    <section className="py-[60px] px-6 lg:px-20 max-w-[1280px] mx-auto font-jakarta bg-white mb-16">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        className="bg-[#F8F9FB] border border-gray-200 rounded-[32px] p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm"
      >
        {/* Left Column Text */}
        <motion.div variants={fadeUp} className="max-w-lg">
          <span className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
            Start now
          </span>
          <h2 className="text-[36px] md:text-[46px] font-extrabold text-[#111827] leading-[1.1] mb-4">
            Plan Your Perfect<br />Desert Escape Today
          </h2>
          <p className="text-gray-500 text-base mb-8 font-medium leading-relaxed">
            Embark on a journey through stunning dunes, serene oases, and breathtaking landscapes. Your unforgettable desert adventure starts here.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link 
              to="/destinations" 
              className="border border-[#111827] bg-white text-[#111827] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              Start your trip
            </Link>
            <Link 
              to="/destinations"
              className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
              aria-label="Start trip"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Right Side Image Grid */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
          {/* Tall Left Image */}
          <div className="w-full sm:w-[220px] h-[320px] rounded-[24px] overflow-hidden shadow-sm border border-gray-200 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=600&q=80" 
              alt="Desert Oasis" 
              loading="lazy" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>

          {/* Stacked Right Images */}
          <div className="flex flex-col gap-4 w-full sm:w-[220px]">
            <div className="w-full h-[150px] rounded-[24px] overflow-hidden shadow-sm border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80" 
                alt="Jeep Safari" 
                loading="lazy" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="w-full h-[155px] rounded-[24px] overflow-hidden shadow-sm border border-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" 
                alt="Tropical Beach" 
                loading="lazy" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
