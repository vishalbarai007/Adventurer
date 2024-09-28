import { motion, SVGMotionProps } from "framer-motion";
import { RefAttributes, MouseEventHandler } from "react";
import { JSX } from "react/jsx-runtime";

// Define the Path component with correct props
const Path = (
  props: JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#f3ebff" // Updated the stroke color
    strokeLinecap="round"
    {...props}
  />
);

// Define the MenuToggle props interface
interface MenuToggleProps {
  toggle: MouseEventHandler<HTMLButtonElement>; // Type for the toggle function
  
}

// Define the MenuToggle component with typed props
export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button onClick={toggle} className="menu_toggle_button">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
      />
    </svg>
  </button>
);
