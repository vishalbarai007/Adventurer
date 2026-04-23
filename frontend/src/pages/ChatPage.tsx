import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  senderId: string;
  text: string;
}

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = { uid: "traveler_123" };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !chatId) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: currentUser.uid,
      text: inputText,
      timestamp: serverTimestamp(),
    });
    setInputText("");
  };

  const isMine = (senderId: string) => senderId === currentUser.uid;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 font-sans pt-20">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[75vh] border border-gray-100">
        
        {/* Chat Header */}
        <div className="bg-green-600 text-white px-6 py-4 flex items-center gap-4 shadow-md z-10">
          <button onClick={() => navigate(-1)} className="hover:bg-green-700 p-2 rounded-full transition">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              S
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Inquiry Chat</h2>
              <p className="text-green-200 text-xs font-semibold uppercase tracking-wider">Active Conversation</p>
            </div>
          </div>
        </div>
        
        {/* Chat Messages — with AnimatePresence */}
        <div className="flex-grow p-6 overflow-y-auto bg-slate-50 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`flex ${isMine(m.senderId) ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[70%] px-5 py-3 shadow-sm ${
                    isMine(m.senderId) 
                    ? "bg-green-600 text-white rounded-2xl rounded-br-none" 
                    : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none"
                  }`}
                >
                  <p className="text-sm font-medium leading-relaxed">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
              <p className="text-center font-medium">No messages yet. Send a message to start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center">
          <input 
            type="text"
            className="flex-grow border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 text-gray-800 placeholder:text-gray-400"
            placeholder="Type your message here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="bg-green-600 text-white rounded-full p-3.5 hover:bg-green-700 shadow-lg shadow-green-200 transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-90"
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
