import { useEffect } from "react";
import BlogLandingTemplate from "../components/ui/BlogLandingTemplate";
import BlogsData from "../components/ui/BlogsData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PreLoginMenuBar from "../components/ui/pre_login_menubar";
import Scrollslider from "../components/ui/scrollslider";
import ScrollDownButton from "../components/ui/ScrollDownButton";
import Footer from "../components/ui/Footer";



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
