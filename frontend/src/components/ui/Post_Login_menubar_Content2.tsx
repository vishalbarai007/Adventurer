import { FiCompass} from "react-icons/fi";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";


const Post_Login_menubar_Content2 = () => {
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
  

export default Post_Login_menubar_Content2
