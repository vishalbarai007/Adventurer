import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { Link } from "react-router-dom";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItems = [
  { label: "Home", link: "/pre-login-homepage" },
  { label: "Blogs", link: "/blogs" },
  { label: "Destinations", link: "/seasonal_destinations" },
  { label: "About us", link: "/about" },
  { label: "Contact us", link: "/contact" },
  { label: "Signup/SignIn", link: "/login" },
];

interface NavigationProps {
  isOpen: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen }) => (
  <motion.ul
    variants={variants}
    className={`menu_items ${isOpen ? "block" : "hidden"}`}
  >
    {menuItems.map((item, i) => (
      <Link
        to={item.link}
        key={i}
        className={`menu_link ${!isOpen ? "pointer-events-none opacity-50" : ""}`}
      >
        <MenuItem i={i} label={item.label} />
      </Link>
    ))}
  </motion.ul>
);
