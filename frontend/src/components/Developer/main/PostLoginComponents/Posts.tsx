// Posts.tsx
import { useState, useRef, useCallback } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Loader2, Grid, List, MapPin, X, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import httpClient from "../../../../services/httpClient";

// Variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.9 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.6,
    },
  },
};

// Sample data for posts
const SAMPLE_POSTS = [
  {
    id: 1,
    username: "vishal_barai",
    userAvatar: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056002/adventurer_assets_migration/images/Vishal_mzgtcl.png",
    location: "Juhu Beach, Mumbai",
    imageUrl: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056002/adventurer_assets_migration/images/Vishal_mzgtcl.png",
    caption: "Golden hour walks by the waves 🌅🌊 #beachvibes #mumbai #sunsetmagic",
    likes: 321,
    comments: 34,
    timestamp: "1 hour ago",
    locationCoords: { latitude: 19.0948, longitude: 72.8258 },
  },
  {
    id: 3,
    username: "rahul_skywalker",
    userAvatar: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055942/adventurer_assets_migration/images/Rahul_piiquh.png",
    location: "Marine Drive, Mumbai",
    imageUrl: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778055942/adventurer_assets_migration/images/Rahul_piiquh.png",
    caption: "There's something magical about the sound of the sea and the city lights ✨🌃 #mumbainights #coastlinevibes",
    likes: 210,
    comments: 22,
    timestamp: "10 hours ago",
    locationCoords: { latitude: 18.9432, longitude: 72.8235 },
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
    locationCoords: { latitude: 18.9067, longitude: 72.8147 },
  },
  {
    id: 5,
    username: "neha_travels",
    userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    location: "Manali, Himachal Pradesh",
    imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    caption: "Woke up to snow-covered dreams ❄️🏔️ #manali #snowvibes #mountainlove",
    likes: 412,
    comments: 51,
    timestamp: "2 days ago",
    locationCoords: { latitude: 32.2396, longitude: 77.1887 },
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
    locationCoords: { latitude: 18.9220, longitude: 72.8347 },
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
    locationCoords: { latitude: 30.0869, longitude: 78.2676 },
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
    locationCoords: { latitude: 28.6506, longitude: 77.2334 },
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
    locationCoords: { latitude: 12.9716, longitude: 77.5946 },
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
    locationCoords: { latitude: 18.9322, longitude: 72.8312 },
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

// --- Viral Share ---
const handleShare = async (post: { id: number; location?: string; caption: string }) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Check out this trip to ${post.location || "an amazing place"}!`,
        text: post.caption,
        url: `${window.location.origin}/post/${post.id}`,
      });
    } catch (err) {
      console.log("Error sharing", err);
    }
  } else {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    alert("Link copied to clipboard!");
  }
};

// ==========================================
//  MAIN EXPORT: Posts Component
// ==========================================
export const Posts = ({ profileOnly = false, username = "" }) => {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedPost, setSelectedPost] = useState<(typeof SAMPLE_POSTS)[0] | null>(null);
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
    setTimeout(() => {
      const nextPage = page + 1;
      if (nextPage >= 5) {
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
    <div className="w-full max-w-2xl mx-auto">
      {/* View Toggle */}
      {!profileOnly && (
        <div className="flex items-center justify-end gap-1 mb-4 bg-white rounded-lg p-1 shadow-sm border border-gray-100 w-fit ml-auto">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition ${viewMode === "list" ? "bg-[#012c18] text-white shadow" : "text-gray-500 hover:text-gray-700"}`}
            title="List View"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition ${viewMode === "grid" ? "bg-[#012c18] text-white shadow" : "text-gray-500 hover:text-gray-700"}`}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts yet</p>
        </div>
      ) : viewMode === "list" ? (
        /* ===== LIST VIEW ===== */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={`${post.id}-${index}`}
              variants={itemVariants}
              ref={index === filteredPosts.length - 1 ? lastPostRef : undefined}
            >
              <Post post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* ===== GRID / EXPLORE VIEW ===== */
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 rounded-lg overflow-hidden"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={`grid-${post.id}-${index}`}
              variants={itemVariants}
              whileHover={{ scale: 0.98 }}
              ref={index === filteredPosts.length - 1 ? lastPostRef : undefined}
              className="relative aspect-square overflow-hidden cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <div className="text-white text-center space-y-1">
                  <p className="font-bold flex items-center gap-1 justify-center">
                    <Heart className="w-5 h-5 fill-white" /> {post.likes}
                  </p>
                  <p className="text-xs flex items-center gap-1 justify-center">
                    <MapPin size={12} /> {post.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
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

      {/* Leaflet Map Modal for Grid View */}
      {selectedPost && (
        <PostMapModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

// ==========================================
//  Post Map Modal (Leaflet popup on grid click)
// ==========================================
const PostMapModal = ({ post, onClose }: { post: (typeof SAMPLE_POSTS)[0]; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src={post.userAvatar} alt={post.username} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-sm text-gray-900">{post.username}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} />{post.location}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Image */}
          <img src={post.imageUrl} alt={post.caption} className="w-full h-64 object-cover" />

          {/* Map */}
          {post.locationCoords && (
            <div className="h-48 w-full bg-gray-100 relative">
              <iframe
                title="Post Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${post.locationCoords.longitude - 0.02}%2C${post.locationCoords.latitude - 0.02}%2C${post.locationCoords.longitude + 0.02}%2C${post.locationCoords.latitude + 0.02}&layer=mapnik&marker=${post.locationCoords.latitude}%2C${post.locationCoords.longitude}`}
              />
            </div>
          )}

          {/* Caption & Actions */}
          <div className="p-4">
            <p className="text-sm text-gray-800"><span className="font-bold">{post.username}</span> {post.caption}</p>
            <div className="flex items-center gap-4 mt-3 text-gray-500">
              <span className="flex items-center gap-1 text-sm"><Heart size={16} /> {post.likes}</span>
              <span className="flex items-center gap-1 text-sm"><MessageCircle size={16} /> {post.comments}</span>
              <button onClick={() => handleShare(post)} className="ml-auto flex items-center gap-1 text-sm hover:text-[#012c18] transition">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


