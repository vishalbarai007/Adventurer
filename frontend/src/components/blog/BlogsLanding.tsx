import { useState } from "react";
import { Search, Compass, Sparkles, BookOpen, MapPin } from "lucide-react";

export default function BlogsLanding() {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredStories = [
    {
      id: "nashik",
      tag: "Cultural Trekking",
      title: "Secrets of Nashik Forts & Godavari Valleys",
      desc: "Explore ancient hilltop fortresses, vineyard trails, and historic temples nestled in the Sahyadri mountains.",
      author: "Adventurer Editorial",
      date: "Jul 28, 2026",
      readTime: "5 min read",
      image: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056869/adventurer_assets_migration/images/hariharfort_oybyue.jpg"
    },
    {
      id: "pune",
      tag: "Mountain Expedition",
      title: "Sinhagad & Beyond: Monsoon Trekking Guide",
      desc: "Cloud-covered mountain passes, cascading waterfalls, and traditional Maratha heritage trails around Pune.",
      author: "Trek Captain",
      date: "Jul 24, 2026",
      readTime: "7 min read",
      image: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056673/adventurer_assets_migration/images/sinhagad_fort_y51vys.jpg"
    }
  ];

  return (
    <section className="w-full font-jakarta mb-12">
      {/* Top Banner Hero */}
      <div className="relative w-full bg-[#111827] text-white rounded-[32px] overflow-hidden p-8 md:p-14 shadow-sm border border-gray-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-[#3A8DFF] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#3A8DFF]" />
            Adventurer Journal & Guides
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Tales From The Trail,<br />
            <span className="text-[#3A8DFF]">Guides & Wild Stories</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
            Immerse yourself in handpicked wilderness logs, packing strategies, gear reviews, and firsthand adventure stories from verified local guides.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-md">
            <div className="bg-white p-2 rounded-2xl flex items-center gap-3 shadow-md">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input 
                type="text" 
                placeholder="Search articles, guides, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-[#171717] font-semibold text-sm bg-transparent placeholder:text-gray-400"
              />
              <button className="bg-[#111827] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1F2937] transition-colors shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Decorative Backdrop Elements */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
          <Compass className="w-full h-full text-white" />
        </div>
      </div>

      {/* Featured Stories Grid Header */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#3A8DFF]" />
            <h2 className="text-2xl font-extrabold text-[#171717]">Editor's Highlights</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredStories.map((story) => (
            <div key={story.id} className="bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#111827] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {story.tag}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold leading-snug">{story.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">
                  {story.desc}
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#3A8DFF]" />
                    <span>{story.author}</span>
                  </div>
                  <span>{story.date} • {story.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
