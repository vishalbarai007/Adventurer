import type { Post } from "../../../../types/posts";
// Import this at the top of the file
import { Bookmark } from "lucide-react";


interface SavedGridProps {
  savedPosts: Post[];
  isMobile: boolean;
}

const SavedGrid = ({ savedPosts }: SavedGridProps) => {
  return (
    <div className={`grid grid-cols-3 md:grid-cols-4 gap-5 md:gap-4 pb-16 md:pb-4 px-0 md:px-4`}>
      {savedPosts.length > 0 ? (
        savedPosts.map((post) => (
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
          <Bookmark className="w-16 h-16 mb-4 stroke-1" />
          <h3 className="text-xl font-medium mb-2">No saved posts yet</h3>
          <p>When you save posts, they'll appear here</p>
        </div>
      )}
    </div>
  );
};


export default SavedGrid;