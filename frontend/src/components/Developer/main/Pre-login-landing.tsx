// import Logo from "./Logo"

import CachedImage from "../support/CachedImage"

export default function Preloginlanding() {
  return (
    <div className="min-h-screen flex justify-center items-center align-middle bg-brand-green" id="target-section">
      <div className="container mx-auto p-10 ">
        {/* Main Content */}
        <main className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              <span className="text-brand-gold">Unleash</span>{" "}
              <span className="text-white">your wild side,</span>{" "}
              <span className="text-brand-gold">defy the ordinary.</span>
            </h1>

            <p className="text-white text-lg leading-relaxed max-w-2xl">
              Welcome to the ultimate sanctuary for thrill-seekers and wanderers. Whether you're chasing the adrenaline of high-altitude treks, carving through untouched wilderness, or hunting for that perfect, breathtaking summit—your next legendary story begins here.
            </p>

            <p className="text-white text-lg leading-relaxed max-w-2xl">
              Dive into curated trails, uncover hidden adrenaline rushes, and connect with a raw community of fellow explorers. Stop dreaming about the edge of the map. Step off the beaten path, push your limits, and let the wild transform you.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="border-4 border-brand-orange rounded-lg overflow-hidden">
              <CachedImage
                src="https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056374/adventurer_assets_migration/images/Prelanding_w1fdqe.png"
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

