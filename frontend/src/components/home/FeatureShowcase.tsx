import { useEffect, useRef } from "react";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHiking,
  FaMapMarkedAlt,
  FaUsers,
  FaComments,
  FaShieldAlt,
  FaLanguage,
} from "react-icons/fa";
import { TbBrain } from "react-icons/tb";

// gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Adventure Planning",
    description:
      "AI-curated trekking, hiking & adventure destinations tailored to your experience level and season.",
    icon: <FaHiking />,
    span: "col-span-1",
    accent: "#ffaa1c",
  },
  {
    title: "Interactive Maps",
    description:
      "Navigate trails with live elevation data, trail difficulty markers, and community waypoints.",
    icon: <FaMapMarkedAlt />,
    span: "col-span-1 md:col-span-2",
    accent: "#ff7757",
  },
  {
    title: "AI Travel Concierge",
    description:
      "Your personal AI-powered travel assistant that builds packing lists, suggests routes, and answers any travel question.",
    icon: <TbBrain />,
    span: "col-span-1 md:col-span-2",
    accent: "#ffaa1c",
  },
  {
    title: "Community & Social Feed",
    description:
      "Share your adventures, follow fellow travelers, and get inspired by real stories from the community.",
    icon: <FaUsers />,
    span: "col-span-1",
    accent: "#ff7757",
  },
  {
    title: "Live Chat & Forums",
    description:
      "Get real-time travel tips, discuss routes, and plan group adventures with fellow explorers.",
    icon: <FaComments />,
    span: "col-span-1",
    accent: "#ffaa1c",
  },
  {
    title: "Safety & Travel Tips",
    description:
      "Access weather alerts, safety checklists, emergency contacts, and expert preparation guides.",
    icon: <FaShieldAlt />,
    span: "col-span-1",
    accent: "#ff7757",
  },
  {
    title: "Multilingual Support",
    description:
      "Seamless experience in Hindi and English with intelligent content translation.",
    icon: <FaLanguage />,
    span: "col-span-1",
    accent: "#ff7757",
  },
  // {
  //   title: "Solo Traveler Matching",
  //   description:
  //     "Find compatible travel partners based on adventure style, pace, and destination preferences.",
  //   icon: <FaHandshake />,
  //   span: "col-span-1",
  //   accent: "#ffaa1c",
  // },
];

const FeatureShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.from(".fs-title", {
  //       y: 40,
  //       opacity: 0,
  //       duration: 1,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top 5%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });

  //     gsap.from(".feature-card", {
  //       y: 60,
  //       opacity: 0,
  //       scale: 0.95,
  //       stagger: 0.1,
  //       duration: 1,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: ".feature-grid",
  //         start: "top 5%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{
        background: "linear-gradient(180deg, #000a05 0%, #011a0f 50%, #000a05 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,170,28,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="fs-title text-center mb-16">
          <p className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Platform Features
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Everything You Need for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              the Perfect Trip
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Built by travelers, for travelers. Every feature designed to make
            your adventures safer, easier, and more memorable.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`feature-card group relative ${feature.span} rounded-2xl p-7 border border-white/[0.06] transition-all duration-500 hover:border-transparent hover:-translate-y-1 overflow-hidden`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(1,44,24,0.3) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${feature.accent}10 0%, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-all duration-500 group-hover:scale-110"
                style={{
                  background: `${feature.accent}15`,
                  color: feature.accent,
                  boxShadow: `0 0 0px ${feature.accent}00`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${feature.accent}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${feature.accent}00`;
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="relative z-10 text-white text-lg font-semibold mb-2 group-hover:text-brand-gold transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="relative z-10 text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Corner accent */}
              <div
                className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 100% 100%, ${feature.accent}08 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
