import { Carousel } from "../components/support/carousel";
import Categories from "../components/ui/Categories";
import CouponsAndDeals from "../components/ui/CouponsAndDeals";
import Destination from "../components/ui/Destinations";
import ImageGallery from "../components/ui/ImageGallery";
import Pre_login_menubar from "../components/ui/pre_login_menubar";
import ExplorePlaces from '../components/ui/ExplorePlaces'


const Seasonal_destinations = () => {
  return (
    <div>

    <Destination/>
    <Pre_login_menubar/>
    <Carousel />
    <ImageGallery/>
    <Categories/>
    <ExplorePlaces/>
    <CouponsAndDeals/>

    </div>
  )
}

export default Seasonal_destinations;