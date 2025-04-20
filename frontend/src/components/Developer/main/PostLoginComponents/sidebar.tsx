import { useState, useEffect } from "react";
import { Home, Compass, BookMarked, FileText, Menu, X } from 'lucide-react';

type SidebarProps = {
  logoUrl?: string; // Optional prop for logo URL
};

const Sidebar: React.FC<SidebarProps> = ({
  logoUrl = "/assets/BrandLogos/Adventurer/Faviconrans.png",
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Home", icon: Compass, href: "/post-login-homepage" },
    { name: "Profile", icon: Home, href: "/profile" },
    { name: "Blogs", icon: Compass, href: "/blogs" },
    { name: "Setting", icon: Compass, href: "/settings" },
    { name: "Travel Dashboard", icon: Compass, href: "/dashboard" },
    { name: "Destinations", icon: BookMarked, href: "/Destination" },
    { name: "Ask Trekky!", icon: FileText, href: "/chatbot" },
    { name: "Weather Report", icon: FileText, href: "https://weather-forecasts-wheat.vercel.app/" },

  ];

  return (
    <>
      {/* Toggle button - visible on all screens but positioned differently */}
      <button 
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 rounded-full bg-[#012c18] p-2 text-white transition-all duration-300 md:hidden ${
          isOpen ? "left-[240px]" : "left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed left-0 z-40 h-full transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-full border-r-2 border-[#012c18] bg-[#edf2f7] p-6 text-[#012c18] shadow-lg md:relative rounded-r-2xl md:translate-x-0`}
      >
        <div className="mb-12">
          <img
            src={logoUrl || "/placeholder.svg"}
            alt="Adventurer Logo"
            width={100}
            height={40}
            className="mb-8 w-full rounded-2xl"
          />
          <nav className="space-y-6">
            <div className="text-lg font-extrabold uppercase tracking-wider text-[#012c18]/90">
              Menu
            </div>
            <div className="space-y-4">
              {menuItems.map(({ name, icon: Icon, href }, index) => (
                <div key={index} className="border-b-2 border-[#FFAA1C] pb-3">
                  <a
                    href={href}
                    className="flex items-center gap-3 rounded-2xl px-5 py-3 font-bold text-[#012c18] transition-colors hover:bg-[#012c18]/50"
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {name}
                  </a>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;