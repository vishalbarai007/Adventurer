import Scrollslider from '../components/Developer/main/scrollslider'
import Parallax from '../components/Developer/main/Parallax'
import Footer from '../components/Developer/support/Footer'
import ExplorePlaces from '../components/Developer/main/ExploreAdventurers'
import Carousel from '../components/Shadcn/main/Carousel'
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu'
import Preloginlanding from '../components/Developer/main/Pre-login-landing'
import { AnimatedTestimonialsDemo } from '../components/Shadcn/main/AnimatedTestimonialsDemo'
import { InfiniteMovingCardsDemo } from '../components/Developer/main/InfiniteMovingCardsDemo'
import ChatBot from '../components/Developer/main/ChatBot'


const Pre_login_homepage = () => {
  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />
      <Parallax />
      <Preloginlanding/>
      <ChatBot/>
      {/* blogs features */}
      <Carousel />
      <ExplorePlaces />
      {/* animated modals */}
      <InfiniteMovingCardsDemo/>
      <AnimatedTestimonialsDemo/>
      <Footer color={undefined} />
    </>
  )
}

export default Pre_login_homepage