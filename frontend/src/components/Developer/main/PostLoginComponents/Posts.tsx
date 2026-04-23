// Posts.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Loader2 } from "lucide-react";

// Sample data for posts
const SAMPLE_POSTS = [
  {
    id: 1,
    username: "vishal_barai",
    userAvatar: "/assets/Developers/Vishal.png",
    location: "Juhu Beach, Mumbai",
    imageUrl: "/assets/Developers/Vishal.png",
    caption: "Golden hour walks by the waves 🌅🌊 #beachvibes #mumbai #sunsetmagic",
    likes: 321,
    comments: 34,
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    username: "rahul_skywalker",
    userAvatar: "/assets/Developers/Rahul.png",
    location: "Marine Drive, Mumbai",
    imageUrl: "/assets/Developers/Rahul.png",
    caption: "There's something magical about the sound of the sea and the city lights ✨🌃 #mumbainights #coastlinevibes",
    likes: 210,
    comments: 22,
    timestamp: "10 hours ago",
  },
  {
    id: 4,
    username: "yug_clicks",
    userAvatar: "/assets/Developers/Yug.png",
    location: "Colaba Causeway, Mumbai",
    imageUrl: "/assets/Developers/Yug.png",
    caption: "Street stories and shopping sprees 🛍️📸 #mumbaistreetstyle #indianmarkets",
    likes: 147,
    comments: 14,
    timestamp: "1 day ago",
  },
  {
    id: 5,
    username: "neha_travels",
    userAvatar: "/assets/Developers/Neha.png",
    location: "Manali, Himachal Pradesh",
    imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    caption: "Woke up to snow-covered dreams ❄️🏔️ #manali #snowvibes #mountainlove",
    likes: 412,
    comments: 51,
    timestamp: "2 days ago",
  },
  {
    id: 6,
    username: "arjun_lens",
    userAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    location: "Gateway of India, Mumbai",
    imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    caption: "History meets hustle at the heart of the city 🇮🇳📷 #gatewayofindia #citysoul",
    likes: 301,
    comments: 27,
    timestamp: "3 days ago",
  },
  {
    id: 7,
    username: "meera_inmotion",
    userAvatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    location: "Rishikesh, Uttarakhand",
    imageUrl: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    caption: "Morning yoga by the Ganga 🧘‍♀️🌼 Peace in every pose. #rishikesh #mindfulmovement",
    likes: 389,
    comments: 30,
    timestamp: "4 days ago",
  },
  {
    id: 8,
    username: "ananya_foodie",
    userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    location: "Chandni Chowk, Delhi",
    imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    caption: "Golgappe, jalebi, chaat – can't stop, won't stop! 🍢🍮🧡 #delhifoodie #streetfoodlove",
    likes: 522,
    comments: 65,
    timestamp: "6 days ago",
  },
  {
    id: 9,
    username: "kartik_code",
    userAvatar: "/assets/Developers/Kartik.png",
    location: "Home Office, Bengaluru",
    imageUrl: "/assets/Developers/Kartik.png",
    caption: "Late night coffee and code 💻☕ Who else is in the zone? #developerlife #buildmode",
    likes: 178,
    comments: 13,
    timestamp: "6 hours ago",
  },
  {
    id: 10,
    username: "ishita_art",
    userAvatar: "/assets/Developers/Ishita.png",
    location: "Kala Ghoda, Mumbai",
    imageUrl: "/assets/Developers/Ishita.png",
    caption: "Colors, canvas, and chaos. My kind of therapy 🎨🖌️ #artlife #mumbaiartist",
    likes: 230,
    comments: 18,
    timestamp: "1 week ago",
  }
];

// Simulate generating more posts for infinite scroll
const generateMorePosts = (page: number) => {
  return SAMPLE_POSTS.map((post, index) => ({
    ...post,
    id: post.id + page * SAMPLE_POSTS.length + index,
    timestamp: `${page + 1} week${page > 0 ? "s" : ""} ago`,
  }));
};

