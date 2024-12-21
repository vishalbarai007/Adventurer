import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../support/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "../support/carousel";


export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }) // Autoplay with 3-second delay
  );


  return (
    
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop} // Stop on hover
      onMouseLeave={plugin.current.reset} // Reset when mouse leaves
    >
      
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent
                  className="flex aspect-square items-center justify-center p-6 h-[350px]"
                  backgroundImage={`/assets/IND/image${index + 1}.jpg`} // Replace with actual images ${index + 1}
                >
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default CarouselPlugin;
