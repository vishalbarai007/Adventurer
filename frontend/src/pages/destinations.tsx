import Categories from "../components/Developer/main/Categories";
import CouponsAndDeals from "../components/Developer/main/CouponsAndDeals";
import Destination from "../components/Developer/main/Destinations";
import ImageGallery from "../components/Developer/main/ImageGallery";
// import Pre_login_menubar from "../components/Shadcn/main/pre_login_menubar";
// import ExplorePlaces from '../components/Developer/main/ExplorePlaces';
import Scrollslider from "../components/Developer/main/scrollslider";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from "../components/Shadcn/main/Carousel";
import Footer from "../components/Developer/support/Footer";
import { NavigationMenuDemo } from "../components/Shadcn/main/NavigationMenu";
import ExploreAdventures from "../components/Developer/main/ExploreAdventures";



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
