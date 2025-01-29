import BlogsDataLeft from "../support/BlogsDataLeft"
import BlogsDataRight from "../support/BlogsDataRight"

const BlogsData = () => {
  return (
    <div className='BlogsContainer flex flex-col md:flex-row' id="target-section">
      <BlogsDataLeft setSelectedBlog={function (_blog: any): void {
        throw new Error("Function not implemented.");
      } } />
      <BlogsDataRight />
    </div>
  )
}

export default BlogsData;