// ==========================================
//  Single Post Component (List View)
// ==========================================
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
          <motion.button 
            whileTap={{ scale: 0.8, rotate: -10 }}
            whileHover={{ scale: 1.15 }}
            onClick={handleLike}
            className={`${liked ? "text-red-500" : "text-gray-700"} transition-colors`}
          >
            <Heart size={24} fill={liked ? "currentColor" : "none"} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.8, rotate: 10 }}
            whileHover={{ scale: 1.15 }}
            onClick={() => setShowComments(!showComments)}
            className="text-gray-700"
          >
            <MessageCircle size={24} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.8, x: 5, y: -5 }}
            whileHover={{ scale: 1.15 }}
            className="text-gray-700 hover:text-[#012c18] transition" 
            onClick={() => handleShare(post)}
          >
            <Send size={24} />
          </motion.button>
        </div>
        <motion.button 
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.15 }}
          onClick={handleSave}
          className={`${saved ? "text-black" : "text-gray-700"}`}
        >
          <Bookmark size={24} fill={saved ? "currentColor" : "none"} />
        </motion.button>
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

// ==========================================
//  Create Post Button & Modal with Location Tagging
// ==========================================
export const CreatePostButton = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <motion.button 
        whileTap={{ scale: 0.9, rotate: -3 }}
        whileHover={{ scale: 1.1, rotate: 3 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-[#012c18] text-white rounded-full p-4 shadow-lg hover:bg-[#024d2b] transition-all z-30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {showModal && (
          <CreatePostModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Modal for creating posts — with Location Tagging
const CreatePostModal = ({ onClose }: { onClose: () => void }) => {
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [nearbySpots, setNearbySpots] = useState<{ name: string; id: string; distance?: number }[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");

  // Fetch nearby spots using browser geolocation + your existing API
  const fetchNearbySpots = () => {
    setLocLoading(true);
    setLocError("");
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported by your browser.");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await httpClient.post("http://localhost:5000/api/nearby-spots", {
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          setNearbySpots(res.data.spots || []);
        } catch (err) {
          console.error(err);
          setLocError("Failed to fetch nearby spots.");
        } finally {
          setLocLoading(false);
        }
      },
      () => {
        setLocError("Location access denied.");
        setLocLoading(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await httpClient.post("http://localhost:5000/api/posts", {
        caption,
        mediaUrl,
        locationTag: selectedLocation,
        authorName: "Vishal",
        authorId: "vishal_barai",
      });
      onClose();
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 50, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Create New Post</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            {/* Media URL Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Image URL</label>
              <input
                type="url"
                placeholder="Paste an image URL..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#012c18]/20 focus:border-[#012c18] outline-none transition text-sm"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
              />
            </div>

            {/* Image Preview */}
            {mediaUrl && (
              <div className="rounded-lg overflow-hidden border border-gray-200 h-40">
                <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              </div>
            )}

            {/* Caption */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Caption</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-[#012c18]/20 focus:border-[#012c18] outline-none transition text-sm"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
            </div>

            {/* Location Tagging */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase">Tag Location</label>
                <button
                  type="button"
                  onClick={fetchNearbySpots}
                  disabled={locLoading}
                  className="text-xs font-bold text-[#012c18] hover:underline flex items-center gap-1 disabled:opacity-50"
                >
                  <MapPin size={12} /> {locLoading ? "Fetching..." : "Find Nearby Places"}
                </button>
              </div>
              {locError && <p className="text-red-500 text-xs mb-1">{locError}</p>}
              {nearbySpots.length > 0 ? (
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#012c18]/20 focus:border-[#012c18] outline-none transition bg-white"
                >
                  <option value="">Select a location...</option>
                  {nearbySpots.map((spot) => (
                    <option key={spot.id} value={spot.name}>
                      {spot.name} {spot.distance ? `(${spot.distance} km away)` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="e.g. Kalsubai Peak, Maharashtra"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#012c18]/20 focus:border-[#012c18] outline-none transition"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 p-4 flex justify-end space-x-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="px-5 py-2.5 bg-[#012c18] text-white rounded-lg text-sm font-bold hover:bg-[#024d2b] transition-colors shadow-lg shadow-green-900/10"
            >
              Share Post
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};