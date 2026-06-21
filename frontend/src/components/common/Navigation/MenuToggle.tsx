import { motion, SVGMotionProps } from "framer-motion";
import { RefAttributes, MouseEventHandler } from "react";
import { JSX } from "react/jsx-runtime";

const Path = (
  props: JSX.IntrinsicAttributes & SVGMotionProps<SVGPathElement> & RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="#f3ebff"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: MouseEventHandler<HTMLButtonElement>;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => (
  <button
    onClick={toggle}
    className="outline-none border-none select-none cursor-pointer absolute top-[18px] left-[28px] w-[50px] h-[50px] rounded-full bg-transparent"
  >    <svg width="23" height="23" viewBox="0 0 23 23">
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
