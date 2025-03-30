// Posts.jsx
import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

// Sample data for posts
const SAMPLE_POSTS = [
  {
    id: 1,
    username: "VishalBarai",
    userAvatar: "/assets/Developers/Vishal.png",
    location: "JUHU, Mumbai",
    imageUrl: "/assets/Developers/Vishal.png",
    caption: "Enjoying a beautiful day in the city! #newyork #weekend",
    likes: 124,
    comments: 18,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    username: "Vishal Barai",
    userAvatar: "/assets/parallax/man.png",
    location: "San Francisco, CA",
    imageUrl: "/assets/parallax/man.png",
    caption: "Just hiked to the top of this amazing trail! The view was absolutely worth it. #hiking #nature #outdoors",
    likes: 89,
    comments: 7,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    username: "Rahul",
    userAvatar: "/assets/Developers/Rahul.png",
    location: "Los Angeles, CA",
    imageUrl: "/assets/Developers/Rahul.png",
    caption: "Had a great time at the beach today! Can't wait for summer to come back. #beach #sunnyday",
    likes: 56,
    comments: 12,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    username: "Yug",
    userAvatar: "/assets/Developers/Yug.png",
    location: "Chicago, IL",
    imageUrl: "/assets/Developers/Yug.png",
    caption: "Exploring the city and loving every moment of it! #chicago #citylife",
    likes: 32,
    comments: 5,
    timestamp: "3 days ago",
  },
];

export const Posts = ({ profileOnly = false, username = "" }) => {
  // Filter posts if viewing a specific profile
  const posts = profileOnly 
    ? SAMPLE_POSTS.filter(post => post.username === username) 
    : SAMPLE_POSTS;
  
  return (
    <div className="w-full max-w-lg mx-auto my-4">
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts yet</p>
        </div>
      ) : (
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
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
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden">
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
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
              className="px-4 py-2 border border-gray-300 rounded-md text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};