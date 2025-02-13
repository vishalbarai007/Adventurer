import { useState } from "react";
import { Send } from "lucide-react";
import Sidebar from "./PostLoginComponents/sidebar";
import ReactMarkdown from "react-markdown";

const ChatBot = () => {
	const [messages, setMessages] = useState<
		{ text: string; sender: "user" | "bot" }[]
	>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Show a placeholder response while fetching
    setMessages((prev) => [...prev, { text: "Thinking...", sender: "bot" }]);

    try {
        const res = await fetch("http://localhost:5000/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();

        setMessages((prev) =>
            prev.slice(0, -1).concat({
                text: data.response || "Sorry, I couldn't understand.",
                sender: "bot",
            })
        );
    } catch (error) {
        setMessages((prev) =>
            prev.slice(0, -1).concat({
                text: "Error contacting AI",
                sender: "bot",
            })
        );
    } finally {
        setLoading(false);
    }
};


	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gray-100">
			<div className="hidden md:block w-[300px] h-full border-r border-green-300">
				<Sidebar />
			</div>

			<div className="w-full h-screen md:max-w-[100%] md:h-screen md:rounded-xl pb-10 md:shadow-lg bg-white flex flex-col border border-green-300">
				<div className="bg-brand-green text-white p-4 text-center font-semibold rounded-t-xl">
					Trekky !
				</div>
				<div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100">
					{messages.map((msg, index) => (
						<div
							key={index}
							className={`p-2 rounded-lg max-w-[75%] ${
								msg.sender === "user"
									? "bg-green-500 text-white ml-auto"
									: "bg-white text-gray-700"
							}`}
						>
							{msg.sender === "bot" ? (
								<ReactMarkdown>{msg.text}</ReactMarkdown>
							) : (
								msg.text
							)}
						</div>
					))}
					{loading && <div className="text-gray-500">Typing...</div>}
				</div>
				<div className="p-2 flex items-center border-t border-green-300">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
						placeholder="Type a message..."
						disabled={loading}
					/>
					<button
						onClick={handleSend}
						className="ml-2 p-2 bg-brand-green text-white rounded-lg hover:bg-green-600 disabled:bg-green-300"
						disabled={loading}
					>
						<Send size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
