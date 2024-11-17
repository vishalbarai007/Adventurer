import { FaArrowCircleDown } from "react-icons/fa";

const ScrollDownButton: React.FC = () => {
  // Scroll to the target section
  const handleScroll = () => {
    const targetSection = document.getElementById("target-section");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="relative group absolute bottom-10 left-[50%] w-14 h-14 rounded-full bg-transparent hover:bg-[#1F3D3B] flex items-center justify-center shadow-lg border-2 border-dotted border-black transition duration-300 transform hover:scale-110 animate-bounce-slow"
    >
      <FaArrowCircleDown className="h-8 w-8 text-[#EADED0]" />

      {/* Label that appears on hover */}
      <span className="absolute left-[110%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap px-2 py-1 bg-white text-black text-sm border border-dotted border-black rounded-md">
        Scroll Down
      </span>
    </button>
  );
};

export default ScrollDownButton;
