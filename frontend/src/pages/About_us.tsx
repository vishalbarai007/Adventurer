import AboutUsTitle from "../components/support/AboutUsTitle";
import AboutUsLeftContent from "../components/support/AboutUsLeftContent";
import AboutUsContentRight from "../components/support/AboutUsContentRight";
import AboutUsFeatures from "../components/support/AboutUsFeatures";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#95714f] min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {/* Title Section */}
        <AboutUsTitle/>

        {/* Content Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {/* Left Section - Description */}
          <AboutUsLeftContent/>

          {/* Right Section - Image */}
         <AboutUsContentRight/>
        </div>

        {/* Features Section */}
        <AboutUsFeatures/>
      </div>
    </div>
  );
};

export default AboutUs;
