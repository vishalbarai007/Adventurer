// import { useState } from 'react';
import blogData from '../../JSON/BlogsData.json';
import BlogModal from './BlogModal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogsDataLeft = () => {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/blog') // Your Flask backend's endpoint
      .then((response) => {
        console.log("Fetched data:", response.data); // Log data for debugging
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any errors
        setLoading(false);
      });
  }, []);
  

  

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Firestore Data</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

  return (
    <div className="BlogsContainerLeft w-full md:w-[70%] bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {blogData.map((blog, index) => (
          <div
            key={index}
            className="blog-item bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                  {blog.topic}
                </span>
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {blog.shortDes}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-2 text-right">
                  {blog.date}
                </p>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="block w-full bg-black text-white text-center py-2 hover:bg-gray-800 transition duration-300"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <BlogModal
          image={selectedBlog.image}
          title={selectedBlog.title}
          author={selectedBlog.author}
          topic={selectedBlog.topic}
          description={selectedBlog.description}
          date={selectedBlog.date}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </div>
  );
};

export default BlogsDataLeft;
