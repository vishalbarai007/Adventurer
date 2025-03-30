import Scrollslider from '../components/Developer/main/scrollslider'
import Parallax from '../components/Developer/main/Parallax'
import Footer from '../components/Developer/support/Footer'
// import ExplorePlaces from '../components/Developer/main/ExploreAdventurers'
// import Carousel from '../components/Shadcn/main/Carousel'
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu'
import Preloginlanding from '../components/Developer/main/Pre-login-landing'
import { AnimatedTestimonialsDemo } from '../components/Shadcn/main/AnimatedTestimonialsDemo'
import { InfiniteMovingCardsDemo } from '../components/Developer/main/InfiniteMovingCardsDemo'
import { FeaturesSectionDemo } from '../components/Shadcn/main/FeatureSectiondemo'
import CounterSection from '../components/Developer/main/Counter'
// import { MultiStepLoaderDemo } from '../components/Shadcn/main/MultiStepLoaderDemo'
// import ChatBot from '../components/Developer/main/ChatBot'


const Pre_login_homepage = () => {
  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />
      <Parallax />
      <Preloginlanding/>
      <FeaturesSectionDemo/>
      {/* <ChatBot/> */}
      {/* blogs features */}
      {/* <Carousel /> */}
      {/* <ExplorePlaces /> */}
      {/* animated modals */}
      <InfiniteMovingCardsDemo/>
      <CounterSection/>
      <AnimatedTestimonialsDemo/>
      {/* <MultiStepLoaderDemo/> */}
      <Footer color={undefined} />
    </>
  )
}

export default Pre_login_homepage