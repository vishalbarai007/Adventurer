import { motion } from "framer-motion";

const variants = {
  open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
  closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

const colors = ["#E5E4E2", "#DCDBD8", "#D3D3CE", "#CACAC4", "#C1C1BA", "#C1C1BA"];

interface MenuItemProps {
  i: number;
  label: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ i, label }) => {
  const style1 = {
    border: `2px solid ${colors[i]}`,
    padding: `20px`,
    display: `flex`,
    justifyContent: `center`,
  };

  const style2 = {
    lineHeight: `0px`,
    fontSize: `20px`,
    color: `${colors[i]}`,
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-placeholder w-10 h-10 rounded-full flex mr-5" style={style1} />  
      <div className="text-placeholder rounded-sm w-[200] h-[20] flex" style={style1}>
        <label style={style2}>{label}</label>
      </div>
    </motion.li>
  );
};
