import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CachedImage from "@/components/ui/cached-image";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    image:
      "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto,w_600/v1778056374/adventurer_assets_migration/images/Prelanding_w1fdqe.png",
    title: "Mountain Summits",
    location: "Western Ghats, India",
    category: "trekking",
    tall: true,
  },
  {
    image:
      "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto,w_600/v1778056757/adventurer_assets_migration/images/Bgmountains_vdanil.png",
    title: "Alpine Passes",
    location: "Himalayas, India",
    category: "trekking",
    tall: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1432405972618-c6b0cfba1b4f?w=600&q=80",
    title: "Hidden Waterfalls",
    location: "Meghalaya, India",
    category: "waterfalls",
    tall: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    title: "Pristine Beaches",
    location: "Gokarna, India",
    category: "beaches",
    tall: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
    title: "Ancient Forts",
    location: "Rajasthan, India",
    category: "historical",
    tall: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    title: "Valley Treks",
    location: "Spiti Valley, India",
    category: "trekking",
    tall: false,
  },
];

const AdventureGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-title", {
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

      gsap.from(".gallery-item", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-grid",
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
      className="relative py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #000a05 0%, #012c18 50%, #000a05 100%)",
      }}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="gallery-title text-center mb-16">
          <p className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Destinations
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
            Breathtaking Destinations{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Await
            </span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-lg">
            Explore our curated collection of India's most awe-inspiring adventure spots.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-5 max-w-6xl mx-auto space-y-5">
          {destinations.map((dest, index) => (
            <Link
              key={index}
              to={`/destinations/${dest.category}`}
              className="gallery-item group relative block rounded-2xl overflow-hidden break-inside-avoid"
              style={{ height: dest.tall ? "420px" : "280px" }}
            >
              <CachedImage
                src={dest.image}
                alt={dest.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Category badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-brand-gold/20 text-brand-gold border border-brand-gold/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                {dest.category}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-serif mb-1">
                  {dest.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {dest.location}
                </div>
                {/* Explore arrow */}
                <div className="mt-3 flex items-center gap-2 text-brand-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span>Explore</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdventureGallery;
