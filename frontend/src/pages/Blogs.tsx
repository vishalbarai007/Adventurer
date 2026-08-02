import { useEffect } from "react";
import BlogsData from "@/components/blog/BlogsData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import BlogsLanding from "@/components/blog/BlogsLanding";
import useSEO from "@/hooks/useSEO";

const Blogs = () => {
    useSEO({
      title: 'Blogs & Adventure Stories | Adventurer',
      description: 'Explore trekking guides, wilderness survival logs, gear reviews, and personal adventure stories shared by our globetrotting community.',
      keywords: 'trekking blogs, adventure logs, travel stories, hiking tips'
    });

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <div className="bg-[#F8F9FB] text-[#171717] min-h-screen font-jakarta">
            <NavigationMenuDemo />
            <div className="max-w-[1280px] mx-auto px-6 py-8">
                <BlogsLanding />
                <BlogsData />
            </div>
            <Footer color={undefined} />
        </div>
    )
};

export default Blogs;
