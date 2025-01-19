import BlogsDataLeft from "../support/BlogsDataLeft"
import BlogsDataRight from "../support/BlogsDataRight"

const BlogsData = () => {
  return (
    <div className='BlogsContainer flex flex-col md:flex-row' id="target-section">
      <BlogsDataLeft />
      <BlogsDataRight />
    </div>
  )
}

export default BlogsData;

