import { AnimatedTestimonials } from "../support/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Passion and persistence are the keys to mastering front-end development. Keep building, keep innovating!",
      name: "Vishal Barai",
      designation: "Front-end Developer",
      src: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056002/adventurer_assets_migration/images/Vishal_mzgtcl.png",
    },
    {
      quote:
        "A great backend is like a strong foundation—silent but essential. Keep optimizing, keep scaling!",
      name: "Rahul Bokade",
      designation: "Back-end Developer",
      src: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055942/adventurer_assets_migration/images/Rahul_piiquh.png",

    },
    {
      quote:
        "Data isn’t just numbers; it tells a story. The key is to structure it right and unlock its power!",
      name: "Yug Chaphekar",
      designation: "Database Management",
      src: "/assets/Developers/Yug.png",
    },
    {
      quote:
        "Good design is invisible. Great design is felt. Create experiences, not just interfaces!",
      name: "Shravani Bhogle",
      designation: "UI/UX Designer (Figma)",
      src: "https://res.cloudinary.com/djk32h7rn/image/upload/v1778056073/adventurer_assets_migration/images/image_oma8fg.png",
    },
  ];
    
  return <AnimatedTestimonials testimonials={testimonials} />;
}
