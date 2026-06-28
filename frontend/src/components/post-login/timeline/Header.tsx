import React, { useState } from "react";
import { Bell, MessageCircle, Search, Award, X } from "lucide-react";
import { UserTimelineModal } from "@/components/post-login/timeline/UserTimelineModal";
import { useAuth } from "@/contexts/AuthContext";
import OnboardingWizard from "@/components/auth/OnboardingWizard";

type HeaderProps = {
    placeholderText?: string; // Optional prop for search input placeholder
};

const PostHeader: React.FC<HeaderProps> = ({
    placeholderText = "Search here...",
}) => {
    const { user } = useAuth();
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const progress = user?.onboardingProgress ?? 100;

    const navLinks = [
        { name: "Timelines", href: "#", isModal: true },
        { name: "Discovers", href: "/destinations/dummy-trek" },
        { name: "Guides Marketplace", href: "/marketplace" },
    ];

    return (
        <div className="flex flex-col p-8 mt-10">
            {/* Onboarding Progress Alert Banner */}
            {progress < 100 && (
                <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white py-3 px-6 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg border border-emerald-700/30">
                    <div className="flex items-center gap-2.5">
                        <Award className="h-5 w-5 text-emerald-400 animate-pulse" />
                        <span className="text-xs md:text-sm font-medium">
                            Your profile is only <strong className="text-emerald-300 font-bold">{progress}%</strong> complete. Complete it now to unlock instant checkout verification!
                        </span>
                    </div>
                    <button 
                        onClick={() => setIsWizardOpen(true)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md whitespace-nowrap"
                    >
                        Complete Profile
                    </button>
                </div>
            )}

            {/* Main Header Row */}
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-8">
                    {/* Navigation */}
                    <nav className="flex gap-4">
                        {navLinks.map(({ name, href, isModal }, index) => {
                            if (isModal) {
                                return (
                                    <div key={index} className="flex">
                                        <UserTimelineModal />
                                    </div>
                                );
                            }
                            return (
                                <a
                                    key={index}
                                    href={href}
                                    className="flex items-center px-4 py-3 text-sm font-semibold text-[#012c18] hover:text-[#012c18]/80 transition-all duration-200"
                                >
                                    {name}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Search Input */}
                    <div className="relative ">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-[#012c18]/60 " />
                        <input
                            className="h-10  w-[300px] rounded-full bg-[#012c18]/10 pl-10 pr-4 text-[#012c18] placeholder-[#012c18]/60"
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

            {/* wizard Modal Sheet */}
            {isWizardOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl">
                        <button 
                            onClick={() => setIsWizardOpen(false)}
                            className="absolute right-4 top-4 text-white/70 hover:text-white z-10"
                        >
                            <X size={20} />
                        </button>
                        <OnboardingWizard onComplete={() => setIsWizardOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostHeader;
