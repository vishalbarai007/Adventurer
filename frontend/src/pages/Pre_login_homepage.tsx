import Scrollslider from '../components/Developer/main/scrollslider'
import Parallax from '../components/Developer/main/Parallax'
import Footer from '../components/Developer/support/Footer'
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu'
import Preloginlanding from '../components/Developer/main/Pre-login-landing'
// import { AnimatedTestimonialsDemo } from '../components/Shadcn/main/AnimatedTestimonialsDemo'
import { InfiniteMovingCardsDemo } from '../components/Developer/main/InfiniteMovingCardsDemo'
import { FeaturesSectionDemo } from '../components/Shadcn/main/FeatureSectiondemo'
import CounterSection from '../components/Developer/main/Counter'


const Pre_login_homepage = () => {
  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />
      <Parallax />
      <Preloginlanding/>
      <FeaturesSectionDemo/>
      <InfiniteMovingCardsDemo/>
      <CounterSection/>
      {/* <AnimatedTestimonialsDemo/> */}

      <Footer color={undefined} />
    </>
  )
}

export default Pre_login_homepage