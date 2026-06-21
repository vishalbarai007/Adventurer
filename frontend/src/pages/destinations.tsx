import Categories from "@/components/destinations/Categories";
import CouponsAndDeals from "@/components/destinations/CouponsAndDeals";
import Destination from "@/components/destinations/Destinations";
import ImageGallery from "@/components/destinations/ImageGallery";
// import Pre_login_menubar from "../components/Shadcn/main/pre_login_menubar";
// import ExplorePlaces from '@/components/destinations/ExplorePlaces';
import Scrollslider from "@/components/home/ScrollSlider";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from "@/components/home/Carousel";
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import ExploreAdventures from "@/components/destinations/ExploreAdventures";



const Seasonal_destinations = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="Seasonal_destinations bg-[#EADED0]">
      {/* <Pre_login_menubar /> */}
      <NavigationMenuDemo/>
      <Scrollslider/>
      <Destination data-aos="fade-up" />
      <ImageGallery data-aos="fade-up" />
      <Carousel/>
      <Categories data-aos="fade-up" />
      {/* <ExplorePlaces data-aos="fade-up" /> */}
      <ExploreAdventures data-aos="fade-up" />
      <CouponsAndDeals data-aos="fade-up" />
      <Footer color={undefined}/>

    </div>
  );
};

export default Seasonal_destinations;
