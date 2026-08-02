import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LOGO_URL = "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055969/adventurer_assets_migration/images/Adventurer_yellow_wrya5w.png";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/welcome', { replace: true });
        }, 550); // Minimal & fast 550ms splash duration
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#061830] text-white flex flex-col items-center justify-center overflow-hidden font-jakarta">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 px-6"
            >
                {/* Scaled Cloudinary Logo */}
                <img 
                    src={LOGO_URL} 
                    alt="Adventurer Logo" 
                    className="h-16 sm:h-20 w-auto object-contain drop-shadow-xl" 
                />
                
                {/* Minimal Fast Loading Progress Accent */}
                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                    <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full bg-[#3A8DFF] rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
}
