import BlogsDataLeft from "@/components/blog/BlogsDataLeft";
import BlogsDataRight from "@/components/blog/BlogsDataRight";

const BlogsData = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start font-jakarta" id="target-section">
      <BlogsDataLeft />
      <BlogsDataRight />
    </div>
  );
};

export default BlogsData;
