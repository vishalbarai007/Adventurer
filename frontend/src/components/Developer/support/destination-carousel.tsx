"use client"

import { useState } from "react"
import { Card, CardContent } from "../../Shadcn/main/card"
import { Button } from "../../Shadcn/main/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IoIosArrowDropright } from "react-icons/io";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

interface Destination {
  id: number
  title: string
  image: string
  description: string
}

interface DestinationCarouselProps {
  destinations: Destination[]
}

export default function DestinationCarousel({ destinations }: DestinationCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === destinations.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? destinations.length - 1 : prevIndex - 1))
  }

  return (
    <>
      <div className="flex justify-center items-center">

        <div className="relative max-w-7xl mx-auto h-[600px] flex items-center justify-center perspective-1000">
          <div className="relative w-full h-full flex items-center justify-center">
            {destinations.map((destination, index) => {
              const isActive = index === currentIndex
              const isPrev = index === (currentIndex - 1 + destinations.length) % destinations.length
              const isNext = index === (currentIndex + 1) % destinations.length

              return (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Card
                      key={destination.id}
                      className={`
                absolute transition-all duration-700 ease-in-out rounded-none
                ${isActive
                          ? "z-20 transform-none w-[300px] h-[600px] opacity-100 scale-100"
                          : isPrev
                            ? "z-10 -translate-x-[60%] w-[300px] h-[500px] opacity-70 scale-85"
                            : isNext
                              ? "z-10 translate-x-[60%] w-[300px] h-[500px] opacity-70 scale-85"
                              : "opacity-0 scale-75 translate-x-full"
                        }
              `}
                    >
                      <CardContent className="p-0">
                        <div className="relative h-[250px] p-5 overflow-hidden">
                          <img
                            src={destination.image || "/placeholder.svg"}
                            alt={destination.title}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </div>
                        <div className="p-8 space-y-4 text-left">
                          <h3 className="text-2xl font-bold">{destination.title}</h3>
                          <p className="text-gray-600 text-sm">{destination.description}</p>
                          <Button variant="default" className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-full px-6">
                            Read More
                            <IoIosArrowDropright className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )
            })}
          </div>


        </div>

      </div>
      <div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[32%] top-1/2 -translate-y-1/2 z-30 bg-[#8B8F3D] hover:bg-[#8B8F3D]/90 text-white rounded-full h-12 w-12 shadow-lg"
          onClick={prevSlide}
        >
          <FaAnglesLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[16%] top-1/2 -translate-y-1/2 z-30 bg-[#8B8F3D] hover:bg-[#8B8F3D]/90 text-white rounded-full h-12 w-12 shadow-lg"
          onClick={nextSlide}
        >
          <FaAnglesRight className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}

