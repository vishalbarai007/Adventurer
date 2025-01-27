import React from "react";
import { Home, Compass, BookMarked, FileText } from "lucide-react";

type SidebarProps = {
  logoUrl?: string; // Optional prop for logo URL
};

const Sidebar: React.FC<SidebarProps> = ({
  logoUrl = "/assets/BrandLogos/Adventurer/Adventurer.jpg",
}) => {
  const menuItems = [
    { name: "Discover", icon: Compass, href: "#" },
    { name: "Trending", icon: Home, href: "#" },
    { name: "Explore", icon: Compass, href: "#" },
    { name: "Book Marks", icon: BookMarked, href: "#" },
    { name: "Pages", icon: FileText, href: "#" },
  ];

  return (
    <div className="min-h-screen w-[100%] bg-[#00522c] p-6 text-white">
      <div className="mb-12">
        <img
          src={logoUrl}
          alt="Adventurer Logo"
          width={180}
          height={60}
          className="mb-8 w-full rounded-2xl"
        />
        <nav className="space-y-6">
          <div className="text-lg font-extrabold uppercase tracking-wider text-white/90">
            Menu
          </div>
          <div className="space-y-4">
            {menuItems.map(({ name, icon: Icon, href }, index) => (
             <div className="border-b-2 border-[#FFAA1C] pb-3">
                 <a
                key={index}
                href={href}
                className="flex items-center gap-3 font-bold rounded-2xl px-5 py-3 text-white transition-colors hover:bg-[#012c18]"
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
  );
};

export default Sidebar;


