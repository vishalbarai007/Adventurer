import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

// Importing the image from the assets folder
import Image1 from "../../assets/Prehomepagecontent.jpg";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }) // Autoplay with 3-second delay
  );

  // Example array of images, can be expanded as needed
  const images = [Image1, Image1, Image1, Image1, Image1]; // Replace these with actual images

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop} // Stop on hover
      onMouseLeave={plugin.current.reset} // Reset when mouse leaves
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent
                  className="flex aspect-square items-center justify-center p-6"
                  backgroundImage={image} // Use the correct image path
                >
                  <span className="text-4xl font-semibold text-white">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
