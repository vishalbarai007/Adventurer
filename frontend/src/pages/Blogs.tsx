import { useEffect } from "react";
// import BlogLandingTemplate from "../components/Developer/support/BlogLandingTemplate";
import BlogsData from "@/components/blog/BlogsData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Scrollslider from "@/components/home/ScrollSlider";
import ScrollDownButton from "@/components/common/ScrollDownButton";
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import BlogsLanding from "@/components/blog/BlogsLanding";



const Blogs = () => {

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <>
            <NavigationMenuDemo />
            <Scrollslider />
            {/* <BlogLandingTemplate data-aos="fade-up" /> */}
            <BlogsLanding />
            <ScrollDownButton />
            <BlogsData />
            <Footer color={undefined} />

        </>
    )
};

export default Blogs;
