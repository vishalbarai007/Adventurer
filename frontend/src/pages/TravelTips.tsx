import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Map,
    Compass,
    ChevronDown,
    ChevronUp,
    Backpack,
    BotMessageSquare,
    ArrowRight
} from 'lucide-react';
import Footer from '@/components/common/Footer';
import { NavigationMenuDemo } from '@/components/common/NavigationMenu';
import useSEO from '@/hooks/useSEO';

const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

type PackingList = {
    title: string;
    description: string;
    items: string[];
};

type LocationTip = {
    location: string;
    description: string;
    tips: string[];
    bestTime: string;
};

const packingLists: Record<string, PackingList> = {
    trekking: {
        title: "Trekking Essentials",
        description: "Essential items for a safe and comfortable trekking experience",
        items: [
            "Hiking boots & extra socks",
            "Weather-appropriate clothing layers",
            "First aid kit",
            "Navigation tools (map, compass)",
            "Water bottles & purification",
            "High-energy snacks",
            "Headlamp & spare batteries",
            "Emergency shelter"
        ]
    },
    hiking: {
        title: "Day Hiking Gear",
        description: "Must-have items for day hikes",
        items: [
            "Comfortable hiking shoes",
            "Daypack (15-25 liters)",
            "Water reservoir or bottles",
            "Trail snacks",
            "Sun protection (hat, sunglasses, sunscreen)",
            "Basic first aid supplies",
            "Light jacket or windbreaker"
        ]
    },
    camping: {
        title: "Overnight Camping",
        description: "Gear needed for a successful camping trip",
        items: [
            "Tent with rainfly & stakes",
            "Sleeping bag & sleeping pad",
            "Camp stove & fuel",
            "Cookware & eating utensils",
            "Headlamp/lantern & extra batteries",
            "Trash bags (Leave No Trace)",
            "Personal hygiene items"
        ]
    },
    winter: {
        title: "Winter Expedition",
        description: "Specialized gear for cold weather conditions",
        items: [
            "Insulated waterproof boots",
            "Thermal base layers",
            "Insulated jacket & waterproof shell",
            "Winter sleeping bag (-10°C or lower)",
            "Four-season tent",
            "Snowshoes or microspikes",
            "Hand & foot warmers"
        ]
    }
};

const locationTips: LocationTip[] = [
    {
        location: "Mountain Trails",
        description: "Western Ghats & Himalayan Passes",
        tips: [
            "Acclimatize properly and ascend slowly",
            "Check weather forecasts and avalanche risk",
            "Carry extra warm layers even in summer",
            "Stay hydrated and maintain high energy intake"
        ],
        bestTime: "September to May"
    },
    {
        location: "Coastal Routes",
        description: "Konkan & South Coast Hikes",
        tips: [
            "Time your hike with tide tables",
            "Carry ample fresh water and electrolyte mixes",
            "Protect equipment from salt water corrosion",
            "Wear quick-drying footwear with rock traction"
        ],
        bestTime: "November to February"
    },
    {
        location: "Desert Treks",
        description: "Arid Fort Trails & Sand Dunes",
        tips: [
            "Hike during early morning and late afternoon",
            "Carry double your normal water capacity",
            "Wear lightweight UV-rated long sleeves",
            "Use sand gaiters to protect boots"
        ],
        bestTime: "October to March"
    }
];

