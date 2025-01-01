import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "../../Shadcn/support/pre_homepage_parallax";
// import "./styles.css";

export default function App() {
  return (
    <ParallaxProvider>
      <AdvancedBannerTop />
      {/* <div className="center full">
        <h1 className="headline gray">Let's gooooo.</h1>
      </div> */}
    </ParallaxProvider>
  );
}
