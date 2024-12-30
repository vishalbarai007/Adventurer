import AboutUsTitle from "../components/support/AboutUsTitle";
import AboutUsLeftContent from "../components/support/AboutUsLeftContent";
import AboutUsContentRight from "../components/support/AboutUsContentRight";
import AboutUsFeatures from "../components/support/AboutUsFeatures";
import PreLoginMenuBar from "../components/ui/pre_login_menubar";
import Footer from "../components/ui/Footer";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[rgb(149,113,79)] min-h-screen">
      <PreLoginMenuBar/>
      <div className="container mx-auto px-6 py-16">
        {/* Title Section */}
        <AboutUsTitle/>

        {/* Content Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Right Section - Image */}
         <AboutUsContentRight/>
          {/* Left Section - Description */}
          <AboutUsLeftContent/>

        </div>

        {/* Features Section */}
        <AboutUsFeatures/>
      </div>
      <Footer color={undefined}/>
    </div>
  );
};

export default AboutUs;
