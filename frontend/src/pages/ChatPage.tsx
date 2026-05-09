import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  Search, 
  Plus, 
  Menu, 
  Image as ImageIcon, 
  Smile, 
  Send,
  MoreVertical,
  CheckCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Developer/main/PostLoginComponents/sidebar";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp?: any;
}

interface ChatThread {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatarUrl: string;
  isActive?: boolean;
}

const mockChats: ChatThread[] = [
  {
    id: "PAUL_OSMAND",
    name: "PAUL OSMAND",
    lastMessage: "hahah, nice!",
    time: "Thu",
    unread: 1,
    avatarUrl: "https://i.pravatar.cc/150?u=paul"
  },
  {
    id: "ANA_MALBASA",
    name: "ANA MALBASA",
    lastMessage: "It's all good! It will go back quick.",
    time: "08:04 AM",
    unread: 0,
    avatarUrl: "https://i.pravatar.cc/150?u=ana"
  },
  {
    id: "EDWARD_DAVIS",
    name: "EDWARD DAVIS",
    lastMessage: "Are we still going for a coffee?",
    time: "08:00 AM",
    unread: 1,
    avatarUrl: "https://i.pravatar.cc/150?u=edward"
  },
  {
    id: "NAOMI_RISTE",
    name: "NAOMI RISTE",
    lastMessage: "What did your boss say?",
    time: "13 Aug",
    unread: 0,
    avatarUrl: "https://i.pravatar.cc/150?u=naomi"
  },
  {
    id: "JONATHAN_BLAKE",
    name: "JONATHAN BLAKE",
    lastMessage: "Sent you some media",
    time: "25 Sept",
    unread: 0,
    avatarUrl: "https://i.pravatar.cc/150?u=jonathan"
  }
];

const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [isChatListOpen, setIsChatListOpen] = useState(true);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(mockChats);

  const currentUser = { uid: "traveler_123" };

  // Set active chat based on URL
  const activeChat = chatThreads.find(c => c.id === chatId) || {
    id: chatId || "Unknown",
    name: "Inquiry Chat",
    lastMessage: "",
    time: "",
    unread: 0,
    avatarUrl: "https://i.pravatar.cc/150?u=unknown"
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen to messages for the active chat
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(newMessages);
      
      // Update chat list last message dynamically
      if (newMessages.length > 0) {
        const latestMsg = newMessages[newMessages.length - 1];
        setChatThreads(prev => {
          const exists = prev.find(c => c.id === chatId);
          if (exists) {
            return prev.map(c => c.id === chatId ? { ...c, lastMessage: latestMsg.text, time: "Just now" } : c);
          } else {
            // Append new user if they send a message and aren't in the list
            return [{
              id: chatId,
              name: "New User",
              lastMessage: latestMsg.text,
              time: "Just now",
              unread: 1,
              avatarUrl: "https://i.pravatar.cc/150?u=new"
            }, ...prev];
          }
        });
      }
    });

    return () => unsubscribe();
  }, [chatId]);

  // Listen to global chats collection to append new incoming chats
  useEffect(() => {
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const realChats: ChatThread[] = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || "Traveler " + doc.id.slice(0,4),
        lastMessage: doc.data().lastMessage || "New conversation started",
        time: "Recent",
        unread: 1,
        avatarUrl: `https://i.pravatar.cc/150?u=${doc.id}`
      }));
      
      setChatThreads(prev => {
        // Merge real chats with mock chats, avoiding duplicates by ID
        const prevIds = new Set(prev.map(p => p.id));
        const newRealChats = realChats.filter(r => !prevIds.has(r.id));
        return [...newRealChats, ...prev];
      });
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !chatId) return;

    const msgText = inputText;
    setInputText(""); // Optimistic clear
    
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: currentUser.uid,
      text: msgText,
      timestamp: serverTimestamp(),
    });
  };

  const isMine = (senderId: string) => senderId === currentUser.uid;

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      
      {/* Column 1: Sidebar Nav */}
      <Sidebar />

      {/* Column 2: Chat List (Toggleable) */}
      <AnimatePresence initial={false}>
        {isChatListOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 350, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="h-full border-r border-gray-100 flex flex-col bg-white overflow-hidden shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10"
          >
            {/* Search Header */}
            <div className="p-6 pb-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-gray-50 text-gray-800 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
            </div>

            {/* Filter Header */}
            <div className="flex justify-between items-center px-6 py-4">
              <select className="bg-transparent text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer">
                <option>Latest First</option>
                <option>Unread</option>
              </select>
              <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition shadow-md shadow-blue-200">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {chatThreads.map((chat) => {
                const isActive = chat.id === chatId;
                return (
                  <div 
                    key={chat.id}
                    onClick={() => navigate(`/chat/${chat.id}`)}
                    className={`relative flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      isActive ? "bg-gray-50" : ""
                    }`}
                  >
                    {/* Active Gradient Border */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-orange-400" />
                    )}
                    
                    <div className="relative">
                      <img src={chat.avatarUrl} alt={chat.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" />
                      {chat.unread > 0 && !isActive && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{chat.time}</span>
                      </div>
                      <p className={`text-sm truncate ${chat.unread > 0 && !isActive ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                    
                    {chat.unread > 0 && !isActive && (
                      <div className="w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-sm">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Column 3: Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        
        {/* Chat Header */}
        <div className="h-20 border-b border-gray-100 flex items-center justify-between px-6 bg-white z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsChatListOpen(!isChatListOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3">
              <img src={activeChat.avatarUrl} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{activeChat.name}</h2>
                <p className="text-xs text-gray-500 font-medium">Online</p>
              </div>
            </div>
          </div>
          
          <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const mine = isMine(m.senderId);
              return (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}
                >
                  {!mine && (
                    <img src={activeChat.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full mb-1 object-cover shadow-sm" />
                  )}
                  
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <div 
                      className={`px-5 py-3 shadow-sm ${
                        mine 
                        ? "bg-gray-100 text-gray-800 rounded-2xl rounded-br-none" 
                        : "bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none"
                      }`}
                    >
                      <p className="text-[15px] leading-relaxed">{m.text}</p>
                    </div>
                    
                    <div className={`flex items-center gap-1 text-[11px] text-gray-400 ${mine ? "justify-end" : "justify-start"}`}>
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {mine && <CheckCheck className="w-3 h-3 text-green-500" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
              <p className="text-center font-medium bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                No messages yet. Say hello!
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-6 bg-white shrink-0">
          <form onSubmit={sendMessage} className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-4 py-2 shadow-sm">
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition">
              <ImageIcon className="w-6 h-6" />
            </button>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-600 transition">
              <Smile className="w-6 h-6" />
            </button>
            
            <input 
              type="text"
              className="flex-grow bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 px-2 py-3 outline-none"
              placeholder="Message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-200 transition disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default ChatPage;
