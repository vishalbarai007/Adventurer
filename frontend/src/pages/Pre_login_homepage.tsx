import useSEO from '@/hooks/useSEO';
import { LandingNavbar, HeroSection, FeaturedDestinations } from '@/components/landing/LandingSections';
import { DestinationHighlight, StatisticsSection, VideoShowcase } from '@/components/landing/LandingSections2';
import { LifestyleGallery, TestimonialsGrid, FAQSection } from '@/components/landing/LandingSections3';
import { AdventuresGallery, FinalCTA, LandingFooter } from '@/components/landing/LandingSections4';

const Pre_login_homepage = () => {
  useSEO({
    title: 'ADVENTURER | Ultimate Trek & Travel Platform',
    description: 'Adventurer connects passionate travelers with local verified trekking guides and organizers. Enjoy safe escrow payments and unforgettable hikes.',
    keywords: 'adventure travel, trekking routes, travel escrows, local tour guides, hiking platform, premium travel'
  });

  return (
    <div className="bg-[#FFFFFF] min-h-screen font-jakarta w-full overflow-x-hidden">
      <LandingNavbar />
      <HeroSection />
      <FeaturedDestinations />
      <DestinationHighlight />
      <StatisticsSection />
      <VideoShowcase />
      <LifestyleGallery />
      <TestimonialsGrid />
      <FAQSection />
      <AdventuresGallery />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default Pre_login_homepage;