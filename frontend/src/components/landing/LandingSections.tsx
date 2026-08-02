import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, 
  ChevronDown, Calendar, Users, Camera, Mountain, Sun,
  ArrowUpRight, Menu, X, Plus, Minus, Check
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LOGO_URL = "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055969/adventurer_assets_migration/images/Adventurer_yellow_wrya5w.png";

// --- Shared Animation Variants ---
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

// --- Section 1: Universal Navigation Bar ---
export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-16 pt-1 sm:pt-2 pb-2 text-white font-jakarta">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Single Scaled Logo Image */}
        <Link to="/welcome" className="flex items-center group shrink-0">
          <img 
            src={LOGO_URL} 
            alt="Adventurer Logo" 
            className="h-16 xs:h-20 sm:h-24 md:h-26 lg:h-28 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300" 
          />
        </Link>

        {/* Desktop Nav Links - Standardized Across All Pages */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-white/90">
          <Link to="/welcome" className="hover:text-white transition-colors">Home</Link>
          <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/tips" className="hover:text-white transition-colors">Travel Tips</Link>
          <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>

        {/* Right CTA Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            to="/login" 
            className="border border-white/40 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-white hover:text-[#111827] transition-all shadow-sm"
          >
            Book schedule
          </Link>
          <Link 
            to="/login"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-[#111827] transition-colors shadow-sm"
            aria-label="Book now"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2.5 text-white focus:outline-none bg-white/15 backdrop-blur-md rounded-xl border border-white/20" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Translucent Frosted Glass Mobile Drawer Menu Overlapping Pages Directly */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[64px] sm:top-[80px] bg-black/80 backdrop-blur-2xl text-white p-6 flex flex-col gap-4 shadow-2xl md:hidden border-b border-white/20 z-50 font-jakarta max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <Link to="/welcome" className="font-semibold text-base hover:text-gray-300 py-1" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/destinations" className="font-semibold text-base hover:text-gray-300 py-1" onClick={() => setIsOpen(false)}>Destinations</Link>
            <Link to="/about" className="font-semibold text-base hover:text-gray-300 py-1" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/tips" className="font-semibold text-base hover:text-gray-300 py-1" onClick={() => setIsOpen(false)}>Travel Tips</Link>
            <Link to="/blogs" className="font-semibold text-base hover:text-gray-300 py-1" onClick={() => setIsOpen(false)}>Blogs</Link>
            <Link to="/contact" className="font-semibold text-base hover:text-gray-300 py-1" onClick={() => setIsOpen(false)}>Contact Us</Link>

            {/* Bottom Row: Book Schedule + Log In in ONE Single Row */}
            <div className="pt-3 border-t border-white/15 flex items-center gap-3">
              <Link 
                to="/login" 
                className="flex-1 text-center bg-white text-[#111827] py-3.5 rounded-2xl font-bold text-xs shadow-md hover:bg-gray-100 transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                Book schedule
              </Link>
              <Link 
                to="/login" 
                className="flex-1 text-center border border-white/40 bg-white/10 backdrop-blur-md text-white py-3.5 rounded-2xl font-bold text-xs hover:bg-white hover:text-[#111827] transition-all shadow-sm" 
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Section 2: Hero Section (Fully Functional Booking Card) ---
export const HeroSection = () => {
  const navigate = useNavigate();

  // Booking Card States
  const [location, setLocation] = useState("Mumbai, Maharashtra");
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState("2024-08-15");
  
  const [guests, setGuests] = useState(2);
  const [showGuestMenu, setShowGuestMenu] = useState(false);

  const locationsList = [
    "Mumbai, Maharashtra",
    "Pune, Maharashtra",
    "Nagpur, Maharashtra",
    "Nashik, Maharashtra",
    "Aurangabad, Maharashtra",
    "Solapur, Maharashtra"
  ];

  // Date formatting helper
  const formatDateDisplay = (dateString: string) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "Sunday, 15 Aug 2024";
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } catch {
      return "Sunday, 15 Aug 2024";
    }
  };

  const handleBookSchedule = () => {
    navigate(`/destinations?location=${encodeURIComponent(location)}&date=${selectedDate}&guests=${guests}`);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden font-jakarta bg-[#092240] text-white pt-16 sm:pt-20 pb-8 sm:pb-12">
      {/* High Quality Blue Mountain Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80" 
          alt="Blue Mountains" 
          loading="eager"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061830]/80 via-[#092240]/40 to-[#05162a]" />
      </div>

      {/* GIANT CENTER BACKGROUND BRANDING TEXT (Hidden on Mobile Screens) */}
      <div className="hidden sm:flex absolute top-[12%] sm:top-[14%] left-0 w-full justify-center z-1 pointer-events-none select-none overflow-hidden px-2">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[110px] md:text-[160px] lg:text-[240px] font-black text-white/85 tracking-tighter leading-none text-center drop-shadow-2xl uppercase"
        >
          ADVENTURER
        </motion.h1>
      </div>

      {/* Main Container Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col justify-end flex-1 pt-8 sm:pt-16">
        
        {/* Middle Row: Left Title + Right Floating Functional Booking Card */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Left Headline */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="text-[28px] sm:text-[42px] lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md">
              Uncover the World's<br />
              Natural Wonders.
            </h2>
          </motion.div>

          {/* Right Floating Interactive Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/15 backdrop-blur-xl border border-white/25 md:bg-white md:border-gray-100 text-white md:text-[#171717] p-4 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full lg:w-auto relative"
          >
            {/* Field 1: LOCATION */}
            <div className="relative w-full md:w-48">
              <div 
                onClick={() => { setShowLocationMenu(!showLocationMenu); setShowGuestMenu(false); }}
                className="bg-white/10 backdrop-blur-md md:bg-gray-50/90 border border-white/20 md:border-gray-100 px-4 py-3 rounded-2xl flex flex-col justify-center cursor-pointer hover:bg-white/20 md:hover:bg-gray-100/90 transition-colors"
              >
                <span className="text-[11px] font-bold text-white/75 md:text-gray-400 uppercase tracking-wider mb-1">LOCATION</span>
                <div className="flex items-center gap-2 text-white md:text-[#171717] font-bold text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-white/90 md:text-gray-500 shrink-0" />
                  <span className="truncate font-bold text-xs">{location}</span>
                </div>
              </div>

              {/* Location Popover Menu */}
              <AnimatePresence>
                {showLocationMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white text-[#171717] rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 font-jakarta"
                  >
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5 block border-b border-gray-100">Popular Destinations</span>
                    <div className="flex flex-col mt-1 max-h-48 overflow-y-auto">
                      {locationsList.map((loc, i) => (
                        <button 
                          key={i}
                          onClick={() => { setLocation(loc); setShowLocationMenu(false); }}
                          className={`flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold text-left transition-colors ${location === loc ? 'bg-gray-100 text-[#3A8DFF] font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                          <span>{loc}</span>
                          {location === loc && <Check className="w-3.5 h-3.5 text-[#3A8DFF]" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Field 2: DATE */}
            <div className="relative w-full md:w-52">
              <label className="bg-white/10 backdrop-blur-md md:bg-gray-50/90 border border-white/20 md:border-gray-100 px-4 py-3 rounded-2xl flex flex-col justify-center cursor-pointer hover:bg-white/20 md:hover:bg-gray-100/90 transition-colors block">
                <span className="text-[11px] font-bold text-white/75 md:text-gray-400 uppercase tracking-wider mb-1">DATE</span>
                <div className="flex items-center gap-2 text-white md:text-[#171717] font-bold text-xs sm:text-sm">
                  <Calendar className="w-4 h-4 text-white/90 md:text-gray-500 shrink-0" />
                  <span className="truncate font-bold text-xs">{formatDateDisplay(selectedDate)}</span>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="absolute opacity-0 pointer-events-auto inset-0 cursor-pointer w-full h-full"
                  />
                </div>
              </label>
            </div>

            {/* Field 3: GUEST */}
            <div className="relative w-full md:w-40">
              <div 
                onClick={() => { setShowGuestMenu(!showGuestMenu); setShowLocationMenu(false); }}
                className="bg-white/10 backdrop-blur-md md:bg-gray-50/90 border border-white/20 md:border-gray-100 px-4 py-3 rounded-2xl flex flex-col justify-center cursor-pointer hover:bg-white/20 md:hover:bg-gray-100/90 transition-colors"
              >
                <span className="text-[11px] font-bold text-white/75 md:text-gray-400 uppercase tracking-wider mb-1">GUEST</span>
                <div className="flex items-center justify-between text-white md:text-[#171717] font-bold text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-white/90 md:text-gray-500 shrink-0" />
                    <span>{guests} {guests === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-white/80 md:text-gray-400" />
                </div>
              </div>

              {/* Guest Counter Popover Menu */}
              <AnimatePresence>
                {showGuestMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-52 bg-white text-[#171717] rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 font-jakarta"
                  >
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Select Travelers</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">Guests</span>
                      <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-150">
                        <button 
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-extrabold text-sm w-4 text-center">{guests}</span>
                        <button 
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                          className="w-7 h-7 rounded-lg bg-[#111827] text-white flex items-center justify-center hover:bg-black font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book schedule button */}
            <button 
              onClick={handleBookSchedule}
              className="bg-[#111827] text-white px-7 py-4 rounded-2xl font-bold text-xs hover:bg-black transition-colors w-full md:w-auto text-center shrink-0 shadow-md flex justify-center items-center mt-1 md:mt-0"
            >
              Book schedule
            </button>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-4 sm:pt-5 border-t border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-8 text-white/90"
        >
          {/* Bottom Left Stats */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4 sm:gap-6 shrink-0">
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm leading-tight text-white">300+ Iconic</h4>
              <p className="text-[10px] sm:text-[11px] text-white/70 font-semibold">Spots Included</p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Mountain className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="hidden lg:block w-20 h-[1px] bg-white/20 shrink-0" />

          {/* Bottom Right Paragraph */}
          <p className="max-w-2xl text-[11px] sm:text-xs text-white/70 leading-relaxed font-medium">
            Discover Nature's Finest Places. breathtaking landscapes, untouched beauty, and nature at its purest. Discover Nature's Finest Places. breathtaking landscapes, untouched
          </p>
        </motion.div>

      </div>
    </section>
  );
};

// --- Section 3: Featured Destinations ---
export const FeaturedDestinations = () => {
  const destinations = [
    { title: "Maharashtra Hill Trek", location: "Maharashtra", price: "$1,100", rating: "4.9", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" },
    { title: "Konkan Coast Expedition", location: "Maharashtra", price: "$950", rating: "4.8", img: "https://images.unsplash.com/photo-1518732712183-0b0ab6c0f2b2?auto=format&fit=crop&w=600&q=80" },
    { title: "Western Ghats Trail", location: "Maharashtra", price: "$1,200", rating: "5.0", img: "https://images.unsplash.com/photo-1500534623212-9a54b0d2c1f2?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <section className="py-[80px] md:py-[100px] px-6 lg:px-20 max-w-[1280px] mx-auto font-jakarta bg-white">
      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <motion.span variants={fadeUp} className="px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 text-xs font-semibold inline-block mb-4 shadow-sm">
            Our Destination
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[32px] md:text-[46px] font-extrabold text-[#111827] leading-[1.1]">
            Your Journey to the Perfect<br />Destination Begins Here
          </motion.h2>
        </div>

        {/* Action Buttons */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <Link 
            to="/destinations"
            className="border border-[#111827] bg-white text-[#111827] px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            See All Destination
          </Link>
          <Link 
            to="/destinations"
            className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center hover:bg-black transition-colors shadow-md"
            aria-label="View all"
          >
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Cards Grid */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((dest, i) => (
          <motion.div key={i} variants={fadeUp} className="relative h-[440px] md:h-[480px] rounded-[24px] overflow-hidden group cursor-pointer shadow-sm border border-gray-200 bg-white">
            <img src={dest.img} alt={dest.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 text-white text-[13px] font-semibold border border-white/30">
              <Star className="w-3.5 h-3.5 fill-current text-yellow-400" /> {dest.rating}
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-2">
              <h3 className="text-[24px] md:text-[26px] font-bold leading-snug">{dest.title}</h3>
              <div className="flex justify-between items-end border-t border-white/20 pt-4 mt-2">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4 text-white" /> <span className="font-medium text-sm">{dest.location}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-white/70 uppercase font-bold tracking-wider">From</span>
                  <span className="font-extrabold text-[20px]">{dest.price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
