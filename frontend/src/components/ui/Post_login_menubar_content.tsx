import { AiFillHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { FiSend, FiCompass, FiPlusSquare } from "react-icons/fi";
import { MdOutlineDashboard, MdMovieCreation } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Post_login_menubar_content = () => {
  const navitems = [
    {
      id: "1",
      icon: <AiFillHome size={24} />,
      item: "Home",
    },
    {
      id: "2",
      icon: <AiOutlineSearch size={24} />,
      item: "Search",
    },
    {
      id: "3",
      icon: <FiCompass size={24} />,
      item: "Explore",
    },
    {
      id: "4",
      icon: <MdMovieCreation size={24} />,
      item: "Reels",
    },
    {
      id: "5",
      icon: <FiSend size={24} />,
      item: "Messages",
    },
    {
      id: "6",
      icon: <AiOutlineHeart size={24} />,
      item: "Notifications",
    },
    {
      id: "7",
      icon: <FiPlusSquare size={24} />,
      item: "Create",
    },
    {
      id: "8",
      icon: <MdOutlineDashboard size={24} />,
      item: "Dashboard",
    },
    {
      id: "9",
      icon: <FaUserCircle size={24} />,
      item: "Profile",
    },
  ];

  return (
    <div className="w-full h-full text-white flex flex-col gap-8 p-4">
      {navitems.map((nav) => (
        <div
          key={nav.id}
          className="flex items-center gap-4 cursor-pointer hover:text-gray-400"
        >
          {nav.icon}
          <span className="text-lg">{nav.item}</span>
        </div>
      ))}
    </div>
  );
};

export default Post_login_menubar_content;
