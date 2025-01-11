import * as React from "react";
import { Link } from "react-router-dom"; // React Router for navigation

import { cn } from "../../../lib/utils";
// import { Icons } from "@/components/icons";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Travel Blogs",
        href: "/blogs",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Seasonal Destinations",
        href: "/seasonal_destinations",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Adventure Activities",
        href: "/seasonal_destinations",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Travel Tips",
        href: "/seasonal_destinations",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Accommodation",
        href: "/seasonal_destinations",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Travel Guides",
        href: "/seasonal_destinations",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

export function NavigationMenuDemo() {
    return (
        <div className=" h-auto w-full fixed top-3 p-10 z-50 flex justify-center bg-[#112c1d] ">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/pre-login-homepage" className={navigationMenuTriggerStyle()}>
                                HOME
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        to={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Explore more</NavigationMenuTrigger>
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
                                                Travel Social
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Login to expierence Latest Feature in Travel & Tourism Industry.
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem to="/login" title="Personalized Account">
                                    Personalized account only for you .
                                </ListItem>
                                <ListItem to="/login" title="Meet Ups">
                                    Meet Travel Enthusiast who Matches Your Aura & Excitements.
                                </ListItem>
                                <ListItem to="/login" title="Travel Reminder">
                                    Get Reminded about your upcoming trips.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/about" className={navigationMenuTriggerStyle()}>
                                About us
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/contact" className={navigationMenuTriggerStyle()}>
                                Contact us
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link to="/login" className={navigationMenuTriggerStyle()}>
                                Login
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
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
