import { ParallaxProvider } from "react-scroll-parallax";

// import { AdvancedBannerTop } from "../../Shadcn/support/pre_homepage_parallax";
import AdventurerParallax from "./Parallax/AdventurerParallax";
// import "./styles.css";

export default function App() {
  return (
    <ParallaxProvider>
      {/* <AdvancedBannerTop /> */}
      <AdventurerParallax/>
     
    </ParallaxProvider>
  );
}
