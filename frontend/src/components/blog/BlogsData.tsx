import BlogsDataLeft from "@/components/blog/BlogsDataLeft"
import BlogsDataRight from "@/components/blog/BlogsDataRight"

const BlogsData = () => {
  return (
    <div className='BlogsContainer flex flex-col md:flex-row' id="target-section">
      <BlogsDataLeft />
      <BlogsDataRight />
    </div>
  )
}

export default BlogsData;

