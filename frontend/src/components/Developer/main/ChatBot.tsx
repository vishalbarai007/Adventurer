import { useState } from "react";
import { Send } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: { text: string; sender: "user" | "bot" } = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
  
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await res.json();
      const botReply: { text: string; sender: "user" | "bot" } = { text: data.reply || "Sorry, I couldn't understand.", sender: "bot" };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error contacting AI", sender: "bot" }]);
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg flex flex-col h-[500px] border border-green-300">
      <div className="bg-green-500 text-white p-4 text-center font-semibold rounded-t-xl">Adventurer Chat</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.sender === "user" ? "bg-green-500 text-white ml-auto" : "bg-white text-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 flex items-center border-t border-green-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
