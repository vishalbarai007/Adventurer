import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { Link } from "react-router-dom";

import { useAuth } from "../../../Contexts/AuthContext";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

interface NavigationProps {
  isOpen: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isOpen }) => {
  const { authState } = useAuth();

  const menuItems = [
    { label: "Home", link: "/welcome" },
    { label: "Blogs", link: "/blogs" },
    { label: "Destinations", link: "/destinations" },
    { label: "About us", link: "/about" },
    { label: "Contact us", link: "/contact" },
    ...(authState === 'authenticated'
      ? [{ label: "Dashboard", link: "/explore" }]
      : [{ label: "Signup/SignIn", link: "/login" }]),
  ];

  return (
    <motion.ul
      variants={variants}
      className={`menu_items m-0 p-6 absolute top-[100px] w-[280px] ${isOpen ? "block" : "hidden"}`}
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
};
