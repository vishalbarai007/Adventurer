import { motion } from "framer-motion";
import { MenuItem } from "../support/MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItems = ["Home", "Signup", "Accounts", "Profile", "Settings"];

export const Navigation = () => (
  <motion.ul variants={variants}>
    {menuItems.map((item, i) => (
      <MenuItem i={i} key={i} label={item} />
    ))}
  </motion.ul>
);
