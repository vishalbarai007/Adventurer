import Scrollslider from '../components/Developer/main/scrollslider'
// import Pre_login_menubar from '../components/Shadcn/main/pre_login_menubar'
import Parallax from '../components/Developer/main/Parallax'
import Pre_login_homepage_content from '../components/Developer/support/Pre_login_homepage_content'
import Pre_homepage_cards from '../components/Developer/support/Pre_homepage_cards'
import CouponsAndDeals from '../components/Developer/main/CouponsAndDeals'
import Footer from '../components/Developer/support/Footer'
import ExplorePlaces from '../components/Developer/main/ExploreAdventurers'
import Carousel from '../components/Shadcn/main/Carousel'
import FindYourWay from '../components/Developer/main/FindYourWay'
import { NavigationMenu } from '../components/Shadcn/ui/navigation-menu'
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu'
import Preloginlanding from '../components/Developer/main/Pre-login-landing'
// import BlogsLanding from '../components/Developer/main/BlogsLanding'
// import { ModeToggle } from '../components/Shadcn/support/PostLoginHome/modetoggle'
// import PostLoginHomepage from './Post_Login_Homepage'



const Pre_login_homepage = () => {
  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />

      {/* <BlogsLanding /> */}
      <Parallax />
      <Preloginlanding/>
      {/* <Pre_login_menubar /> */}

      {/* <PostLoginHomepage/> */}
      {/* <ModeToggle/> */}
      <FindYourWay />
      <Pre_homepage_cards />
      <NavigationMenu />

      <Carousel />
      <CouponsAndDeals />
      <ExplorePlaces />
      <NavigationMenu />

      <Footer color={undefined} />




    </>
  )
}

export default Pre_login_homepage