const TravelTipsPage = () => {
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);
    const navigate = useNavigate();

    useSEO({
        title: 'Adventure Playbook & Travel Tips | Adventurer',
        description: 'Read packing lists, stargazing kits, terrain survival protocols, and seasonal recommendations for mountain, coastal, and desert hikes.',
        keywords: 'travel tips, packing lists, mountain survival, desert hiking'
    });

    return (
        <div className="min-h-screen bg-[#F8F9FB] font-jakarta text-[#171717]">
            {/* Top Navigation */}
            <NavigationMenuDemo />

            {/* Clean Hero */}
            <header className="bg-[#111827] text-white py-16 px-6 relative overflow-hidden">
                <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#3A8DFF] font-bold text-sm tracking-wider uppercase mb-3">
                        Travel Essentials
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Adventure Playbook
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed"
                    >
                        Gear up, stay safe, and master the wild with our curated travel essentials.
                    </motion.p>
                </div>
            </header>

            <main className="max-w-[1280px] mx-auto px-6 py-16 space-y-20">
                {/* AI Concierge Section - Clean Solid Styling */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 text-[#171717] p-8 md:p-12 shadow-sm"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3 text-[#111827]">
                                <BotMessageSquare className="w-7 h-7 text-[#3A8DFF]" />
                                <h2 className="text-2xl md:text-3xl font-extrabold">Need Custom Itineraries?</h2>
                            </div>
                            <p className="text-base text-gray-500 leading-relaxed max-w-2xl font-medium">
                                Skip the generic advice. Talk to our AI Concierge and get a hyper-personalized travel plan tailored to your budget, style, and wildest dreams.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/login?redirect=/assistant')}
                                className="inline-flex items-center justify-center gap-2 bg-[#111827] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#1F2937] transition-colors shadow-sm"
                            >
                                Ask Trekky
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.section>

                {/* Activities Section */}
                <section>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="mb-8 flex items-center gap-3 text-[#171717]"
                    >
                        <Backpack className="w-7 h-7 text-[#3A8DFF]" />
                        <h2 className="text-3xl font-extrabold">Activity Checklists</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(packingLists).map(([key, activity], idx) => (
                            <motion.div 
                                key={key} 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 15 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.08 } }
                                }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-all"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#171717] mb-2">{activity.title}</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{activity.description}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedActivity(selectedActivity === key ? null : key)}
                                    className="flex items-center justify-between w-full mt-4 text-[#111827] font-bold text-sm hover:text-[#3A8DFF] transition-colors"
                                >
                                    <span>{selectedActivity === key ? 'Hide List' : 'View List'}</span>
                                    {selectedActivity === key ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                
                                <AnimatePresence>
                                    {selectedActivity === key && (
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={dropdownVariants}
                                            className="overflow-hidden mt-4 pt-4 border-t border-gray-100"
                                        >
                                            <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
                                                {activity.items.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2.5">
                                                        <div className="w-1.5 h-1.5 mt-2 rounded-full bg-[#3A8DFF] flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Locations Section */}
                <section>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="mb-8 flex items-center gap-3 text-[#171717]"
                    >
                        <Map className="w-7 h-7 text-[#3A8DFF]" />
                        <h2 className="text-3xl font-extrabold">Terrain Tactics</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {locationTips.map((location, idx) => (
                            <motion.div 
                                key={location.location} 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.98 },
                                    visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.08 } }
                                }}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200"
                            >
                                <button
                                    className="w-full px-6 py-5 bg-[#111827] text-white flex justify-between items-center text-left hover:bg-[#1F2937] transition-colors"
                                    onClick={() => setExpandedLocation(expandedLocation === location.location ? null : location.location)}
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{location.location}</h3>
                                        <p className="text-gray-400 text-xs">{location.description}</p>
                                    </div>
                                    <div className="p-1.5 rounded-full bg-white/10 text-white">
                                        {expandedLocation === location.location ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedLocation === location.location && (
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            variants={dropdownVariants}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 bg-white border-t border-gray-100">
                                                <h4 className="font-bold text-[#171717] mb-3 text-sm border-b border-gray-100 pb-2">Survival Protocol</h4>
                                                <ul className="space-y-3 text-sm text-gray-600 mb-6 font-medium">
                                                    {location.tips.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-2.5">
                                                            <Compass className="w-4 h-4 text-[#3A8DFF] flex-shrink-0 mt-0.5" />
                                                            <span className="leading-relaxed">{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg font-semibold text-xs border border-gray-200">
                                                    <span className="uppercase tracking-wider text-[10px] text-gray-500 font-bold">Prime Time:</span> 
                                                    {location.bestTime}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer color={undefined} />
        </div>
    );
};

export default TravelTipsPage;
