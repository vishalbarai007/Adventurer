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
import Footer from '../components/Developer/support/Footer';
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu';

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
            "Daypack",
            "Sun protection",
            "Light jacket",
            "Trail snacks",
            "Basic first aid",
            "Water bottle",
            "Trail map"
        ]
    },
    cycling: {
        title: "Cycling Equipment",
        description: "Essential gear for cycling adventures",
        items: [
            "Helmet",
            "Repair kit & spare tube",
            "Cycling shorts & jersey",
            "Water bottles",
            "Energy bars",
            "Bike lights",
            "Lock",
            "Weather gear"
        ]
    },
    stargazing: {
        title: "Stargazing Kit",
        description: "Items for the perfect night under the stars",
        items: [
            "Warm clothing layers",
            "Red light flashlight",
            "Star chart or app",
            "Camping chair",
            "Blanket",
            "Hot drinks thermos",
            "Binoculars",
            "Camera equipment"
        ]
    }
};

const locationTips: LocationTip[] = [
    {
        location: "Mountain Regions",
        description: "High-altitude adventures and scenic views",
        tips: [
            "Acclimatize gradually to prevent altitude sickness",
            "Check weather forecasts frequently",
            "Inform others of your route",
            "Carry emergency supplies",
            "Start early to avoid afternoon storms"
        ],
        bestTime: "Spring and Fall"
    },
    {
        location: "Coastal Areas",
        description: "Beach and oceanside activities",
        tips: [
            "Check tide schedules",
            "Bring sun protection",
            "Stay hydrated",
            "Watch for marine life",
            "Be aware of rip currents"
        ],
        bestTime: "Summer"
    },
    {
        location: "Desert Landscapes",
        description: "Exploring arid environments",
        tips: [
            "Carry extra water",
            "Protect from sun exposure",
            "Travel during cooler hours",
            "Know where shelter is",
            "Watch for wildlife"
        ],
        bestTime: "Winter and Spring"
    }
];

const TravelTipsPage = () => {
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-jakarta">
            <header className="bg-brand-green text-white py-16 relative overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 text-brand-gold">
                        <Compass size={400} />
                    </motion.div>
                </div>
                
                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif text-brand-gold font-bold mb-4"
                    >
                        Adventure Playbook
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-2xl"
                    >
                        Gear up, stay safe, and master the wild with our curated travel essentials.
                    </motion.p>
                </div>
            </header>
            
            <NavigationMenuDemo />

            <main className="container mx-auto px-4 py-16 space-y-24">
                
                {/* Custom AI Concierge Section */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    className="relative rounded-3xl overflow-hidden bg-brand-green text-white shadow-2xl"
                >
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3 text-brand-gold">
                                <BotMessageSquare className="w-8 h-8" />
                                <h2 className="text-3xl font-serif font-bold">Need Custom Itineraries?</h2>
                            </div>
                            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                                Skip the generic advice. Talk to our AI Concierge and get a hyper-personalized travel plan tailored to your budget, style, and wildest dreams.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/login?redirect=/chatbot')}
                                className="group relative inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-green px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,170,28,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:-translate-y-1"
                            >
                                Ask Trekky
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                        className="mb-10 flex items-center justify-center gap-3 text-brand-green"
                    >
                        <Backpack className="w-8 h-8" />
                        <h2 className="text-4xl font-serif font-bold">Activity Checklists</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(packingLists).map(([key, activity], idx) => (
                            <motion.div 
                                key={key} 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1 } }
                                }}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 transition-shadow duration-300 flex flex-col"
                            >
                                <div className="flex-1">
                                    <h3 className="text-2xl font-serif font-semibold text-brand-green mb-2">{activity.title}</h3>
                                    <p className="text-gray-600 mb-6">{activity.description}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedActivity(selectedActivity === key ? null : key)}
                                    className="flex items-center justify-between w-full mt-4 text-brand-gold hover:text-yellow-600 font-semibold transition-colors"
                                >
                                    <span>{selectedActivity === key ? 'Hide List' : 'View List'}</span>
                                    {selectedActivity === key ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
                                            <ul className="space-y-3 text-gray-700">
                                                {activity.items.map((item, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <div className="w-2 h-2 mt-2 rounded-full bg-brand-gold flex-shrink-0" />
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
                        className="mb-10 flex items-center justify-center gap-3 text-brand-green"
                    >
                        <Map className="w-8 h-8" />
                        <h2 className="text-4xl font-serif font-bold">Terrain Tactics</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {locationTips.map((location, idx) => (
                            <motion.div 
                                key={location.location} 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95 },
                                    visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.1 } }
                                }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                            >
                                <button
                                    className="w-full px-8 py-6 bg-brand-green text-white flex justify-between items-center group transition-colors hover:bg-[#0c352b]"
                                    onClick={() => setExpandedLocation(expandedLocation === location.location ? null : location.location)}
                                >
                                    <div className="text-left">
                                        <h3 className="text-2xl font-serif font-bold text-brand-gold mb-1">{location.location}</h3>
                                        <p className="text-gray-300 text-sm">{location.description}</p>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-full group-hover:bg-brand-gold group-hover:text-brand-green transition-colors">
                                        {expandedLocation === location.location ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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
                                            <div className="p-8 bg-gray-50">
                                                <h4 className="font-bold text-brand-green mb-4 text-lg border-b border-gray-200 pb-2">Survival Protocol</h4>
                                                <ul className="space-y-4 text-gray-700 mb-6">
                                                    {location.tips.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-3">
                                                            <Compass className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                                                            <span className="leading-relaxed">{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium text-sm">
                                                    <span className="uppercase tracking-wider text-xs text-green-600 font-bold">Prime Time:</span> 
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
