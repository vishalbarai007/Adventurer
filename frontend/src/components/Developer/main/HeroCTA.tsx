import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const adventurePrompts = [
  "Summit the Himalayas at dawn",
  "Kayak through hidden caves",
  "Camp under a million stars",
  "Trek to ancient forgotten forts",
  "Chase waterfalls in the Western Ghats",
  "Find serenity on untouched beaches",
];

const HeroCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = adventurePrompts[currentPrompt];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 60);
    } else if (!isDeleting && displayText.length === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, 30);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentPrompt((prev) => (prev + 1) % adventurePrompts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPrompt]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title words stagger
      gsap.from(".hero-word", {
        y: 80,
        opacity: 0,
        rotationX: -90,
        stagger: 0.15,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Compass spin entrance
      gsap.from(compassRef.current, {
        scale: 0,
        rotation: 720,
        opacity: 0,
        duration: 1.8,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous compass needle animation
      gsap.to(".compass-needle", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      // CTA entrance
      gsap.from(".hero-cta-area", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating particles
      const particles = particlesRef.current?.querySelectorAll(".particle");
      particles?.forEach((p) => {
        gsap.to(p, {
          y: -window.innerHeight,
          x: `random(-100, 100)`,
          opacity: 0,
          duration: `random(4, 8)`,
          repeat: -1,
          delay: `random(0, 5)`,
          ease: "none",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #0a3d22 0%, #012c18 40%, #000a05 100%)",
      }}
    >
      {/* Particle system */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: i % 3 === 0 ? "#ffaa1c" : i % 3 === 1 ? "#ff7757" : "rgba(255,255,255,0.3)",
              left: `${Math.random() * 100}%`,
              bottom: "-10px",
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,170,28,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,170,28,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content — 3 cols */}
          <div ref={textRef} className="lg:col-span-3 space-y-8">
            <div className="overflow-hidden">
              <p className="hero-word text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
                — Your journey begins here
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.1] tracking-tight">
              {["Don't", "Just", "Travel."].map((word, i) => (
                <span key={i} className="hero-word inline-block mr-3 text-white">
                  {word}
                </span>
              ))}
              <br />
              {["Live", "The", "Story."].map((word, i) => (
                <span
                  key={i}
                  className="hero-word inline-block mr-3"
                  style={{
                    background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Typewriter prompt */}
            <div className="flex items-center gap-3 py-4">
              <div className="w-1 h-12 bg-gradient-to-b from-brand-gold to-brand-orange rounded-full" />
              <div>
                <p className="text-white/50 text-xs font-mono uppercase tracking-wider">
                  Next adventure
                </p>
                <p className="text-white text-xl md:text-2xl font-light min-h-[2em]">
                  {displayText}
                  <span className="inline-block w-[2px] h-6 bg-brand-gold ml-1 animate-pulse" />
                </p>
              </div>
            </div>

            {/* CTA area — not generic buttons */}
            <div className="hero-cta-area flex flex-col sm:flex-row items-start gap-6 pt-4">
              <Link
                to="/login"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                }}
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative text-brand-green font-bold text-lg tracking-wide">
                  Begin Your Story
                </span>
                <svg
                  className="relative w-5 h-5 text-brand-green group-hover:translate-x-1 transition-transform"
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

              <div className="flex items-center gap-4 text-white/60">
                <div className="flex -space-x-3">
                  {[
                    "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto,w_40/v1778056002/adventurer_assets_migration/images/Vishal_mzgtcl.png",
                    "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto,w_40/v1778055942/adventurer_assets_migration/images/Rahul_piiquh.png",
                    "https://res.cloudinary.com/djk32h7rn/image/upload/v1778056073/adventurer_assets_migration/images/image_oma8fg.png",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="community member"
                      className="w-10 h-10 rounded-full border-2 border-brand-green object-cover"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-brand-green bg-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-bold">
                    +497
                  </div>
                </div>
                <span className="text-sm">
                  adventurers already exploring
                </span>
              </div>
            </div>
          </div>

          {/* Right — Compass */}
          <div className="lg:col-span-2 flex justify-center" ref={compassRef}>
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Compass outer ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-brand-gold/30"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,170,28,0.05) 0%, transparent 70%)",
                }}
              >
                {/* Direction markers */}
                {["N", "E", "S", "W"].map((dir, i) => (
                  <span
                    key={dir}
                    className="absolute text-brand-gold font-mono text-sm font-bold"
                    style={{
                      top: i === 0 ? "8px" : i === 2 ? "auto" : "50%",
                      bottom: i === 2 ? "8px" : "auto",
                      left: i === 3 ? "8px" : i === 1 ? "auto" : "50%",
                      right: i === 1 ? "8px" : "auto",
                      transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
                    }}
                  >
                    {dir}
                  </span>
                ))}

                {/* Degree markings */}
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 10}deg)`,
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: i % 9 === 0 ? "3px" : "1px",
                        height: i % 9 === 0 ? "12px" : "6px",
                        background: i % 9 === 0 ? "#ffaa1c" : "rgba(255,170,28,0.3)",
                        top: "-140px",
                        left: "-1px",
                      }}
                    />
                  </div>
                ))}

                {/* Inner ring */}
                <div className="absolute inset-8 rounded-full border border-brand-gold/20" />
                <div className="absolute inset-16 rounded-full border border-brand-gold/10 flex items-center justify-center">
                  {/* Compass needle */}
                  <div className="compass-needle relative w-full h-full">
                    {/* North pointer */}
                    <div
                      className="absolute left-1/2 top-2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderBottom: "40px solid #ffaa1c",
                        filter: "drop-shadow(0 0 6px rgba(255,170,28,0.5))",
                      }}
                    />
                    {/* South pointer */}
                    <div
                      className="absolute left-1/2 bottom-2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "40px solid #ff7757",
                        filter: "drop-shadow(0 0 6px rgba(255,119,87,0.5))",
                      }}
                    />
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pulsing glow */}
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,170,28,0.1) 0%, transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
};

export default HeroCTA;
