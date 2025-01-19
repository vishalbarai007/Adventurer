import React from 'react';

interface BlogModalProps {
  image: string;
  title: string;
  author: string;
  topic: string;
  description: string;
  date: string;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ image, title, author, topic, description, date, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[60%] lg:w-[80%] lg:h-[80vh] p-10 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-3xl text-gray-600 rounded-full hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
        <div className="mb-4">
          <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mb-2">{topic}</span>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-1"><strong>Author:</strong> {author}</p>
          <p className="text-gray-600 text-sm mb-1"><strong>Date:</strong> {date}</p>
        </div>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default BlogModal;
