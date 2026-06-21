import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Find Your Trail",
    description:
      "Browse curated destinations, hidden gems, and off-beat trails handpicked by seasoned adventurers. From misty Western Ghats to snow-capped Himalayan passes.",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <circle cx="28" cy="28" r="20" stroke="#ffaa1c" strokeWidth="2.5" />
        <line x1="42" y1="42" x2="58" y2="58" stroke="#ffaa1c" strokeWidth="3" strokeLinecap="round" />
        <circle cx="28" cy="28" r="8" stroke="#ff7757" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Connect",
    subtitle: "Find Your Tribe",
    description:
      "Match with fellow travelers who share your vibe. Join group treks, share itineraries, and build friendships that last beyond the trail.",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <circle cx="22" cy="24" r="8" stroke="#ffaa1c" strokeWidth="2" />
        <circle cx="42" cy="24" r="8" stroke="#ffaa1c" strokeWidth="2" />
        <path d="M10 48c0-8 5-14 12-14h2" stroke="#ff7757" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 48c0-8-5-14-12-14h-2" stroke="#ff7757" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 38h12" stroke="#ffaa1c" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Adventure",
    subtitle: "Write Your Story",
    description:
      "Book organized treks, get AI-powered packing lists, receive safety alerts, and set off on your next great story. The wild is calling.",
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none">
        <path d="M32 8L8 52h48L32 8z" stroke="#ffaa1c" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M22 52l10-18 10 18" stroke="#ff7757" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="32" cy="22" r="3" fill="#ffaa1c" />
        <path d="M18 34l6-2 4 4 6-6 4 2 6-4" stroke="#ff7757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title
      gsap.from(".hiw-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animated path draw
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
      }

      // Cards stagger
      gsap.from(".hiw-card", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hiw-cards-container",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000a05 0%, #012c18 50%, #000a05 100%)",
      }}
    >
      {/* Section header */}
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <div className="hiw-title text-center">
          <p className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Three Steps to Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Next Adventure
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            From discovery to departure — we've simplified the entire journey.
          </p>
        </div>
      </div>

      {/* Connecting path SVG (desktop) */}
      <div className="hidden lg:block absolute top-[55%] left-0 right-0 -translate-y-1/2 pointer-events-none">
        <svg
          viewBox="0 0 1200 100"
          className="w-full max-w-5xl mx-auto"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M100 50 C300 50, 300 50, 400 50 S500 50, 600 50 S700 50, 800 50 S900 50, 1100 50"
            stroke="url(#pathGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffaa1c" />
              <stop offset="50%" stopColor="#ff7757" />
              <stop offset="100%" stopColor="#ffaa1c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Cards */}
      <div className="hiw-cards-container container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="hiw-card group relative"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative p-8 rounded-2xl border border-white/[0.06] transition-all duration-500 group-hover:border-brand-gold/30 group-hover:-translate-y-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,170,28,0.02) 100%)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Step number */}
                <span className="absolute -top-4 -right-2 text-7xl font-bold text-white/[0.03] font-mono select-none group-hover:text-brand-gold/[0.08] transition-colors duration-500">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif text-white mb-1">{step.title}</h3>
                <p className="text-brand-gold text-sm font-mono tracking-wider mb-4">
                  {step.subtitle}
                </p>
                <p className="text-white/60 leading-relaxed text-base">{step.description}</p>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${
                      index === 0 ? "#ffaa1c" : index === 1 ? "#ff7757" : "#ffaa1c"
                    }, transparent)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
