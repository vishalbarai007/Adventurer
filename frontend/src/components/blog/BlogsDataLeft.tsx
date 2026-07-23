import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import BlogModal from "@/components/blog/BlogModal"
import LargeSuccessLoader from "@/components/common/Loader"
import { FiCalendar, FiArrowRight, FiMessageSquare } from "react-icons/fi"

import { API_BASE_URL } from "@/services/httpClient"

interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

interface BlogData {
  id: string;
  image?: string;
  Title?: string;
  Meta_Keys?: string;
  Short_Desc?: string;
  date?: string;
  Admin_ID?: string;
  Description?: string;
  comments?: Comment[];
  [key: string]: unknown;
}

const BlogsDataLeft: React.FC<{ setSelectedBlog?: (blog: BlogData) => void }> = () => {
  const [selectedBlog, setSelectedBlogState] = useState<BlogData | null>(null)
  const [data, setData] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blog`)
      .then((response) => {
        console.log("Fetched blog data:", response.data)
        const blogsArray = Object.values(response.data) as BlogData[]
        setData(blogsArray)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error)
        setLoading(false)
      })
  }, [])

  const handleAddCommentToBlog = (blogId: string, newComment: Comment) => {
    setData((prevData) =>
      prevData.map((blog) => {
        if (blog.id === blogId) {
          const updatedComments = [...(blog.comments || []), newComment];
          // Update selected blog as well if currently opened
          if (selectedBlog && selectedBlog.id === blogId) {
            setSelectedBlogState({
              ...selectedBlog,
              comments: updatedComments
            });
          }
          return {
            ...blog,
            comments: updatedComments,
          };
        }
        return blog;
      })
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center py-20 w-full md:w-[70%]">
      <LargeSuccessLoader />
    </div>
  )

  return (
    <div className="BlogsContainerLeft w-full md:w-[70%] bg-slate-50/50 p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Latest Adventures & Insights</h2>
        <p className="text-gray-500 mt-2">Discover stories, guides, and tips shared by our seasoned guides and adventurers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((blog) => (
          <div key={blog.id} className="blog-item bg-white border border-gray-100 shadow-md hover:shadow-xl rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="relative overflow-hidden h-48 bg-gray-100">
              <img
                src={blog.image || "https://via.placeholder.com/300"}
                alt={blog.Title || "Blog Image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="mb-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-block bg-green-50 text-green-700 font-semibold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {blog.Meta_Keys ? blog.Meta_Keys.split(",")[0] : "Explore"}
                  </span>
                  
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <FiMessageSquare size={13} />
                    {blog.comments?.length || 0}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 hover:text-green-700 transition-colors mb-2">{blog.Title || "Untitled Blog"}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-2">{blog.Short_Desc || "No description available."}</p>
              </div>

              <div className="mt-auto border-t border-gray-50 pt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <FiCalendar size={13} />
                  {blog.date ? blog.date : "Unknown Date"}
                </span>

                <button
                  onClick={() => setSelectedBlogState(blog)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-800 transition-colors group/btn"
                >
                  Read More
                  <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <BlogModal
          id={selectedBlog.id}
          image={selectedBlog.image || "https://via.placeholder.com/300"}
          title={selectedBlog.Title || "Untitled Blog"}
          author={selectedBlog.Admin_ID || "Unknown Author"}
          topic={selectedBlog.Meta_Keys ? selectedBlog.Meta_Keys.split(",")[0] : "No Topic"}
          description={selectedBlog.Description || "No description available"}
          date={selectedBlog.date ? selectedBlog.date : "Unknown Date"}
          comments={selectedBlog.comments}
          onClose={() => setSelectedBlogState(null)}
          onAddComment={handleAddCommentToBlog}
        />
      )}
    </div>
  )
}

export default BlogsDataLeft
