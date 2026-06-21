import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import createGlobe from "cobe";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: "🤖",
    text: "AI-powered travel concierge at your fingertips",
  },
  {
    icon: "🌍",
    text: "150+ destinations, curated by real adventurers",
  },
  {
    icon: "🛡️",
    text: "Real-time safety alerts & emergency contacts",
  },
  {
    icon: "👥",
    text: "Smart matching with compatible travel partners",
  },
  {
    icon: "💬",
    text: "Community forums with 500+ active travelers",
  },
];

const AppShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);

  // Cobe globe
  useEffect(() => {
    let phi = 0;
    let globe: ReturnType<typeof createGlobe> | undefined;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 500 * 2,
        height: 500 * 2,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.0, 0.17, 0.09], // #012c18 mapped to 0-1 range
        markerColor: [1, 0.67, 0.11], // #ffaa1c
        glowColor: [0.05, 0.2, 0.1],
        markers: [
          { location: [19.076, 72.8777], size: 0.06 }, // Mumbai
          { location: [28.6139, 77.209], size: 0.06 }, // Delhi
          { location: [12.9716, 77.5946], size: 0.04 }, // Bangalore
          { location: [27.1767, 78.0081], size: 0.05 }, // Agra
          { location: [15.2993, 74.124], size: 0.04 }, // Goa
          { location: [32.2432, 77.1892], size: 0.05 }, // Manali
          { location: [25.3176, 82.9739], size: 0.04 }, // Varanasi
          { location: [34.0837, 74.7973], size: 0.04 }, // Srinagar
          { location: [26.9124, 75.7873], size: 0.05 }, // Jaipur
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.005;
        },
      });
    }

    return () => {
      globe?.destroy();
    };
  }, []);

  // Airplane orbit animation
  useEffect(() => {
    if (airplaneRef.current) {
      gsap.to(airplaneRef.current, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".app-title", {
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

      gsap.from(".highlight-item", {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".highlights-list",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".globe-container", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".globe-container",
          start: "top 80%",
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
        background:
          "linear-gradient(180deg, #000a05 0%, #01220e 50%, #000a05 100%)",
      }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div>
            <div className="app-title mb-10">
              <p className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
                Why Adventurer?
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                The World is Waiting.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <br />
                  Are You Ready?
                </span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-lg">
                Adventurer isn't just another travel app. It's a community-driven
                platform where every trail has a story, every destination has a
                guide, and every traveler finds their tribe.
              </p>
            </div>

            {/* Highlight list */}
            <div className="highlights-list space-y-4 mb-10">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="highlight-item flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] hover:border-brand-gold/20 transition-all duration-300 group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-white/70 text-base group-hover:text-white/90 transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/login"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-brand-gold/20"
              style={{
                background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
              }}
            >
              <span className="text-brand-green font-bold text-lg">
                Join the Adventure
              </span>
              <svg
                className="w-5 h-5 text-brand-green group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right — Globe */}
          <div className="globe-container relative flex items-center justify-center">
            {/* Globe canvas */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                style={{ width: 500, height: 500 }}
                className="max-w-full"
              />

              {/* Airplane orbit */}
              <div
                ref={airplaneRef}
                className="absolute inset-[-30px] pointer-events-none"
                style={{ transformOrigin: "center center" }}
              >
                <div
                  className="absolute"
                  style={{
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(90deg)",
                  }}
                >
                  {/* Airplane SVG */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-lg"
                  >
                    <path
                      d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                      fill="#ffaa1c"
                    />
                  </svg>
                  {/* Trail behind airplane */}
                  <div
                    className="absolute top-[65px] -left-[18px] w-16 h-[3px] rounded-full -rotate-90"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,170,28,0.6))",
                    }}
                  />
                </div>
              </div>

              {/* Orbit ring */}
              <div
                className="absolute inset-[-30px] rounded-full border border-brand-gold/10 pointer-events-none"
                style={{
                  boxShadow: "0 0 30px rgba(255,170,28,0.05)",
                }}
              />

              {/* Pulsing destination dots */}
              <div className="absolute top-[25%] right-[15%] w-3 h-3">
                <div className="absolute inset-0 bg-brand-gold rounded-full animate-ping opacity-75" />
                <div className="relative w-3 h-3 bg-brand-gold rounded-full" />
              </div>
              <div className="absolute bottom-[30%] left-[20%] w-2 h-2">
                <div className="absolute inset-0 bg-brand-orange rounded-full animate-ping opacity-75 animation-delay-1000" />
                <div className="relative w-2 h-2 bg-brand-orange rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
