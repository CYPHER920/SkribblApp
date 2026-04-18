import { useEffect, useState } from "react"
import socket from "./Socket";
import axios from 'axios';
const Chat = ({ id }) => {
    const [message, setMessage] = useState([]);
    const [chatText, setChatText] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        const userdata = async () => {
            /// gettig user data
            const userinfo = await axios.get('http://localhost:4000/api/v1/userinfo', { withCredentials: true });
            setUser(userinfo.data.username);

            // Critical Fix: Explicitly join the room when Chat mounts.
            // This ensures if you navigate here directly or reload the page,
            // your socket is actually inside the room on the backend.
            socket.emit('join-room', { username: userinfo.data.username, roomid: id });
        }
        userdata();

        /// chat update listener


        const handleChat = ({ username, chatText }) => {
            console.log("hi");
            setMessage((prev) => [...prev, { username, chatText }]);
        };

        // Listen for the event
        socket.on('chats', handleChat);

        // CLEANUP: Remove the listener when the component unmounts
        return () => {
            socket.off('chats', handleChat);
        };


    }, []);

    return (
        <div className="flex flex-col h-[500px] lg:h-auto lg:max-h-[700px] w-full lg:w-[380px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden shrink-0 flex-grow-0">
            {/* Header */}
            <div className="bg-white/10 px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
                <h2 className="text-white font-black tracking-widest uppercase text-sm drop-shadow-md">Live Chat</h2>
                <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                    <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-[0.2em]">Active</span>
                </div>
            </div>

            {/* Chat Body */}   
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
                {message.length > 0 ? (
                    message.map(({ username, chatText }, index) => {
                        const isMe = username === user;
                        return (
                            <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-full`}>
                                <span className={`text-[9px] font-black tracking-widest uppercase mb-1.5 ${isMe ? 'text-pink-400 mr-1' : 'text-indigo-400 ml-1'}`}>
                                    {username}
                                </span>
                                <div className={`px-4 py-3 rounded-2xl max-w-[85%] break-words shadow-md text-sm font-semibold leading-relaxed border ${
                                    isMe 
                                      ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-400/50 rounded-tr-sm shadow-pink-500/20' 
                                      : 'bg-slate-800 text-slate-200 border-slate-700 rounded-tl-sm shadow-black/20'
                                }`}>
                                    {chatText}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-60">
                        <span className="text-5xl mb-3 filter grayscale opacity-50">💬</span>
                        <p className="text-slate-400 text-[10px] font-black tracking-[0.2em] uppercase">No messages yet</p>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/40 border-t border-white/10 shrink-0">
                <div className="flex bg-slate-800/80 rounded-xl border border-slate-700 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/20 transition-all p-1 shadow-inner">
                    <input 
                        onChange={(e) => setChatText(e.target.value)} 
                        value={chatText} 
                        type="text" 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && chatText.trim().length > 0) {
                                setMessage([...message, { username: user, chatText }]);
                                socket.emit('chats', { username: user, chatText, id });
                                setChatText("");
                            }
                        }}
                        className="flex-1 bg-transparent px-4 py-2.5 text-sm font-medium text-white focus:outline-none placeholder:text-slate-500"
                        placeholder="Type to guess or chat..." 
                    />
                    <button 
                        onClick={() => {
                            if (chatText.trim().length === 0) return;
                            setMessage([...message, { username: user, chatText }]);
                            socket.emit('chats', { username: user, chatText, id });
                            setChatText("");
                        }} 
                        className="cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-pink-500/40"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;
