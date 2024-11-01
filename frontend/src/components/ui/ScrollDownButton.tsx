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
  className="absolute bottom-0 left-[50%] w-14 h-14 rounded-full bg-transparent hover:bg-blue-600 flex items-center justify-center shadow-lg border-2 border-dotted border-black transition duration-300 transform hover:scale-180 animate-bounce-slow"
>
  <FaArrowCircleDown className="h-8 w-8 text-white" />
</button>

  );
};

export default ScrollDownButton;
