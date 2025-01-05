import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../support/useDimension";
import { MenuToggle } from "../support/MenuToggle";
import { Navigation } from "../support/Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const PreLoginMenuBar = () => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  // useCycle provides a toggle function to switch between 'open' and 'closed' states
  const [isOpen, toggleOpen] = useCycle(false, true);

  // Additional toggleMenu function
  const toggleMenu = () => toggleOpen(); // Or you can use: setIsOpen((prev) => !prev)

  return (
    <motion.nav
    className="absolute top-0 left-0 bottom-0 w-[300px]"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      style={{ position: "fixed", zIndex: 2 }}
    >
      <motion.div className="background" variants={sidebar} />

      <MenuToggle toggle={toggleMenu} />
      {isOpen && <Navigation isOpen={isOpen} />}
    </motion.nav>
  );
};

export default PreLoginMenuBar;
