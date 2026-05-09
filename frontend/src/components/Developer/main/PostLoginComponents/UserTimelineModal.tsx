import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "../../../Shadcn/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "../../support/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { History } from "lucide-react";

// Dummy data for user activities timeline
const timelineItems = [
    {
        date: "June 2024",
        title: "Conquered the Everest Base Camp",
        description: "Completed the 14-day trek to the base camp of the world's highest peak.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=300&auto=format&fit=crop",
        side: "left" as const,
    },
    {
        date: "August 2024",
        title: "Uploaded Photos from Spiti Valley",
        description: "Added 15 new breathtaking photos from the cold desert.",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=300&auto=format&fit=crop",
        side: "right" as const,
    },
    {
        date: "October 2024",
        title: "Wrote a Blog Post",
        description: "The Ultimate Guide to Solo Backpacking in Southeast Asia.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=300&auto=format&fit=crop",
        side: "left" as const,
    },
    {
        date: "January 2025",
        title: "Completed the Chadar Trek",
        description: "Braved the sub-zero temperatures to walk on the frozen Zanskar river.",
        image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdb340?q=80&w=300&auto=format&fit=crop",
        side: "right" as const,
    },
    {
        date: "March 2025",
        title: "Joined the 'Himalayan Explorers' Club",
        description: "Became a member of the elite trekking community.",
        image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=300&auto=format&fit=crop",
        side: "left" as const,
    }
];

function TimelineCard({ date, title, description, image, side }: typeof timelineItems[0]) {
    const isLogoRight = side === "right";

    return (
        <div className="relative w-full min-h-[15vh] lg:min-h-[20vh] z-10 flex group">
            {/* Center Dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-primary border-[3px] border-background shadow-[0_0_0_4px_rgba(var(--primary),0.2)] group-hover:bg-accent transition-colors duration-300" 
                />
            </div>

            <div className="grid grid-cols-2 items-center w-full h-full gap-4 lg:gap-8">
                {/* First Column */}
                <div className={`flex ${isLogoRight ? "flex-col justify-center items-end text-right pr-4 lg:pr-8" : "justify-end items-center pr-4 lg:pr-8"}`}>
                    {isLogoRight ? (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-1"
                        >
                            <span className="text-xs lg:text-sm text-muted-foreground font-medium uppercase tracking-wider">{date}</span>
                            <h4 className="text-sm lg:text-lg font-bold text-foreground leading-tight">{title}</h4>
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-20 w-32 lg:h-32 lg:w-48 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all"
                        >
                            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </motion.div>
                    )}
                </div>

                {/* Second Column */}
                <div className={`flex ${isLogoRight ? "justify-start items-center pl-4 lg:pl-8" : "flex-col justify-center items-start text-left pl-4 lg:pl-8"}`}>
                    {isLogoRight ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-20 w-32 lg:h-32 lg:w-48 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all"
                        >
                            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col gap-1"
                        >
                            <span className="text-xs lg:text-sm text-muted-foreground font-medium uppercase tracking-wider">{date}</span>
                            <h4 className="text-sm lg:text-lg font-bold text-foreground leading-tight">{title}</h4>
                            <p className="text-xs lg:text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function UserTimelineModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#012c18] transition-all duration-200 hover:bg-[#012c18]/10 hover:translate-x-1 active:scale-[0.98]">
                    <History className="h-5 w-5 flex-shrink-0" />
                    <span>My Timeline</span>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[85vh] p-0 overflow-hidden bg-background border-border/50">
                <DialogHeader className="p-6 pb-2 border-b border-border/50 bg-secondary/20">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <History className="w-6 h-6 text-primary" />
                        Adventurer's Journey
                    </DialogTitle>
                </DialogHeader>

                <div className="relative w-full p-4 lg:p-8 bg-card/50 overflow-hidden">
                    {/* The Spine (Dashed Line) */}
                    <div className="absolute left-1/2 top-10 bottom-10 w-px border-l-2 border-dashed border-border -translate-x-1/2 z-0" />

                    <Carousel
                        plugins={[
                            Autoplay({ delay: 3500, stopOnInteraction: true }),
                        ]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        orientation="vertical"
                        className="w-full"
                    >
                        <CarouselContent className="h-[55vh] -mt-2">
                            {timelineItems.map((item, i) => (
                                <CarouselItem key={i} className="pt-2 sm:basis-1/2 md:basis-1/3">
                                    <TimelineCard {...item} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UserTimelineModal;
