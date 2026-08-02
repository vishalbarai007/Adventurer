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

const BlogsDataLeft: React.FC = () => {
  const [selectedBlog, setSelectedBlogState] = useState<BlogData | null>(null)
  const [data, setData] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/blog`)
      .then((response) => {
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
    <div className="flex justify-center items-center py-20 w-full lg:w-[68%]">
      <LargeSuccessLoader />
    </div>
  )

  return (
    <div className="w-full lg:w-[68%] font-jakarta">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-[#3A8DFF] font-bold text-xs uppercase tracking-wider block">Community Articles</span>
          <h2 className="text-2xl font-extrabold text-[#171717]">All Travel Articles</h2>
        </div>
        <span className="text-xs text-gray-500 font-bold bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
          {data.length} Stories Published
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((blog) => (
          <div key={blog.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-[24px] overflow-hidden flex flex-col group transition-all duration-300">
            <div className="relative overflow-hidden h-48 bg-gray-100">
              <img
                src={blog.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"}
                alt={blog.Title || "Blog Image"}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#111827] text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {blog.Meta_Keys ? blog.Meta_Keys.split(",")[0] : "Trekking"}
              </span>
            </div>
            
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={13} />
                    {blog.date ? blog.date : "Recent"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageSquare size={13} />
                    {blog.comments?.length || 0} Comments
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-[#171717] line-clamp-2 hover:text-[#3A8DFF] transition-colors mb-2 leading-snug">
                  {blog.Title || "Untitled Blog"}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-3 mb-2 font-medium leading-relaxed">
                  {blog.Short_Desc || "Explore this amazing trekking adventure guide and discover key insights from our team."}
                </p>
              </div>

              <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400">
                  By {blog.Admin_ID || "Guide Team"}
                </span>

                <button
                  onClick={() => setSelectedBlogState(blog)}
                  className="bg-[#111827] hover:bg-[#1F2937] text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  Read Story
                  <FiArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBlog && (
        <BlogModal
          id={selectedBlog.id}
          image={selectedBlog.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"}
          title={selectedBlog.Title || "Untitled Blog"}
          author={selectedBlog.Admin_ID || "Unknown Author"}
          topic={selectedBlog.Meta_Keys ? selectedBlog.Meta_Keys.split(",")[0] : "No Topic"}
          description={selectedBlog.Description || "No description available"}
          date={selectedBlog.date ? selectedBlog.date : "Recent"}
          comments={selectedBlog.comments}
          onClose={() => setSelectedBlogState(null)}
          onAddComment={handleAddCommentToBlog}
        />
      )}
    </div>
  )
}

export default BlogsDataLeft
