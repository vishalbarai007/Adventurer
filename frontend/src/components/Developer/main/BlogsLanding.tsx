// import Image from "next/image"
import { Button } from "../../Shadcn/main/button"
// import { Input } from "../../Shadcn/main/input"
// import { Card, CardContent } from "../../Shadcn/main/card"
import { ChevronRight } from "lucide-react"
import DestinationCarousel from "../support/destination-carousel"
import { IoIosArrowDropright } from "react-icons/io";


const destinations = [
  {
    id: 1,
    title: "Travel in Nashik",
    image: "/assets/forts/hariharfort.jpg",
    description: "Nashik, where Godavari’s waters gleam,Vineyards weave a fragrant dream.Temples whisper tales of old,In hills and ghats, secrets unfold!",
  },
  {
    id: 2,
    title: "Travel in Pune",
    image: "/assets/forts/sinhagad_fort.jpg",
    description: "Nestled where the hills embrace the sky,Pune whispers tales of days gone by.Of forts, of wisdom, of flavors divine,A city where culture and dreams entwine!",
  },
  {
    id: 3,
    title: "Travel in Mumbai",
    image: "/assets/IND/MarineDrive.png",
    description: "Mumbai, where the sea meets the sky,Dreams take wings and never die.Chaos and charm in every street,A heartbeat fierce, yet bittersweet!",
  },
]

export default function BlogsLanding() {
  return (
    <>
      <div className="BlogsLanding w-fit sm:w-full grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 p-5">    <div className="min-h-screen flex items-center justify-center ">

        <section className="relative  px-10 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold border-l-8 border-white px-5 text-white">
                EXPLORE
                <br />
                <span className="text-[#98D8D3]">MAHARASHTRA</span>
              </h1>
              <p className="text-white/80 text-2xl max-w-2xl">
              Feel the Essence of Maharashtra Beyond the Ordinary.
              Heritage, Hills, and the Arabian Waves Await,
              A Journey Through Tradition, Taste, and Tranquility!
              </p>
              <Button className="bg-[#8B8F3D] text-2xl rounded-full font-extrabold p-7 hover:bg-[#8B8F3D]/90 text-white">
                BOOK NOW
                <IoIosArrowDropright className="ml-2 h-10 w-10" />
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 right-10 grid grid-cols-5 gap-2 opacity-70">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
          <div className="absolute -bottom-20 left-10 grid grid-cols-5 gap-2 opacity-70">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-white rounded-full" />
            ))}
          </div>
          <div className="absolute -top-20 left-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <ChevronRight key={i} className="inline text-white/90 font-extrabold h-8 w-6" />
            ))}
          </div>
          <div className="absolute -bottom-20 right-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <ChevronRight key={i} className="inline text-white/90 h-8 w-6" />
            ))}
          </div>
        </section>


      </div>


        <DestinationCarousel destinations={destinations} />


      </div>
    </>
  )
}

