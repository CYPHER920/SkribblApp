import { useState, useEffect } from "react";
import socket from "./Socket"; // Use your singleton socket

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [chat, setChat] = useState("");

    useEffect(() => {
        // LISTEN for incoming messages from the server
        socket.on("receive-message", (newMessage) => {
            setChats((prev) => [...prev, newMessage]);
        });

        // Cleanup listener
        return () => socket.off("receive-message");
    }, []);

    const sendChat = () => {
        if (!chat.trim()) return;

        const messageData = {
            text: chat,
            time: new Date().toLocaleTimeString(),
            // You can add sender name here too
        };

        // EMIT the message to the server
        socket.emit("send-message", messageData);

        // Add your own message to your screen immediately
        setChats((prev) => [...prev, { ...messageData, me: true }]);
        setChat(""); // Clear input
    };

    return (
        <div className="p-4 bg-slate-800 rounded-xl w-80">
            {/* Message Display Area */}
            <div className="h-48 overflow-y-auto mb-4 space-y-2 border-b border-slate-700">
                {chats.map((msg, index) => (
                    <div key={index} className={`text-sm ${msg.me ? "text-pink-400 text-right" : "text-indigo-400"}`}>
                        <span className="block text-[10px] opacity-50">{msg.time}</span>
                        <p className="font-bold">{msg.text}</p>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded p-2 text-xs flex-1 outline-none"
                    placeholder="Type something..."
                />
                <button 
                    onClick={sendChat}
                    className="bg-pink-500 px-3 py-1 rounded text-xs font-bold hover:bg-pink-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;