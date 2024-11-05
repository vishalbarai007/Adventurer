import blogData from '../JSON/BlogsData.json'; // Adjust the path based on your directory structure


const BlogsDataLeft = () => {
  return (
    <>
     <div className="BlogsContainerleft w-[70%] bg-gray-100 p-10">
          <div className="h-fit grid grid-cols-4 gap-8">
            {blogData.map((blog, index) => (
              <div key={index} className="blog-item relative bg-white shadow-lg rounded-lg overflow-hidden">

                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col justify-between h-full">
                  <p className="text-gray-600 bg-green-600 rounded-full w-fit p-3 mt-2 text-sm">{blog.topic}</p>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">{blog.description}</p>
                  <p className='text-gray-600 mt-2 text-sm text-right'>{blog.date}</p>              <a href={blog.url} className="mt-auto bg-black text-black hover:underline" target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </>
  )
}

export default BlogsDataLeft
