import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import BlogModal from "./BlogModal"
import LargeSuccessLoader from "./Loader"
// import blogData from '../../JSON/BlogsData.json';


const BlogsDataLeft: React.FC<{ setSelectedBlog: (blog: any) => void }> = ({ }) => {
  const [selectedBlog, setSelectedBlogState] = useState<any>(null)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog")
      .then((response) => {
        console.log("Fetched blog data:", response.data)
        // Convert the object of objects to an array of objects
        const blogsArray = Object.values(response.data)
        setData(blogsArray)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="font-bold " ><LargeSuccessLoader/></p>

  return (
    <div className="BlogsContainerLeft w-full md:w-[70%] bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {data.map((blog, index) => (
          <div key={index} className="blog-item bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img
              src={blog.image || "https://via.placeholder.com/300"}
              alt={blog.Title || "Blog Image"}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                  {blog.Meta_Keys ? blog.Meta_Keys.split(",")[0] : "No Topic"}
                </span>
                <h3 className="text-lg font-semibold mb-2">{blog.Title || "Untitled Blog"}</h3>
                <p className="text-gray-600 text-sm mb-2">{blog.Short_Desc || "No description available"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs mb-2 text-right">
                  {blog.date ? blog.date : "Unknown Date"}
                </p>
                <button
                  onClick={() => setSelectedBlogState(blog)}
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
          image={selectedBlog.image || "https://via.placeholder.com/300"}
          title={selectedBlog.Title || "Untitled Blog"}
          author={selectedBlog.Admin_ID || "Unknown Author"}
          topic={selectedBlog.Meta_Keys ? selectedBlog.Meta_Keys.split(",")[0] : "No Topic"}
          description={selectedBlog.Description || "No description available"}
          date={selectedBlog.date ? (selectedBlog.date) : "Unknown Date"}
          onClose={() => setSelectedBlogState(null)}
        />
      )}
    </div>
  )
}

export default BlogsDataLeft

