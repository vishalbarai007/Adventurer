import AboutUsTitle from "../components/Developer/support/AboutUsTitle";
import AboutUsLeftContent from "../components/Developer/support/AboutUsLeftContent";
import AboutUsContentRight from "../components/Developer/support/AboutUsContentRight";
import AboutUsFeatures from "../components/Developer/support/AboutUsFeatures";
// import PreLoginMenuBar from "../components/Shadcn/main/pre_login_menubar";
import Footer from "../components/Developer/support/Footer";
import { NavigationMenuDemo } from "../components/Shadcn/main/NavigationMenu";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[rgb(149,113,79)] min-h-screen">
      <NavigationMenuDemo />

      <div className="container mx-auto px-6 py-16">
        {/* Title Section */}
        <AboutUsTitle />
      </div>
      {/* Content Section */}
      <div className="mt-12 px-20 grid md:grid-cols-2 gap-10">
        {/* Right Section - Image */}
        <AboutUsContentRight />
        {/* Left Section - Description */}
        <AboutUsLeftContent />
      </div>

      <AboutUsFeatures />

      <Footer color={undefined} />
    </div>
  );
};

export default AboutUs;
