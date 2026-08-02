import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeUp, staggerContainer } from './LandingSections';

// SVG Icon for Twitter / X
const XIcon = () => (
  <svg className="w-4 h-4 text-gray-400 hover:text-[#171717] transition-colors" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// --- Section 7: Customer Lifestyle Gallery (Matching Uploaded Reference Image #1) ---
export const LifestyleGallery = () => {
  return (
    <section className="py-[100px] px-6 lg:px-20 font-jakarta bg-[#FFFFFF] overflow-hidden">
      {/* Top Header Matching Image #1 */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12 flex flex-col items-center">
        <motion.span variants={fadeUp} className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
          Traveler story
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-[36px] md:text-[46px] font-extrabold text-[#111827] leading-[1.1] mb-3">
          How People Use Adventurer in<br/>Their Daily Routine
        </motion.h2>
        
        {/* Rating Star Subtitle Matching Image #1 */}
        <motion.div variants={fadeUp} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
          <span className="font-bold text-[#171717]">4.5/5</span>
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-gray-400 text-xs font-medium">(Trusted by 1582+ users)</span>
        </motion.div>
      </motion.div>

      {/* Layered Horizontal Gallery Matching Image #1 */}
      <div className="relative h-[460px] max-w-[1280px] mx-auto flex justify-center items-center">
        {/* Left Far Image: Water Geyser */}
        <motion.img 
          initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" 
          alt="Geyser" loading="lazy" className="absolute left-[5%] lg:left-[10%] w-48 h-64 object-cover rounded-[20px] shadow-xl z-10 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 hidden md:block" 
        />
        {/* Left Near Image: Penguin */}
        <motion.img 
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=400&q=80" 
          alt="Penguin Snow Trek" loading="lazy" className="absolute left-[18%] lg:left-[24%] w-56 h-80 object-cover rounded-[20px] shadow-2xl z-20 hover:z-50 hover:scale-105 transition-transform duration-500 hidden sm:block" 
        />
        
        {/* Center Main Image: Backpacker Hiker */}
        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80" 
          alt="Backpacker Hiker" loading="lazy" className="relative z-40 w-72 md:w-80 h-[410px] object-cover rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.18)] hover:scale-[1.02] transition-transform duration-500" 
        />

        {/* Right Near Image: Tropical Islands */}
        <motion.img 
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=400&q=80" 
          alt="Tropical Islands" loading="lazy" className="absolute right-[18%] lg:right-[24%] w-56 h-80 object-cover rounded-[20px] shadow-2xl z-20 hover:z-50 hover:scale-105 transition-transform duration-500 hidden sm:block" 
        />
        {/* Right Far Image: Hot Air Balloons */}
        <motion.img 
          initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=400&q=80" 
          alt="Balloons" loading="lazy" className="absolute right-[5%] lg:right-[10%] w-48 h-64 object-cover rounded-[20px] shadow-xl z-10 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-500 hidden md:block" 
        />
      </div>

      {/* Navigation Buttons Matching Image #1 */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button aria-label="Previous story" className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm text-[#171717]">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button aria-label="Next story" className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm text-[#171717]">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

// --- Section 8: Testimonials with X (Twitter) Logo ---
export const TestimonialsGrid = () => {
  const reviews = [
    { name: "Sarah Jenkins", role: "Solo Traveler", handle: "@sarah_j", review: "Adventurer transformed how I explore. The escrow payment system gave me complete peace of mind.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
    { name: "Michael Chen", role: "Adventure Blogger", handle: "@m_chen_treks", review: "Found certified local guides in the Western Ghats. An absolute game-changer for authentic treks.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
    { name: "Elena Rodriguez", role: "Group Trips", handle: "@elena_rodriguez", review: "Booking a multi-day hike used to be stressful. Adventurer makes it as easy as booking a hotel.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80" },
    { name: "David Kim", role: "Photographer", handle: "@dkim_wild", review: "The community here is amazing. Connected with fellow explorers and made lifelong travel buddies.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
    { name: "Emma Watson", role: "Digital Nomad", handle: "@emawatson_t", review: "I love the detailed itineraries and direct chat with guides. Complete transparency from start to finish.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
    { name: "James Smith", role: "Weekend Hiker", handle: "@jsmith_hikes", review: "Seamless interface and stunning design. Navigating destinations and travel tips is a breeze.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80" },
  ];

  return (
    <section className="py-[100px] px-6 lg:px-20 max-w-[1280px] mx-auto font-jakarta bg-white">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {reviews.map((r, i) => (
          <motion.div key={i} variants={fadeUp} className="break-inside-avoid bg-[#F7F7F7] p-6 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-200/60 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all duration-300 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={r.img} alt={r.name} loading="lazy" className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-[#171717] text-sm">{r.name}</h4>
                  <span className="text-xs text-gray-400 font-medium">{r.handle}</span>
                </div>
              </div>
              {/* X (Twitter) Logo */}
              <div className="p-2 bg-white rounded-full border border-gray-200/80 shadow-sm">
                <XIcon />
              </div>
            </div>

            <p className="text-gray-600 text-sm font-medium leading-relaxed">"{r.review}"</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// --- Section 9: FAQ Section (Matching Uploaded Reference Image #1) ---
export const FAQSection = () => {
  const faqs = [
    { q: "What types of trips does Adventurer offer?", a: "Adventurer offers verified high-altitude treks, desert expeditions, coastal trail hikes, weekend camping trips, and cultural heritage explorations guided by certified local experts." },
    { q: "What is your cancellation or refund policy?", a: "We provide flexible cancellation policies up to 48 hours prior to trip departure with instant escrow refunds credited straight back to your original payment method." },
    { q: "Are Adventurer's trips safe and well-guided?", a: "Yes, every single trek leader and local guide passes thorough background checks, first-aid certification, and identity verification before listing any trip." },
    { q: "Can I customize my travel itinerary?", a: "Absolutely. Once your trip is booked, you can directly message your guide 1:1 to customize gear rentals, dietary options, or trail paces." },
    { q: "How do I book a trip?", a: "Simply browse our seasonal destinations, select your desired date and guest count, click 'Book schedule', and complete your secure escrow reservation." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-[100px] px-6 lg:px-20 font-jakarta bg-[#F8F9FB]">
      <div className="max-w-[1280px] mx-auto">
        {/* Top Header Row matching screenshot #1 */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <motion.span variants={fadeUp} className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[46px] font-extrabold text-[#111827] leading-[1.1] max-w-xl">
              All You Should Know Before Embarking on Your Desert Journey
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="max-w-xs">
            <h4 className="font-bold text-[#171717] text-base mb-1">Didn't see your question?</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Our team is here to help — Just reach out and we'll reply shortly.
            </p>
          </motion.div>
        </motion.div>

        {/* 2 Column Main Content Row matching screenshot #1 */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Left Mountain Lake Image Card */}
          <motion.div variants={fadeUp} className="relative min-h-[420px] rounded-[28px] overflow-hidden shadow-sm border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80" 
              alt="Mountain Lake with Snow Peaks" 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* Right Accordion List Cards */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3 justify-between">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-200/80 flex flex-col justify-center cursor-pointer transition-all duration-300 hover:shadow-md"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="text-sm font-bold text-[#171717]">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                    <ArrowDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#171717]' : ''}`} />
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-xs text-gray-500 font-medium leading-relaxed border-t border-gray-100 mt-3">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
