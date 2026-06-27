import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiSend, FiClock, FiUser, FiCalendar, FiX } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  name: string;
  text: string;
  timestamp: string;
}

interface BlogModalProps {
  id: string;
  image: string;
  title: string;
  author: string;
  topic: string;
  description: string;
  date: string;
  comments?: Comment[];
  onClose: () => void;
  onAddComment?: (blogId: string, comment: Comment) => void;
}

const BlogModal: React.FC<BlogModalProps> = ({
  id,
  image,
  title,
  author,
  topic,
  description,
  date,
  comments = [],
  onClose,
  onAddComment,
}) => {
  const { user } = useAuth();
  const [isClosing, setIsClosing] = useState(false);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState("");

  // Sync state if prop changes
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for animation before closing
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const finalName = user ? (user.name || user.email) : commentName.trim();
    if (!finalName) {
      setError("Please provide a name to comment.");
      return;
    }

    setCommenting(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:5000/blog/${id}/comment`,
        { name: finalName, text: commentText.trim() },
        { withCredentials: true }
      );

      const newComment = response.data as Comment;
      
      // Update local state
      const updatedComments = [...localComments, newComment];
      setLocalComments(updatedComments);
      
      // Notify parent
      if (onAddComment) {
        onAddComment(id, newComment);
      }

      // Clear text
      setCommentText("");
      if (!user) setCommentName("");
    } catch (err: any) {
      console.error("Error posting comment:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setCommenting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <AnimatePresence>
        {!isClosing && (
          <motion.div
            className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-md border z-10 transition duration-200"
              onClick={handleClose}
            >
              <FiX size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {/* Blog Image */}
              <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden mb-6 shadow-sm">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta Info */}
              <div className="mb-6">
                <span className="inline-block bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  {topic}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{title}</h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiUser className="text-green-600" />
                    <strong>Author:</strong> {author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="text-green-600" />
                    <strong>Date:</strong> {date}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-gray-700 text-base leading-relaxed mb-8 border-b pb-8 whitespace-pre-wrap">
                {description}
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                  <FiMessageSquare className="text-green-600" />
                  Comments ({localComments.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8">
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    {user ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Commenting as <strong className="text-green-700">{user.name || user.email}</strong>
                      </span>
                    ) : (
                      "Post a comment as Guest"
                    )}
                  </p>
                  <div className="space-y-3">
                    {!user && (
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                      />
                    )}
                    <textarea
                      placeholder="Share your thoughts..."
                      required
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                    />
                    
                    {error && (
                      <p className="text-red-600 text-xs mt-1">{error}</p>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={commenting}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {commenting ? "Posting..." : (
                          <>
                            <FiSend size={14} />
                            Post Comment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                {localComments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed">
                    No comments yet. Be the first to share your thoughts!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {localComments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg flex-shrink-0 uppercase">
                          {comment.name.charAt(0)}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-semibold text-gray-800 text-sm">{comment.name}</h4>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <FiClock size={12} />
                              {new Date(comment.timestamp).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm whitespace-pre-wrap">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogModal;
