import type { Post } from "../../../../types/posts";

interface PostGridProps {
  posts: Post[];
  isMobile: boolean;
}


const PostGrid = ({ posts, isMobile }: PostGridProps) => {
  return (
    <div className={`grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-4 pb-16 md:pb-4 px-0 md:px-4`}>
      {posts.map((post) => (
        <div key={post.id} className="relative aspect-square overflow-hidden">
          <img 
            src={post.imageUrl || "/placeholder.svg"} 
            alt={post.caption} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div className="text-white text-xl font-bold opacity-0 hover:opacity-100">{post.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;