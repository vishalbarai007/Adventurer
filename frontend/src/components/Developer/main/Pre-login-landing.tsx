// import Logo from "./Logo"

export default function Preloginlanding() {
  return (
    <div className="min-h-screen flex justify-center items-center align-middle bg-brand-green" id="target-section">
      <div className="container mx-auto p-10 ">
        {/* Main Content */}
        <main className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              <span className="text-brand-gold">Discover</span>{" "}
              <span className="text-white">the magic in every destination</span>{" "}
              <span className="text-brand-gold">with us!</span>
            </h1>

            <p className="text-white text-lg leading-relaxed max-w-2xl">
              A travel and tourism website dedicated to adventurers offers a wealth of resources for those seeking
              unique experiences. It features destination guides, adventure itineraries, and tourists blogs, catering to
              thrill-seekers and nature enthusiasts alike.
            </p>

            <p className="text-white text-lg leading-relaxed max-w-2xl">
              Users can explore various travel options, from hiking trails to extreme sports, ensuring they find the
              perfect adventure to suit their interests. The platform also fosters a community of like-minded
              individuals, encouraging the sharing of stories and recommendations to enhance the travel experience.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="border-4 border-brand-orange rounded-lg overflow-hidden">
              <img
                src="/assets/Prelanding.png"
                alt="Adventure seeker standing on a mountain during sunset"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

