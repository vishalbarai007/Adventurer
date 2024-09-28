import { motion, useScroll, useSpring } from "framer-motion";


export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div className="progress-bar z-50 fixed top-0 left-0 right-0 h-3" style={{ scaleX }} />
    </>
  );
}
