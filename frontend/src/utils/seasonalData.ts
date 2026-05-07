export type SuggestionItem = {
  id: string;
  name: string;
  tag: string;
  image: string;
  type: "destination" | "organization";
  companyName?: string; // For organization trips
};

export const getSeason = (): "winter" | "monsoon" | "summer" => {
  const month = new Date().getMonth(); // 0-11
  if (month >= 10 || month <= 1) return "winter"; // Nov - Feb
  if (month >= 5 && month <= 8) return "monsoon"; // June - Sept
  return "summer"; // March - May
};

export const seasonalSuggestions: Record<string, SuggestionItem[]> = {
  winter: [
    { id: "w1", name: "Nashik", tag: "Vineyards & Cold Breeze", image: "/assets/nashik.jpg", type: "destination" },
    { id: "w2", name: "Mahabaleshwar", tag: "Strawberry Picking", image: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056300/adventurer_assets_migration/images/Mahabaleshwar_yf3qxa.png", type: "destination" },
  ],
  monsoon: [
    { id: "m1", name: "Harishchandragad", tag: "Cloudy Trekking", image: "/assets/harishchandragad.jpg", type: "destination" },
    { id: "m2", name: "Harihar Fort", tag: "Iconic Rock-cut Steps", image: "/assets/harihar.jpg", type: "destination" },
  ],
  summer: [
    { id: "s1", name: "Sandhan Valley", tag: "Shadow Valley Trek", image: "/assets/sandhan.jpg", type: "destination" },
    { id: "s2", name: "Bhandardhara", tag: "Lakeside Camping", image: "/assets/bhandar.jpg", type: "destination" },
  ],
};

export const recentOrgTrips: SuggestionItem[] = [
  { id: "org1", name: "Kalsubai Night Trek", tag: "Starts Tomorrow", companyName: "Summit Seekers", image: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778057398/adventurer_assets_migration/images/kalsubai_ra1cq1.webp", type: "organization" },
];
