import { useEffect } from "react";
import BlogLandingTemplate from "../components/ui/BlogLandingTemplate";
import BlogsData from "../components/ui/BlogsData";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Blogs = () => {

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
   <>
      <BlogLandingTemplate data-aos = "fade-up"/>
      <BlogsData/>

   </> 
  )
};

export default Blogs;
