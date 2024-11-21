import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Title Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">Adventurer</span>
          </h1>
          <p className="text-lg text-gray-600">
            Your trusted travel partner for unforgettable adventures.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Left Section - Description */}
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">
              At Adventurer, we believe travel is about more than just visiting
              destinations—it's about creating lifelong memories, exploring
              diverse cultures, and experiencing nature at its finest. Our
              platform offers a one-stop solution for adventure enthusiasts,
              combining planning tools, personalized recommendations, and a
              community of like-minded explorers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Whether you're embarking on your first trek or you're a seasoned
              traveler, Adventurer is here to inspire, guide, and support you.
              From detailed itineraries and safety tips to local guides and
              cultural insights, we provide everything you need to make your
              journey seamless and enjoyable.
            </p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">10+</h3>
                <p className="text-gray-600">Years of Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">5,000+</h3>
                <p className="text-gray-600">Satisfied Clients</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">100+</h3>
                <p className="text-gray-600">Countries Covered</p>
              </div>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex items-center justify-center">
            <img
              src="/about-us-placeholder.jpg"
              alt="Adventurer Team"
              className="rounded-lg shadow-lg max-w-full"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Why Choose Adventurer?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-white shadow-lg rounded-full w-16 h-16 mx-auto">
                <i className="fas fa-shield-alt text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Safety
              </h3>
              <p className="text-gray-600">
                Travel safely with over 10 years of expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-white shadow-lg rounded-full w-16 h-16 mx-auto">
                <i className="fas fa-headset text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Support
              </h3>
              <p className="text-gray-600">
                24/7 assistance for a convenient and hassle-free experience.
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-white shadow-lg rounded-full w-16 h-16 mx-auto">
                <i className="fas fa-tags text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Value
              </h3>
              <p className="text-gray-600">
                Competitive pricing without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
