import Categories from "../components/ui/Categories";
import CouponsAndDeals from "../components/ui/CouponsAndDeals";
import Destination from "../components/ui/Destinations";
import ImageGallery from "../components/ui/ImageGallery";
import Pre_login_menubar from "../components/ui/pre_login_menubar";
import ExplorePlaces from '../components/ui/ExplorePlaces';
import Scrollslider from "../components/ui/scrollslider";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Carousel from "../components/ui/Carousel";



const Seasonal_destinations = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="Seasonal_destinations">
      <Pre_login_menubar />
      <Scrollslider/>
      <Destination data-aos="fade-up" />
      <ImageGallery data-aos="fade-up" />
      <Carousel/>
      <Categories data-aos="fade-up" />
      <ExplorePlaces data-aos="fade-up" />
      <CouponsAndDeals data-aos="fade-up" />
    </div>
  );
};

export default Seasonal_destinations;
