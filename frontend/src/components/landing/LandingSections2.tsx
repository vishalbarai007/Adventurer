import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { fadeUp, staggerContainer } from './LandingSections';
import createGlobe from 'cobe';
import { Link } from 'react-router-dom';

// --- Interactive 3D Earth Globe Component matching reference image ---
const EarthGlobe3D = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: 700,
      height: 700,
      phi: 0,
      theta: 0.3,
      dark: 0, // Light natural Earth colors
      diffuse: 1.3,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.1, 0.5, 0.9], // Vibrant ocean blue
      markerColor: [1, 0.4, 0.2],
      glowColor: [0.8, 0.9, 1],
      markers: [
        { location: [19.076, 72.8777], size: 0.07 },
        { location: [27.9881, 86.925], size: 0.08 },
        { location: [37.7595, -122.4367], size: 0.06 },
        { location: [46.8182, 8.2275], size: 0.07 },
        { location: [-13.1631, -72.545], size: 0.07 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[560px] h-[320px] mx-auto flex justify-center items-start overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-[500px] h-[500px] -mt-12 drop-shadow-xl"
        style={{ maxWidth: "100%", aspectRatio: "1" }}
      />
      {/* Soft Cloud Fog Overlay at the bottom horizon */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8F9FB] via-[#F8F9FB]/90 to-transparent pointer-events-none" />
    </div>
  );
};

// --- Section 4: Destination Highlight (Matching Uploaded Screenshot) ---
export const DestinationHighlight = () => {
  return (
    <section className="py-[100px] px-6 lg:px-20 max-w-[1280px] mx-auto font-jakarta bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Text Column */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-start max-w-xl">
          <motion.span variants={fadeUp} className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
            Explore About Us
          </motion.span>

          <motion.h2 variants={fadeUp} className="text-[38px] md:text-[48px] font-extrabold text-[#111827] leading-[1.1] mb-5">
            Where Every Journey<br />Begins with You
          </motion.h2>

          <motion.p variants={fadeUp} className="text-lg font-semibold text-[#171717] mb-4 leading-snug">
            Journey through <span className="font-bold text-gray-800">beautiful routes and scenic locations</span> in AlUla's natural surroundings.
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
            At Adventurer, we believe travel should be simple, inspiring, and unforgettable. We create thoughtfully planned journeys that help you discover destinations in the most meaningful way—without the stress. From breathtaking landscapes to unique local experiences, our team focuses on quality, comfort, and authenticity.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <Link 
              to="/about" 
              className="border border-[#111827] bg-white text-[#111827] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              Start your trip
            </Link>
            <Link 
              to="/about"
              className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
              aria-label="Start trip"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right 2 Stacked Image Cards Matching Screenshot */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-5">
          {/* Top Card: Hot Air Balloons */}
          <motion.div variants={fadeUp} className="relative h-[270px] rounded-[28px] overflow-hidden shadow-sm border border-gray-150 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80" 
              alt="Hot Air Balloons over Cappadocia" 
              loading="lazy" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <span className="absolute bottom-5 left-6 text-white text-sm font-bold drop-shadow-md">
              See real moments from our journeys.
            </span>

            <div className="absolute bottom-4 right-5 w-10 h-10 rounded-full bg-white text-[#171717] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Bottom Card: Tropical Island & Airplane Wing View */}
          <motion.div variants={fadeUp} className="relative h-[270px] rounded-[28px] overflow-hidden shadow-sm border border-gray-150 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" 
              alt="Tropical Beach & Airplane View" 
              loading="lazy" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Section 5: Statistics Section ---
export const StatisticsSection = () => {
  return (
    <section className="py-[100px] px-6 lg:px-20 font-jakarta bg-[#F8F9FB] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center">
        {/* Top Pill Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="mb-4 bg-white/80 border border-gray-200 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 shadow-sm"
        >
          Real adventurer, real numbers
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-6">
          <motion.h2 variants={fadeUp} className="text-[36px] md:text-[44px] font-bold text-[#171717] leading-tight mb-3">
            How people stay<br/>consistent over time
          </motion.h2>
          <motion.div variants={fadeUp} className="text-[72px] md:text-[96px] font-extrabold text-[#3A8DFF] leading-none mb-2 tracking-tight">
            22,000+
          </motion.div>
        </motion.div>

        {/* Globe Container with Floating Rotated Pills */}
        <div className="relative w-full max-w-2xl mx-auto my-2">
          {/* Top Left Floating Pill */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="absolute top-2 left-4 md:left-10 z-20 bg-white/90 backdrop-blur-sm border border-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-500 shadow-md -rotate-12 hidden sm:block"
          >
            Monthly Records Overview
          </motion.div>

          {/* Bottom Left Floating Pill */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="absolute bottom-16 left-2 md:left-4 z-20 bg-white/90 backdrop-blur-sm border border-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-500 shadow-md -rotate-12 hidden sm:block"
          >
            Activity Overview – Last Month
          </motion.div>

          {/* Top Right Floating Pill */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="absolute top-4 right-4 md:right-10 z-20 bg-white/90 backdrop-blur-sm border border-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-500 shadow-md rotate-12 hidden sm:block"
          >
            Check-ins logged last month
          </motion.div>

          {/* Bottom Right Floating Pill */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="absolute bottom-16 right-2 md:right-4 z-20 bg-white/90 backdrop-blur-sm border border-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-500 shadow-md rotate-12 hidden sm:block"
          >
            Activity Overview – Last Month
          </motion.div>

          {/* Globe Canvas with fog layer */}
          <EarthGlobe3D />
        </div>

        {/* 3 Stat Cards below */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto relative z-20 mt-4">
          <motion.div variants={fadeUp} className="bg-white p-8 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col text-left">
            <h4 className="text-[36px] font-extrabold text-[#171717] mb-1">300+</h4>
            <h5 className="text-[17px] font-bold text-[#171717] mb-3">Natural Destinations</h5>
            <p className="text-gray-500 text-sm leading-relaxed">At Adventurer, we design travel experiences that feel personal, seamless, and memorable.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-8 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col text-left">
            <h4 className="text-[36px] font-extrabold text-[#171717] mb-1">12K+</h4>
            <h5 className="text-[17px] font-bold text-[#171717] mb-3">Satisfied Explorers</h5>
            <p className="text-gray-500 text-sm leading-relaxed">At Adventurer, we design travel experiences that feel personal, seamless, and memorable.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white p-8 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col text-left">
            <h4 className="text-[36px] font-extrabold text-[#171717] mb-1">100%</h4>
            <h5 className="text-[17px] font-bold text-[#171717] mb-3">Authentic Experiences</h5>
            <p className="text-gray-500 text-sm leading-relaxed">At Adventurer, we design travel experiences that feel personal, seamless, and memorable.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Section 6: Video Showcase (Matching Uploaded Reference Image #2) ---
export const VideoShowcase = () => {
  return (
    <section className="py-[100px] px-6 lg:px-20 max-w-[1280px] mx-auto font-jakarta bg-white">
      {/* Header Row Matching Image #2 */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <motion.span variants={fadeUp} className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
            Video Tour
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[36px] md:text-[46px] font-extrabold text-[#111827] leading-[1.1]">
            Experience the<br />desert in motion
          </motion.h2>
        </div>

        <motion.p variants={fadeUp} className="text-gray-500 text-xs md:text-sm max-w-xs text-left md:text-right font-medium leading-relaxed">
          A short look at what you'll see and feel during our guided tours.
        </motion.p>
      </motion.div>

      {/* Video Thumbnail Box Matching Image #2 */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-[450px] md:h-[550px] rounded-[28px] overflow-hidden shadow-lg group cursor-pointer border border-gray-150"
      >
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" 
          alt="Coastal Yacht Sailing Video Thumbnail" 
          loading="lazy" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500 flex justify-center items-center">
          {/* Play Button matching screenshot #2 */}
          <div className="w-16 h-16 bg-white text-[#111827] rounded-full flex justify-center items-center shadow-xl group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-1 fill-current" />
          </div>
        </div>
        
        {/* Top Right Label matching screenshot #2 */}
        <div className="absolute top-8 right-8 text-right text-white max-w-[220px]">
          <span className="text-[54px] md:text-[68px] font-extrabold drop-shadow-md leading-none block">95%</span>
          <p className="font-medium text-xs md:text-sm drop-shadow-md leading-snug mt-1 text-white/95">
            Guests say they felt truly connected to nature.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
