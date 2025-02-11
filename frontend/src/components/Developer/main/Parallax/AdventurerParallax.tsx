import { ParallaxBanner } from "react-scroll-parallax"
import type { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types"
// import { ChevronDown } from "lucide-react"
import ScrollDownButton from "../ScrollDownButton"

const AdventurerParallax = () => {
  const background: BannerLayer = {
    image: "/assets/parallax/Bgmountains.png",
    translateY: [0, 50],
    opacity: [1, 5],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  }

  const mountains: BannerLayer = {
    image: "/assets/parallax/Bgmountains.png",
    translateY: [0, 100],
    scale: [1, 1.5, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  }
  const birds1: BannerLayer = {
    translateX: [0, 100],
    opacity: [0.7, -5],
    scale: [0.5, 0.2, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className="absolute top-[50%] w-[100%] h-[400px]" style={{backgroundImage: "url(/assets/parallax/birds1.png)", backgroundRepeat: "repeat-x", backgroundSize: "contain"}}>

      </div>
    ),
  }

  const birds2: BannerLayer = {
    translateX: [0, -100],
    opacity: [0.7, -5],
    scale: [0.5, 0.2, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className="absolute -top-[50%] -left-[40%] rotate-180 w-[50%] h-[400px]" style={{backgroundImage: "url(/assets/parallax/birds2.svg)", backgroundRepeat: "repeat-x", backgroundSize: "contain"}}>

      </div>
    ),
  }

  const adventurer: BannerLayer = {
    translateX: [0, 100],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute left-[-15%] bottom-[-5%] w-auto h-[100%] z-40">
        <img src="/assets/parallax/man.png" alt="Adventurer" className="w-full h-full object-cover object-center" />
      </div>
    ),
  }
  const title: BannerLayer = {
    opacity: [0.7, -5],
    scale: [0.5, 1.5, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    children: (
      <div className="absolute top-[350px] -left-36 md:-left-60 lg:left-0 text-center w-full ">
        <h1 className="lg:text-[200px] font-bold text-[80px]  md:text-[190px] text-black mb-4 tracking-wider">
          ADVENTURER
        </h1>
      </div>
    ),
  }

  const headline: BannerLayer = {
    // translateY: [0, -50],
    opacity: [0, 2.5],
    scale: [0.5, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 text-center w-full">
        <h1 className="text-6xl font-bold text-black mb-4 tracking-wider">
          EXPLORE. DREAM.
          <br />
          DISCOVER.
        </h1>
      </div>
    ),
  }

  const scrollIndicator: BannerLayer = {
    opacity: [1, 0],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white animate-bounce">
        {/* <ChevronDown size={32} /> */}
        <ScrollDownButton/>
      </div>
    ),
  }

  const gradientOverlay: BannerLayer = {
    opacity: [0, 0.4],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />,
  }

  return (
    <ParallaxBanner
      layers={[background, mountains,title, headline, birds1, birds2, adventurer, gradientOverlay, scrollIndicator]}
      className="h-screen relative inset-0 mask-[radial-gradient(circle,rgba(0,0,0,0)_40%, rgba(0,0,0,0.4)_55%, rgba(0,0,0,0.8)_70%, rgba(0,0,0,1)_90%)]"
    />
  )
}

export default AdventurerParallax