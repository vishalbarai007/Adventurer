"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function InfiniteMovingCardsDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-title", {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-24 md:py-32 flex flex-col antialiased items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000a05 0%, #012c18 50%, #000a05 100%)",
      }}
    >
      {/* Section header */}
      <div className="testimonials-title text-center mb-12 px-6">
        <p className="text-brand-gold font-mono text-sm tracking-[0.3em] uppercase mb-4">
          What Travelers Say
        </p>
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">
          Stories from the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ffaa1c, #ff7757)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trail
          </span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto text-lg">
          Real experiences from real adventurers who found their next story with us.
        </p>
      </div>

      {/* Two rows moving in opposite directions */}
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="slow"
      />
      <div className="mt-6">
        <InfiniteMovingCards
          items={testimonials2}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Adventurer completely transformed how I plan my solo trips. The community feature connected me with fellow travelers in Ladakh, and together we explored passes I'd never have found alone. The detailed destination guides with real photos from travelers were incredibly useful. This isn't just a platform — it's a lifeline for wanderers.",
    name: "Vishal Mehta",
    title: "Solo Trekker • Mumbai",
  },
  {
    quote:
      "The AI travel concierge is genuinely impressive — it suggested a 5-day Western Ghats itinerary that perfectly matched my fitness level and budget. The integrated booking system made the whole process seamless. I went from 'thinking about it' to 'bags packed' in under an hour.",
    name: "Shravani Kulkarni",
    title: "Weekend Explorer • Pune",
  },
  {
    quote:
      "Sharing my Himalayan trek with the Adventurer community felt like coming home. The social feed is beautifully designed — like Instagram but built specifically for travelers. The engagement and support from fellow adventurers kept me motivated through my 14-day Everest Base Camp journey.",
    name: "Rahul Sharma",
    title: "Mountain Enthusiast • Delhi",
  },
  {
    quote:
      "As a first-time trekker, the safety tips and AI-generated packing lists literally saved my trip. I would have forgotten critical gear without them. Adventurer gave me the confidence to attempt my first solo trek to Triund — and I made it to the summit at sunrise.",
    name: "Yug Verma",
    title: "Beginner Trekker • Nagpur",
  },
];

const testimonials2 = [
  {
    quote:
      "Finding like-minded travelers has never been this intuitive. The solo traveler matching algorithm paired me with three other photographers heading to Spiti Valley. We've now done four trips together and plan our annual adventure through the platform. Friends for life.",
    name: "Atharva Joshi",
    title: "Travel Photographer • Bangalore",
  },
  {
    quote:
      "The dual-language support in Hindi and English made navigating the website effortless for my entire family. My parents could read reviews in Hindi while I planned in English. The detailed travel guides helped us plan a multi-generational trip to Rajasthan that everyone loved.",
    name: "Deepti Nair",
    title: "Family Traveler • Chennai",
  },
  {
    quote:
      "Adventurer helped me discover hidden gems across India that aren't on any mainstream travel site. The user reviews with actual trail conditions and honest ratings were a game-changer. I've logged 23 trips through the platform and each one exceeded expectations.",
    name: "Yash Patil",
    title: "Offbeat Explorer • Kolhapur",
  },
  {
    quote:
      "What sets Adventurer apart is the real-time safety alerts. During my Meghalaya trip, I got a weather warning that helped me reroute and avoid a dangerous trail. The emergency contacts feature gave my family peace of mind while I explored some seriously remote areas.",
    name: "Priya Deshmukh",
    title: "Adventure Traveler • Hyderabad",
  },
];
