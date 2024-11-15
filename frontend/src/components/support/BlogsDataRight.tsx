
import blogData from '../JSON/BlogsData.json'; // Adjust the path based on your directory structure


const BlogsDataRight = () => {
    return (
        <>
            <div className="BlogsContainerRight mt-5 w-[30%] p-10 bg-gray-400 overflow-y-scroll h-screen scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <div className="h-fit grid grid-cols-1 gap-8">
                    {blogData.map((blog, index) => (
                        <div key={index} className="blog-item relative bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-5 flex flex-col justify-between h-full">
                                <p className="text-gray-600 bg-green-600 rounded-full w-fit p-3 mt-2 text-sm">{blog.topic}</p>
                                <h3 className="text-lg font-semibold">{blog.title}</h3>
                                <p className="text-gray-600 mt-2 text-sm">{blog.description}</p>
                                <p className="text-gray-600 mt-2 text-sm text-right">{blog.date}</p>
                                <a href={blog.url} className="mt-auto bg-black text-white hover:underline" target="_blank" rel="noopener noreferrer">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </>
    )
}

export default BlogsDataRight
