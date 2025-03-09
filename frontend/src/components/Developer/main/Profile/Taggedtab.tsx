import type { Post } from "../../../../types/posts";
import { Tag } from "lucide-react";

interface TaggedGridProps {
  taggedPosts: Post[];
  isMobile: boolean;
}

const TaggedGrid = ({ taggedPosts, isMobile }: TaggedGridProps) => {
  return (
    <div className={`grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-4 pb-16 md:pb-4 px-0 md:px-4`}>
      {taggedPosts.length > 0 ? (
        taggedPosts.map((post) => (
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
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
          <Tag className="w-16 h-16 mb-4 stroke-1" />
          <h3 className="text-xl font-medium mb-2">No tagged posts</h3>
          <p>When people tag you in posts, they'll appear here</p>
        </div>
      )}
    </div>
  );
};

export default TaggedGrid;
