import { lazy, Suspense } from 'react'
import Scrollslider from '../components/Developer/main/scrollslider'
import Parallax from '../components/Developer/main/Parallax'
import Footer from '../components/Developer/support/Footer'
import { NavigationMenuDemo } from '../components/Shadcn/main/NavigationMenu'
import { InfiniteMovingCardsDemo } from '../components/Developer/main/InfiniteMovingCardsDemo'
import HeroCTA from '../components/Developer/main/HeroCTA'
import HowItWorks from '../components/Developer/main/HowItWorks'
import AdventureGallery from '../components/Developer/main/AdventureGallery'
import AppShowcase from '../components/Developer/main/AppShowcase'
import StatsCounter from '../components/Developer/main/StatsCounter'
import LargeSuccessLoader from '../components/Developer/support/Loader'

const FeatureShowcase = lazy(() => import('../components/Developer/main/FeatureShowcase'))

const Pre_login_homepage = () => {
  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />
      <Parallax />
      <HeroCTA />
      {/* <Preloginlanding /> */}
      <HowItWorks />
      <Suspense fallback={<div className="flex justify-center items-center py-24 bg-[#000a05]"><LargeSuccessLoader /></div>}>
        <FeatureShowcase />
      </Suspense>
      <AdventureGallery />
      <InfiniteMovingCardsDemo />
      <AppShowcase />
      <StatsCounter />
      <Footer color={undefined} />
    </>
  )
}

export default Pre_login_homepage