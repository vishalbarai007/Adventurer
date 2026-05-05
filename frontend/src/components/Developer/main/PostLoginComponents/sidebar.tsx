import { useState, useEffect } from "react";
import { Home, Compass, FileText, Menu, X, History } from 'lucide-react';
import UserTimelineModal from "./UserTimelineModal";

type SidebarProps = {
  logoUrl?: string;
};

const Sidebar: React.FC<SidebarProps> = ({
  logoUrl = "/assets/BrandLogos/Adventurer/Faviconrans.png",
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", icon: Compass, href: "/post-login-homepage" },
    { name: "Profile", icon: Home, href: "/profile" },
    { name: "Blogs", icon: Compass, href: "/blogs" },
    { name: "Map Recommandation", icon: Compass, href: "/map" },
    { name: "Setting", icon: Compass, href: "/settings" },
    { name: "Travel Dashboard", icon: Compass, href: "/dashboard" },
    { name: "Book Trips", icon: Compass, href: "/destinations/dummy-trek" },
    { name: "Ask Trekky!", icon: FileText, href: "/chatbot" },
    { name: "My Chats", icon: FileText, href: "/mychats" },
    { name: "My Timeline", icon: History, href: "#", isModal: true },
    { name: "Weather Report", icon: FileText, href: "https://weather-forecasts-wheat.vercel.app/" },
  ];

  return (
    <>
      {/* Toggle button — visible only on mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 z-[60] flex items-center justify-center rounded-full bg-[#012c18] p-2.5 text-white shadow-lg transition-all duration-300 md:hidden ${
          isOpen ? "left-[255px]" : "left-4"
        }`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop overlay — visible on mobile when open */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed md:relative top-0 left-0 z-50 h-full w-[270px] flex-shrink-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } border-r-2 border-[#012c18]/20 bg-[#edf2f7] text-[#012c18] shadow-2xl md:shadow-none`}
      >
        <div className="flex h-full flex-col overflow-y-auto custom-scrollbar p-6">
          {/* Logo */}
          <div className="mb-6 flex-shrink-0">
            <img
              src={logoUrl || "/placeholder.svg"}
              alt="Adventurer Logo"
              width={100}
              height={40}
              className="w-full rounded-2xl"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <div className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#012c18]/50">
              Menu
            </div>
            <div className="space-y-1">
              {menuItems.map((item, index) => {
                const { name, icon: Icon, href, isModal } = item as any;
                
                if (isModal) {
                  return (
                    <div key={index} className="flex w-full" onClick={() => isMobile && setIsOpen(false)}>
                      <UserTimelineModal />
                    </div>
                  );
                }

                return (
                  <a
                    key={index}
                    href={href}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#012c18] transition-all duration-200 hover:bg-[#012c18]/10 hover:translate-x-1 active:scale-[0.98]"
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{name}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Bottom section */}
          <div className="mt-auto flex-shrink-0 border-t border-[#012c18]/10 pt-4">
            <p className="text-xs text-[#012c18]/40 text-center">© 2026 Adventurer</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;