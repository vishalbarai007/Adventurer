import { useState } from 'react'
import { Link } from "react-router-dom"
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from "@/contexts/AuthContext"

const LOGO_URL = "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055969/adventurer_assets_migration/images/Adventurer_yellow_wrya5w.png";

export function NavigationMenuDemo() {
    const { authState } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = authState === 'authenticated';

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-[#111827] text-white border-b border-gray-800 shadow-md font-jakarta pt-1 pb-1">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 py-1 flex items-center justify-between">
                {/* Single Scaled Logo Image */}
                <Link to="/welcome" className="flex items-center group shrink-0">
                    <img 
                        src={LOGO_URL} 
                        alt="Adventurer Logo" 
                        className="h-14 sm:h-18 md:h-20 lg:h-22 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300" 
                    />
                </Link>

                {/* Universal Desktop Navigation Menu */}
                <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-white/90">
                    <Link to="/welcome" className="hover:text-white transition-colors">Home</Link>
                    <Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link>
                    <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                    <Link to="/tips" className="hover:text-white transition-colors">Travel Tips</Link>
                    <Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                </div>

                {/* Right Action Buttons / Auth */}
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <Link 
                            to="/dashboard"
                            className="bg-white text-[#111827] px-5 py-2.5 rounded-full font-bold text-xs hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden p-2.5 text-white focus:outline-none bg-white/15 backdrop-blur-md rounded-xl border border-white/20"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="md:hidden fixed inset-x-0 top-[56px] sm:top-[64px] bg-black/80 backdrop-blur-2xl text-white border-b border-white/20 px-6 py-5 flex flex-col gap-4 text-sm font-medium shadow-2xl font-jakarta z-50 max-h-[calc(100vh-64px)] overflow-y-auto"
                    >
                        <Link to="/welcome" onClick={() => setIsOpen(false)} className="hover:text-gray-300 py-1 font-semibold">Home</Link>
                        <Link to="/destinations" onClick={() => setIsOpen(false)} className="hover:text-gray-300 py-1 font-semibold">Destinations</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-300 py-1 font-semibold">About Us</Link>
                        <Link to="/tips" onClick={() => setIsOpen(false)} className="hover:text-gray-300 py-1 font-semibold">Travel Tips</Link>
                        <Link to="/blogs" onClick={() => setIsOpen(false)} className="hover:text-gray-300 py-1 font-semibold">Blogs</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-gray-300 py-1 font-semibold">Contact Us</Link>
                        
                        {/* Bottom Row: Book Schedule + Log In in ONE Single Row */}
                        <div className="pt-3 border-t border-white/15 flex items-center gap-3">
                            {isAuthenticated ? (
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full text-center bg-white text-[#111827] py-3 rounded-2xl font-bold text-xs">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        onClick={() => setIsOpen(false)} 
                                        className="flex-1 text-center bg-white text-[#111827] py-3.5 rounded-2xl font-bold text-xs shadow-md hover:bg-gray-100 transition-colors"
                                    >
                                        Book schedule
                                    </Link>
                                    <Link 
                                        to="/login" 
                                        onClick={() => setIsOpen(false)} 
                                        className="flex-1 text-center border border-white/40 bg-white/10 backdrop-blur-md text-white py-3.5 rounded-2xl font-bold text-xs hover:bg-white hover:text-[#111827] transition-all shadow-sm"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
export default NavigationMenuDemo;
