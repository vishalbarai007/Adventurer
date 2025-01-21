// import Image from "next/image"
import { Button } from "../../Shadcn/main/button"
// import { Input } from "../../Shadcn/main/input"
// import { Card, CardContent } from "../../Shadcn/main/card"
import { ChevronLeft, ChevronRight, Search, User } from "lucide-react"
import DestinationCarousel from "../support/destination-carousel"
import { IoIosArrowDropright } from "react-icons/io";


const destinations = [
  {
    id: 1,
    title: "Travel in Paris",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-15%20at%2014.33.27_0748f1a9.jpg-yGtJIXYZaOqqhh8wvSC5YC4fbYNJQo.jpeg",
    description: "Lorem ipsum praesent ac massa ac nisl. Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
  },
  {
    id: 2,
    title: "Travel in Japan",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-15%20at%2014.33.27_0748f1a9.jpg-yGtJIXYZaOqqhh8wvSC5YC4fbYNJQo.jpeg",
    description: "Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aat ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
  },
  {
    id: 3,
    title: "Travel in Roma",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-15%20at%2014.33.27_0748f1a9.jpg-yGtJIXYZaOqqhh8wvSC5YC4fbYNJQo.jpeg",
    description: "Lorem ipsum praesent ac massa at ligu. Lorem ipsum praesent ac massa at ligula reet est iaculis. Vivamus est mist aliquet elit ac nisl.",
  },
]

export default function BlogsLanding() {
  return (
  <>
    <div className="BlogsLanding grid grid-cols-2">
    <div className="min-h-screen flex items-center justify-center ">
      {/* Header */}
      {/* <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/assets/BarndLogos/Adventurer/adventurer.png" alt="Adventurer Logo" width={40} height={40} className="object-contain" />
          <span className="text-2xl font-bold text-white">adventurer</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {["BlogsLanding", "Services", "Contact Us", "Blog"].map((item) => (
            <a key={item} href="#" className="text-white hover:text-white/80 transition-colors">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button variant="ghost" className="text-white">
            <User className="h-5 w-5 mr-2" />
            Log In
          </Button>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative  px-10 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold border-l-8 border-white px-5 text-white">
              EXPLORE
              <br />
              <span className="text-[#98D8D3]">THE WORLD</span>
            </h1>
            <p className="text-white/80 text-2xl max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam
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

      {/* Destinations Carousel */}
    
    </div>
    {/* <section className="flex justify-center items-center"> */}
        <DestinationCarousel destinations={destinations} />
      {/* </section> */}

    </div>
  </>
  )
}

