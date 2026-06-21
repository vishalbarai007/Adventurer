import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../Shadcn/ui/dialog";

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    title: string;
    images: string[];
    bestSeason: string;
    description: string;
    location: string;
  } | null;
}

const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  destination,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!destination) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-brand-green border-white/10 text-white">
        <div className="relative">
          {/* Embla Carousel */}
          <div className="overflow-hidden relative" ref={emblaRef}>
            <div className="flex">
              {destination.images.map((img, idx) => (
                <div className="flex-[0_0_100%] min-w-0" key={idx}>
                  <img
                    src={img}
                    alt={`${destination.title} - Image ${idx + 1}`}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {destination.images.length > 1 && (
              <>
                <button
                  onClick={scrollPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition"
                >
                  &larr;
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition"
                >
                  &rarr;
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-2xl md:text-3xl font-serif text-brand-gold">
              {destination.title}
            </DialogTitle>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {destination.location}
              </span>
              <span className="px-2 py-1 rounded bg-white/10 text-brand-gold">
                Best Season: {destination.bestSeason}
              </span>
            </div>
          </DialogHeader>

          <DialogDescription className="text-white/80 text-base leading-relaxed mt-4">
            {destination.description}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;
