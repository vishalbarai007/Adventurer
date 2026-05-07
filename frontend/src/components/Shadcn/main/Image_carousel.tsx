import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../../Developer/support/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "../../Developer/support/carousel";


export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }) // Autoplay with 3-second delay
  );


  return (
    
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xl flex items-center justify-center"
      // onMouseEnter={plugin.current.stop} // Stop on hover
      // onMouseLeave={plugin.current.reset} // Reset when mouse leaves
    >
      
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent
                  className="flex aspect-square items-center justify-center ml-[10%] h-[350px] bg-cover"
                  // backgroundImage={`/assets/IND/image${index + 1}.jpg`} // Replace with actual images ${index + 1}
                  backgroundImage={`https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056976/adventurer_assets_migration/images/Chat1_npfday.png`} // Replace with actual images ${index + 1}
                 
                  // backgroundImage={`https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055967/adventurer_assets_migration/images/Adventurer_q8nh5o.jpg`} // Replace with actual images ${index + 1}

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
