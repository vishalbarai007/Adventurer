import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaHandshake,
  FaRoute,
  FaStar,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, label: "Active Users", icon: <FaUsers />, suffix: "+" },
  { value: 158, label: "Cities Covered", icon: <FaMapMarkerAlt />, suffix: "+" },
  { value: 98, label: "Travel Partners", icon: <FaHandshake />, suffix: "+" },
  { value: 79, label: "Trail Routes", icon: <FaRoute />, suffix: "+" },
  { value: 34, label: "5★ Reviews", icon: <FaStar />, suffix: "+" },
];

const StatCard: React.FC<{
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix: string;
  index: number;
}> = ({ value, label, icon, suffix, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          delay: index * 0.15,
          ease: "power2.out",
          onUpdate: () => setCount(Math.floor(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [value, index]);

  return (
    <div
      ref={ref}
      className="group relative p-6 md:p-8 rounded-2xl border border-white/[0.06] transition-all duration-500 hover:border-brand-gold/20 hover:-translate-y-1 text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,170,28,0.02) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold text-xl mb-4 group-hover:bg-brand-gold/20 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>

      {/* Counter value */}
      <p
        className="text-4xl md:text-5xl font-bold mb-2 font-mono"
        style={{
          background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}
        {suffix}
      </p>

      {/* Label */}
      <p className="text-white/50 text-sm font-medium tracking-wide uppercase">
        {label}
      </p>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,170,28,0.05) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

const StatsCounter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats-title", {
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

      gsap.from(".stat-card", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
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
          "linear-gradient(180deg, #000a05 0%, #012c18 50%, #000a05 100%)",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="stats-title text-center mb-16">
          <p className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Our Impact
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Numbers That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Speak
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Join a growing community of adventurers transforming how India
            travels.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={stat.label} className="stat-card">
              <StatCard {...stat} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
