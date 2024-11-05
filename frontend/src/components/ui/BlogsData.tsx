import BlogsDataLeft from "../support/BlogsDataLeft"
import BlogsDataRight from "../support/BlogsDataRight"


const BlogsData = () => {
  return (
    <>
      <div className='BlogsContainer flex'>
        <BlogsDataLeft/>
        <BlogsDataRight/>
      </div>
    </>
  )
}

export default BlogsData;
