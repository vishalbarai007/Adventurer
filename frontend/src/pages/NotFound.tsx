import { motion } from "framer-motion";
import { Compass, Map, Mountain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-brand-green text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20"
        >
          <Mountain size={120} className="text-brand-gold opacity-50" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-20"
        >
          <Map size={150} className="text-brand-gold opacity-50" />
        </motion.div>
      </div>

      <div className="z-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Compass size={120} className="text-brand-gold" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <div className="w-1 h-4 bg-brand-orange absolute top-2 left-1/2 -translate-x-1/2 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif text-brand-gold mb-4 drop-shadow-lg"
        >
          404
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-4xl font-serif mb-6"
        >
          Off the Beaten Path
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
        >
          It seems you've wandered into uncharted territory. The trail you're looking for has either been lost to the wilderness or never existed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-green px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-green transition-colors duration-300 shadow-[0_0_20px_rgba(255,170,28,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          >
            <ArrowLeft size={24} />
            Return to Basecamp
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
