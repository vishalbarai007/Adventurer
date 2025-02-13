import React from "react";
import { Home, Compass, BookMarked, FileText } from "lucide-react";

type SidebarProps = {
  logoUrl?: string; // Optional prop for logo URL
};

const Sidebar: React.FC<SidebarProps> = ({
  logoUrl = "/assets/BrandLogos/Adventurer/Faviconrans.png",
}) => {
  const menuItems = [
    { name: "Home", icon: Compass, href: "/post-login-homepage" },
    { name: "Profile", icon: Home, href: "/profile" },
    { name: "Blogs", icon: Compass, href: "/Blogs" },
    { name: "Destinations", icon: BookMarked, href: "/Destination" },
    { name: "Ask Trekky!", icon: FileText, href: "/chatbot" },
  ];

  return (
    <div className="min-h-screen w-[100%] border-r-2 border-[#012c18] bg-[#edf2f7] p-6 text-[#012c18]">
      <div className="mb-12">
        <img
          src={logoUrl}
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
             <div className="border-b-2 border-[#FFAA1C] pb-3">
                 <a
                key={index}
                href={href}
                className="flex items-center gap-3 font-bold rounded-2xl px-5 py-3 text-[#012c18] transition-colors hover:bg-[#012c18]/50"
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


