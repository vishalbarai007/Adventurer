import Scrollslider from '@/components/home/ScrollSlider'
import Parallax from '@/components/parallax/Parallax'
import Footer from '@/components/common/Footer'
import { NavigationMenuDemo } from '@/components/common/NavigationMenu'
import { InfiniteMovingCardsDemo } from '@/components/home/InfiniteMovingCardsDemo'
import HeroCTA from '@/components/home/HeroCTA'
import HowItWorks from '@/components/home/HowItWorks'
import AdventureGallery from '@/components/destinations/AdventureGallery'
import AppShowcase from '@/components/home/AppShowcase'
import StatsCounter from '@/components/home/StatsCounter'
import FeatureShowcase from '@/components/home/FeatureShowcase'
import useSEO from '@/hooks/useSEO'

// const FeatureShowcase = lazy(() => import('@/components/home/FeatureShowcase'))

const Pre_login_homepage = () => {
  useSEO({
    title: 'Welcome to Adventurer | Ultimate Trek & Travel Platform',
    description: 'Adventurer connects passionate travelers with local verified trekking guides and organizers. Enjoy safe escrow payments and unforgettable hikes.',
    keywords: 'adventure travel, trekking routes, travel escrows, local tour guides, hiking platform'
  });

  return (
    <>
      <NavigationMenuDemo />
      <Scrollslider />
      <Parallax />
      <HeroCTA />
      {/* <Preloginlanding /> */}
      <HowItWorks />
      {/* <Suspense fallback={<div className="flex justify-center items-center py-24 bg-[#000a05]"><LargeSuccessLoader /></div>}> */}
      <FeatureShowcase />
      {/* </Suspense> */}
      <AdventureGallery />
      <InfiniteMovingCardsDemo />
      <AppShowcase />
      <StatsCounter />
      <Footer color={undefined} />
    </>
  )
}

export default Pre_login_homepage