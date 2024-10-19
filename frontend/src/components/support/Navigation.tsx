import { motion } from "framer-motion";
import { MenuItem } from "../support/MenuItem";
import { Link } from "react-router-dom";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// const menuItems = ["Home", "Blogs", "About us", "Contact us", "SignUp/SignIn"];
const menuItems = [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Blogs",
          link: "/blogs",
        },
        {
          label: "Destinations",
          link: "/seasonal_destinations",
        },
        {
          label: "About us",
          link: "/about",
        },
        {
          label: "Contact us",
          link: "/contact",
        },
        {
          label: "Signup/SignIn",
          link: "/login",
        },
      ]


export const Navigation = () => (
  <motion.ul variants={variants}>
    {menuItems.map((item, i) => (
      <Link to={item.link} >
        <MenuItem i={i} key={i} label={item.label}  />
      </Link>
    ))}
  </motion.ul>
);
