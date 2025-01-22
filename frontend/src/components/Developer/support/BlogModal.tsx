import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogModalProps {
  image: string;
  title: string;
  author: string;
  topic: string;
  description: string;
  date: string;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({
  image,
  title,
  author,
  topic,
  description,
  date,
  onClose,
}) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for animation before closing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <AnimatePresence>
        {!isClosing && (
          <motion.div
            className="bg-white w-[90%] md:w-[60%] lg:w-[80%] lg:h-[80vh] p-10 rounded-lg shadow-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={`absolute top-3 right-3 text-3xl text-gray-600 rounded-full hover:text-gray-900 transition-transform duration-300 ${
                isClosing ? "rotate-180" : ""
              }`}
              onClick={handleClose}
            >
              ✕
            </button>
            <div className="flex justify-between gap-2">
              <img
                src={image}
                alt={title}
                className="w-[50%] h-60 object-cover rounded-lg mb-4"
              />
            </div>
            <div className="mb-4">
              <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                {topic}
              </span>
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                <strong>Author:</strong> {author}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <strong>Date:</strong> {date}
              </p>
            </div>
            <p className="text-gray-700 text-sm">{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogModal;
