import { useEffect } from "react";
import BlogLandingTemplate from "../components/Developer/main/BlogLandingTemplate";
import BlogsData from "../components/Developer/main/BlogsData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PreLoginMenuBar from "../components/Shadcn/main/pre_login_menubar";
import Scrollslider from "../components/Developer/main/scrollslider";
import ScrollDownButton from "../components/Developer/main/ScrollDownButton";
import Footer from "../components/Developer/support/Footer";



const Blogs = () => {

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
   <>
      <PreLoginMenuBar/>
      <Scrollslider/>
      <BlogLandingTemplate data-aos = "fade-up"/>
      <ScrollDownButton/>
      <BlogsData/>
      <Footer color={undefined}/>

   </> 
  )
};

export default Blogs;
