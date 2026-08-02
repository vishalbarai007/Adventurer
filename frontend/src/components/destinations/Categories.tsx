import data from '@/data/CatagoriesData.json'

const TravelCategories = () => {
  return (
    <section className="py-8 font-jakarta" id='adventure-activities'>
      <div className="text-center mb-8">
        <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider mb-2 block">Categories</span>
        <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#171717]" data-aos="fade-up">Your Travel Categories</h2>
        <p className="max-w-2xl mx-auto mt-3 text-gray-500 font-medium text-base leading-relaxed" data-aos="fade-up">
          Discover your next adventure with our curated selection of travel categories. Explore diverse destinations and unique experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-[24px] relative w-full h-64 overflow-hidden shadow-sm border border-gray-200 bg-white group cursor-pointer"
            data-aos="fade-up"
          >
            <img
              src={item.image}
              alt={item.heading}
              title={item.heading}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <h3 className="text-center text-xl font-bold absolute bottom-6 left-6 right-6 text-white leading-tight">
              {item.heading}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelCategories;
