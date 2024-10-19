import { Carousel } from "../components/support/carousel";
import Categories from "../components/ui/Categories";
import Destination from "../components/ui/Destinations";
import ImageGallery from "../components/ui/ImageGallery";
// import Pre_login_menubar from "../components/ui/pre_login_menubar";

const Seasonal_destinations = () => {
  return (
    <div>

    <Destination/>
    {/* <Pre_login_menubar/> */}
    <Carousel />
    <ImageGallery/>
    <Categories/>

    </div>
  )
}

export default Seasonal_destinations;