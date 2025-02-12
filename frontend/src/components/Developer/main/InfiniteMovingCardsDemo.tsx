"use client";

// import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../support/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] mt-24 rounded-md flex flex-col antialiased bg-brand-green dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h1 className="text-center text-5xl text-white ">Testimonials</h1>
      <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="slow"
      />
    </div>
  );
}
const testimonials = [
  {
    quote:
      "Adventurer made my solo trip planning effortless! The community feature helped me connect with fellow travelers, and the detailed destination guides were incredibly useful. Highly recommended!",
    name: "Vishal Mehta",
    title: "Community Connections",
  },
  {
    quote:
      "I love how easy it is to book my adventures through Adventurer. The integrated booking system is seamless, and the AI recommendations for my next destination were spot on!",
    name: "Shravani Kulkarni",
    title: "Smart Travel Recommendations",
  },
  {
    quote:
      "Sharing my travel experiences with the Adventurer community has been amazing! The social feed is just like Instagram but tailored for travelers. Love the engagement and support!",
    name: "Rahul Sharma",
    title: "Social Travel Experience",
  },
  {
    quote:
      "As a first-time trekker, I found the safety tips and packing lists extremely helpful. Adventurer gave me the confidence to embark on my first solo trek with all the right gear and information!",
    name: "Yug Verma",
    title: "Trekking Essentials",
  },
  {
    quote:
      "Finding like-minded travelers and joining group tours has never been this easy! Adventurer's solo traveler matchmaking feature is a game-changer. I made friends for life!",
    name: "Atharva Joshi",
    title: "Solo Travel Made Easy",
  },
  {
    quote:
      "The dual-language support in Hindi and English made navigating the website super easy for my family. The detailed travel guides and booking options were very helpful!",
    name: "Deepti Nair",
    title: "User-Friendly Experience",
  },
  {
    quote:
      "Adventurer helped me discover hidden gems across India! The destination guide and user reviews were extremely useful in planning my offbeat travel experiences.",
    name: "Yash Patil",
    title: "Hidden Gem Discoveries",
  },
];
