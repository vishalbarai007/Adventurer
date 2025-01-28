import React from "react";
import { Bell, MessageCircle, Search } from "lucide-react";

type HeaderProps = {
    placeholderText?: string; // Optional prop for search input placeholder
};

const PostHeader: React.FC<HeaderProps> = ({
    placeholderText = "Search here...",
}) => {
    const navLinks = [
        { name: "Timelines", href: "#" },
        { name: "Discovers", href: "#" },
    ];

    return (
        <div className="flex items-center justify-between p-8">
            {/* Left Section */}
            <div className="flex items-center gap-8">
                {/* Navigation */}
                <nav className="flex gap-4">
                    {navLinks.map(({ name, href }, index) => (
                        <a
                            key={index}
                            href={href}
                            className="text-white hover:text-white/80"
                        >
                            {name}
                        </a>
                    ))}
                </nav>
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-white/60" />
                    <input
                        className="h-10 w-[300px] rounded-full bg-white/10 pl-10 pr-4 text-white placeholder-white/60"
                        placeholder={placeholderText}
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <button className="rounded-full bg-[#012c18] p-2 text-white hover:bg-[#012c18]/80">
                    <MessageCircle className="h-5 w-5" />
                </button>
                <button className="rounded-full bg-[#012c18] p-2 text-white hover:bg-[#012c18]/80">
                    <Bell className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default PostHeader;
