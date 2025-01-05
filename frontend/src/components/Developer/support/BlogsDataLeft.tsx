import blogData from '../../JSON/BlogsData.json';

const BlogsDataLeft = () => {
  return (
    <div className="BlogsContainerLeft w-full md:w-[70%] bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {blogData.map((blog, index) => (
          <div key={index} className="blog-item bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mb-2">{blog.topic}</span>
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{blog.description}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-2 text-right">{blog.date}</p>
                <a 
                  href={blog.url} 
                  className="block w-full bg-black text-white text-center py-2 hover:bg-gray-800 transition duration-300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsDataLeft;

