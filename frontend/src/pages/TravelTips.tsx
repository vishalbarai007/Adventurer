import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Map,
    Compass,
    ChevronDown,
    ChevronUp,
    Backpack
} from 'lucide-react';
import Footer from '../components/Developer/support/Footer';
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu';
import LargeSuccessLoader from '../components/Developer/support/Loader';

// Motion variants for dropdown animations
const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } }
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
    }];

const TravelTipsPage = () => {
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-brand-green text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Adventure Travel Tips</h1>
                    <p className="text-lg">Your guide to outdoor activities and destinations</p>
                </div>
            </header>
            <NavigationMenuDemo />

            <main className="container mx-auto px-4 py-8">
                {/* Activities Section */}
                <LargeSuccessLoader />
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-brand-green flex items-center gap-2">
                        <Compass className="w-6 h-6" />
                        Activities Packing Lists
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(packingLists).map(([key, activity]) => (
                            <div key={key} className="bg-white rounded-lg shadow-md p-6 border border-green-100 hover:border-green-300 transition-colors">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-brand-green">{activity.title}</h3>
                                    <button
                                        onClick={() => setSelectedActivity(selectedActivity === key ? null : key)}
                                        className="text-brand-green hover:text-green-700"
                                    >
                                        {selectedActivity === key ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-gray-600 mb-4">{activity.description}</p>
                                <motion.div
                                    initial="hidden"
                                    animate={selectedActivity === key ? "visible" : "hidden"}
                                    exit="exit"
                                    variants={dropdownVariants}
                                    className="overflow-hidden"
                                >
                                    <ul className="space-y-2 text-gray-700">
                                        {activity.items.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <Backpack className="w-4 h-4 text-brand-green" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Locations Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-brand-green flex items-center gap-2">
                        <Map className="w-6 h-6" />
                        Location-Specific Tips
                    </h2>
                    <div className="space-y-4">
                        {locationTips.map((location) => (
                            <div key={location.location} className="bg-white rounded-lg shadow-md border border-green-100">
                                <button
                                    className="w-full px-6 py-4 flex justify-between items-center"
                                    onClick={() => setExpandedLocation(expandedLocation === location.location ? null : location.location)}
                                >
                                    <div>
                                        <h3 className="text-xl font-semibold text-brand-green text-left">{location.location}</h3>
                                        <p className="text-gray-600 text-left">{location.description}</p>
                                    </div>
                                    {expandedLocation === location.location ? <ChevronUp className="w-5 h-5 text-brand-green" /> : <ChevronDown className="w-5 h-5 text-brand-green" />}
                                </button>
                                <motion.div
                                    initial="hidden"
                                    animate={expandedLocation === location.location ? "visible" : "hidden"}
                                    exit="exit"
                                    variants={dropdownVariants}
                                    className="overflow-hidden px-6 py-4 border-t border-green-100"
                                >
                                    <h4 className="font-semibold text-brand-green mb-2">Travel Tips:</h4>
                                    <ul className="space-y-2 text-gray-700 mb-4">
                                        {location.tips.map((tip, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-brand-green mt-1">•</span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-gray-600">
                                        <span className="font-semibold text-green-600">Best Time to Visit:</span> {location.bestTime}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer color={undefined} />
        </div>
    );
};

export default TravelTipsPage;
