import blogData from '../JSON/BlogsData.json';

const BlogsDataRight = () => {
    return (
        <>
        <div className="BlogsContainerRight w-full md:w-[30%] p-4 md:p-6 lg:p-10 bg-gray-400 h-[calc(100vh-5rem)] md:h-screen relative">
            <div className="absolute inset-y-0 left-0 w-3 bg-gray-300"></div>
            <div className="h-full overflow-y-auto pr-4 pl-7 scrollbar-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-6 lg:gap-8">
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
                                    <a href={blog.url} className="block w-full bg-black text-white text-center py-2 hover:bg-gray-800 transition duration-300" target="_blank" rel="noopener noreferrer">Read more</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className='bg-red-600'>

        </div>
        
        </>
    )
}

export default BlogsDataRight