export const Posts = ({ profileOnly = false, username = "" }) => {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Filter posts if viewing a specific profile
  const filteredPosts = profileOnly
    ? posts.filter((post) => post.username === username)
    : posts;

  // Infinite scroll sentinel ref
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !profileOnly) {
            loadMorePosts();
          }
        },
        { threshold: 0.1 }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, profileOnly]
  );

  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      const nextPage = page + 1;
      if (nextPage >= 5) {
        // Limit to 5 pages of infinite scroll for the demo
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      const newPosts = generateMorePosts(nextPage);
      setPosts((prev) => [...prev, ...newPosts]);
      setPage(nextPage);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts yet</p>
        </div>
      ) : (
        filteredPosts.map((post, index) => (
          <div
            key={`${post.id}-${index}`}
            ref={index === filteredPosts.length - 1 ? lastPostRef : undefined}
          >
            <Post post={post} />
          </div>
        ))
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-[#012c18]" />
          <span className="ml-2 text-sm text-gray-500">Loading more posts...</span>
        </div>
      )}

      {/* End of feed message */}
      {!hasMore && !profileOnly && (
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-400">You're all caught up! 🎉</p>
        </div>
      )}
    </div>
  );
};

interface PostProps {
  id: number;
  username: string;
  userAvatar: string;
  location?: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const Post = ({ post }: { post: PostProps }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (comment.trim()) {
      // In a real app, you would send this to your backend
      console.log(`New comment: ${comment}`);
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
      {/* Post header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          <img 
            src={post.userAvatar} 
            alt={post.username} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm">{post.username}</p>
            {post.location && (
              <p className="text-xs text-gray-500">{post.location}</p>
            )}
          </div>
        </div>
        <button className="text-gray-500">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post image */}
      <img 
        src={post.imageUrl}
        alt="Post content"
        className="w-full object-cover"
      />

      {/* Post actions */}
      <div className="flex justify-between p-3">
        <div className="flex space-x-4">
          <button 
            onClick={handleLike}
            className={`${liked ? "text-red-500" : "text-gray-700"}`}
          >
            <Heart size={24} fill={liked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="text-gray-700"
          >
            <MessageCircle size={24} />
          </button>
          <button className="text-gray-700">
            <Send size={24} />
          </button>
        </div>
        <button 
          onClick={handleSave}
          className={`${saved ? "text-black" : "text-gray-700"}`}
        >
          <Bookmark size={24} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Likes count */}
      <div className="px-3 pb-2">
        <p className="font-medium text-sm">{likeCount} likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-2">
        <p className="text-sm">
          <span className="font-medium">{post.username}</span>{" "}
          {post.caption}
        </p>
      </div>

      {/* Timestamp */}
      <div className="px-3 pb-2">
        <p className="text-xs text-gray-500">{post.timestamp}</p>
      </div>

      {/* View comments link */}
      {!showComments && post.comments > 0 && (
        <button 
          className="px-3 pb-2 text-sm text-gray-500"
          onClick={() => setShowComments(true)}
        >
          View all {post.comments} comments
        </button>
      )}

      {/* Comments section (simplified) */}
      {showComments && (
        <div className="px-3 pb-2 border-t border-gray-100">
          <div className="py-2">
            <p className="text-sm">
              <span className="font-medium">user123</span> This looks amazing!
            </p>
            <p className="text-sm">
              <span className="font-medium">another_user</span> Great shot!
            </p>
          </div>
        </div>
      )}

      {/* Add comment form */}
      <form 
        onSubmit={handleComment}
        className="flex items-center px-3 py-2 border-t border-gray-100"
      >
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border-none outline-none text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.trim() && (
          <button 
            type="submit"
            className="text-blue-500 font-medium text-sm"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

// CreatePostButton component for creating new posts
export const CreatePostButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-[#012c18] text-white rounded-full p-4 shadow-lg hover:bg-[#024d2b] transition-all hover:scale-110 active:scale-95 z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      
      {showModal && (
        <CreatePostModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

// Modal for creating posts
const CreatePostModal = ({ onClose }: { onClose: () => void }) => {
  const [caption, setCaption] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log(`New post with caption: ${caption}`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-medium">Create New Post</h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 mb-2">Drag photos and videos here</p>
              <button 
                type="button"
                className="bg-[#012c18] text-white px-4 py-2 rounded-md text-sm hover:bg-[#024d2b] transition-colors"
              >
                Select from computer
              </button>
            </div>
            
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>
          
          <div className="border-t border-gray-200 p-4 flex justify-end space-x-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#012c18] text-white rounded-md text-sm hover:bg-[#024d2b] transition-colors"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};