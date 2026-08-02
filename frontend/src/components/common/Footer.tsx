import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const LOGO_URL = "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055969/adventurer_assets_migration/images/Adventurer_yellow_wrya5w.png";

const Footer = (_props: { color?: string }) => {
  return (
    <footer className="relative bg-[#061830] text-white py-16 px-6 lg:px-20 font-jakarta border-t border-white/10 overflow-hidden">
      {/* Random Beach Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
          alt="Beach Background" 
          loading="lazy" 
          className="w-full h-full object-cover opacity-35" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05172e]/90 via-[#07203d]/85 to-[#041226]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col gap-5">
            <Link to="/welcome" className="flex items-center group shrink-0">
              <img 
                src={LOGO_URL} 
                alt="Adventurer Logo" 
                className="h-16 sm:h-22 md:h-26 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" 
              />
            </Link>
            <p className="text-white/80 leading-relaxed text-sm max-w-sm font-medium">
              Comprehensive full-stack tour, travel, and trekking platform connecting travelers with verified local guides and escrow payments.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-white/70 font-medium pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-white/90 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white/90 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white/90 shrink-0" />
                <span>hello@adventurer.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base text-white uppercase tracking-wider mb-1">Quick Links</h4>
            <Link to="/welcome" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Home</Link>
            <Link to="/destinations" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Destinations</Link>
            <Link to="/tips" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Travel Tips</Link>
            <Link to="/blogs" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Blogs</Link>
            <Link to="/about" className="text-white/75 hover:text-white transition-colors text-sm font-medium">About Us</Link>
            <Link to="/contact" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Contact Us</Link>
          </div>

          {/* Column 3: Platform */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base text-white uppercase tracking-wider mb-1">Platform</h4>
            <Link to="/login" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Traveler Login</Link>
            <Link to="/login" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Guide Portal</Link>
            <Link to="/login" className="text-white/75 hover:text-white transition-colors text-sm font-medium">Organizer Dashboard</Link>
            <Link to="/login" className="text-white/75 hover:text-white transition-colors text-sm font-medium flex items-center gap-1">
              <span>Escrow Protection</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-base text-white uppercase tracking-wider mb-1">Newsletter</h4>
            <p className="text-white/75 text-sm font-medium">Get seasonal trekking updates and travel insights.</p>
            <div className="flex items-center">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 text-white placeholder:text-white/50 px-4 py-3 rounded-l-xl outline-none border border-white/20 text-sm w-full backdrop-blur-sm"
              />
              <button className="bg-white text-[#061830] px-5 py-3 rounded-r-xl font-bold hover:bg-gray-100 transition-colors text-sm shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70 font-medium">
          <p>© 2026 Adventurer. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Escrow Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
