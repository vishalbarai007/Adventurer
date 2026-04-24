import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Profile = {
  name: string;
  color: string;
  image: string;
  profilepic: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
};

export function ProfileCards() {
  const [selectedStory, setSelectedStory] = useState<Profile | null>(null);

  const profiles: Profile[] = [
    {
      name: "Aarav Mehta",
      color: "from-yellow-400 to-orange-500",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      profilepic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      name: "Sneha Desai",
      color: "from-green-400 to-green-600",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      profilepic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      name: "Rohit Sharma",
      color: "from-blue-400 to-blue-600",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      profilepic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      name: "Pooja Verma",
      color: "from-pink-400 to-pink-600",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      profilepic: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    {
      name: "Karan Patil",
      color: "from-purple-400 to-purple-600",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      profilepic: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    {
      name: "Meera Joshi",
      color: "from-red-400 to-red-600",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      profilepic: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      name: "Vikram Rao",
      color: "from-indigo-400 to-indigo-600",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      profilepic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      name: "Anjali Kapoor",
      color: "from-teal-400 to-teal-600",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      profilepic: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    {
      name: "Dev Singh",
      color: "from-cyan-400 to-cyan-600",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      profilepic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      name: "Neha Kulkarni",
      color: "from-rose-400 to-rose-600",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      profilepic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
  ];

  const handleStoryClick = (profile: Profile) => {
    setSelectedStory(profile);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  const navigateStory = (direction: "prev" | "next") => {
    if (!selectedStory) return;
    const currentIndex = profiles.findIndex((p) => p.name === selectedStory.name);
    if (direction === "prev" && currentIndex > 0) {
      setSelectedStory(profiles[currentIndex - 1]);
    } else if (direction === "next" && currentIndex < profiles.length - 1) {
      setSelectedStory(profiles[currentIndex + 1]);
    }
  };

  return (
    <>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex gap-3 overflow-x-auto px-4 py-3 scrollbar-hide"
      >
        {profiles.map((profile, i) => (
          <motion.button
            key={i}
            variants={itemVariants}
            onClick={() => handleStoryClick(profile)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="group relative flex-shrink-0 cursor-pointer transition-transform duration-200"
          >
            {/* Gradient ring around story */}
            <div className={`rounded-2xl p-[2.5px] bg-gradient-to-br ${profile.color}`}>
              <div className="relative w-[120px] h-[160px] rounded-2xl overflow-hidden bg-white p-[2px]">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="rounded-[14px] w-full h-full object-cover"
                />
                {/* Bottom overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-[14px]">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={profile.profilepic}
                      alt={profile.name}
                      className="h-5 w-5 rounded-full border border-white/50 object-cover"
                    />
                    <span className="text-[10px] font-medium text-white truncate">
                      {profile.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={handleCloseModal}
          >
            {/* Close button */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={handleCloseModal}
              className="absolute top-6 right-6 z-[110] rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Navigation - Previous */}
            {profiles.findIndex((p) => p.name === selectedStory.name) > 0 && (
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateStory("prev");
                }}
                className="absolute left-4 md:left-8 z-[110] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
            )}

            {/* Story content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-[400px] w-[90vw] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
                {profiles.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[3px] flex-1 rounded-full transition-colors ${
                      idx === profiles.findIndex((p) => p.name === selectedStory.name)
                        ? "bg-white"
                        : idx < profiles.findIndex((p) => p.name === selectedStory.name)
                        ? "bg-white/60"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* User info overlay */}
              <div className="absolute top-8 left-4 z-10 flex items-center gap-3">
                <img
                  src={selectedStory.profilepic}
                  alt={selectedStory.name}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white drop-shadow-lg">
                    {selectedStory.name}
                  </p>
                  <p className="text-xs text-white/70">Just now</p>
                </div>
              </div>

              {/* Story image */}
              <motion.img
                key={selectedStory.name}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                src={selectedStory.image}
                alt={selectedStory.name}
                className="w-full h-[80vh] object-cover"
              />
            </motion.div>

            {/* Navigation - Next */}
            {profiles.findIndex((p) => p.name === selectedStory.name) <
              profiles.length - 1 && (
              <motion.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateStory("next");
                }}
                className="absolute right-4 md:right-8 z-[110] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
