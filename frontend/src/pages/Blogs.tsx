import { useEffect } from "react";
// import BlogLandingTemplate from "../components/Developer/support/BlogLandingTemplate";
import BlogsData from "../components/Developer/main/BlogsData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Scrollslider from "../components/Developer/main/scrollslider";
import ScrollDownButton from "../components/Developer/main/ScrollDownButton";
import Footer from "../components/Developer/support/Footer";
import { NavigationMenuDemo } from "../components/Shadcn/main/NavigationMenu";
import BlogsLanding from "../components/Developer/main/BlogsLanding";



const Blogs = () => {

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />
      {/* <BlogLandingTemplate data-aos="fade-up" /> */}
      <BlogsLanding/>
      <ScrollDownButton />
      <BlogsData />
      <Footer color={undefined} />

    </>
  )
};

export default Blogs;
