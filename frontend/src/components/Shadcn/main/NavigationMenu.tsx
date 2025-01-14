
'use client'

import * as React from "react"
import { Link } from "react-router-dom"
import { IoHome, IoLogIn } from "react-icons/io5"
import { FaSearchLocation, FaStar, FaFlag, FaHandshake } from "react-icons/fa"
import { RiMessage3Fill, RiAccountPinBoxFill, RiCalendarScheduleFill, RiContactsFill } from "react-icons/ri"
import { TbTrekking, TbSocial } from "react-icons/tb"
import { FaMagnifyingGlassLocation } from "react-icons/fa6"
import { MdBedroomParent, MdGroups2 } from "react-icons/md"
import { cn } from "../../../lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { Menu } from 'lucide-react'
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"


const components: { title: string; subtitle: string; href: string; description: string; icon: React.ReactNode }[] = [
    {
        title: "Travel Blogs",
        subtitle: "Blogs",
        href: "/blogs",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
        icon: <RiMessage3Fill />,
    },
    {
        title: "Seasonal Destinations",
        subtitle: "Blogs",

        href: "/seasonal_destinations",
        description:
            "For sighted users to preview content available behind a link.",
        icon: <FaMagnifyingGlassLocation />,

    },
    {
        title: "Adventure Activities",
        subtitle: "Blogs",

        href: "/seasonal_destinations",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
        icon: <TbTrekking />,
    },
    {
        title: "Travel Tips",
        href: "/seasonal_destinations",
        subtitle: "Blogs",

        description: "Visually or semantically separates content.",
        icon: <FaStar />,

    },
    {
        title: "Accommodation",
        href: "/seasonal_destinations",
        subtitle: "Blogs",

        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",

        icon: <MdBedroomParent />,

    },
    {
        title: "Travel Guides",
        subtitle: "Blogs",
        href: "/seasonal_destinations",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
        icon: <FaFlag />,

    },
];

export function NavigationMenuDemo() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <header className={cn(
                "fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out",
                isScrolled ? "translate-y-0" : "-translate-y-full",
                "bg-[#012c18] text-[#012c18]")}>

                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/pre-login-homepage" className="text-2xl font-bold">
                            <img src="/assets/BrandLogos/Adventurer/Adventurer_yellow.png" alt="ADVENTURER"  className="h-[80px]"/>
                        </Link>


                        <nav className="hidden lg:block">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link to="/pre-login-homepage" className={navigationMenuTriggerStyle()}>
                                                <IoHome className="mr-2" />HOME
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger><FaStar className="mr-2" /> Features</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {components.map((component) => (
                                                    <ListItem key={component.title} title={component.title} to={component.href}>
                                                        <div className="flex items-center">
                                                            <span className="mr-2 text-black">{component.icon}</span>
                                                            <span>{component.subtitle}</span>
                                                        </div>
                                                        <p>{component.description}</p>
                                                    </ListItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger><FaSearchLocation className="mr-2" />Explore more</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3">
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            to="/login"
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        >
                                                            {/* <Icons.logo className="h-6 w-6" /> */}
                                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                                <TbSocial /> Travel Social
                                                            </div>
                                                            <p className="text-sm leading-tight text-muted-foreground">
                                                                Login to expierence Latest Feature in Travel & Tourism Industry.
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                                <ListItem to="/login" title="Personalized Account">
                                                    <RiAccountPinBoxFill className="text-black" /> Personalized account only for you .
                                                </ListItem>
                                                <ListItem to="/login" title="Meet Ups">
                                                    <FaHandshake className="text-black" /> Meet Travel Enthusiast who Matches Your Aura & Excitements.
                                                </ListItem>
                                                <ListItem to="/login" title="Travel Reminder" >
                                                    <RiCalendarScheduleFill className="text-black" /> Get Reminded about your upcoming trips.
                                                </ListItem>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link to="/about" className={navigationMenuTriggerStyle()}>
                                                <MdGroups2 className="mr-2" /> About us
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link to="/contact" className={navigationMenuTriggerStyle()}>
                                                <RiContactsFill className="mr-2" /> Contact us
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link to="/login" className={navigationMenuTriggerStyle()}>
                                                <IoLogIn className="mr-2" /> Login
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>
                        </nav>


                        {/* Mobile */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col space-y-4">
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/pre-login-homepage" className="flex items-center space-x-2">
                                        <IoHome />
                                        <span>HOME</span>
                                    </Link>
                                    {/* ... (other mobile menu items) */}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

        </>
    );
}

type ListItemProps = React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    children: React.ReactNode;
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = "ListItem";
