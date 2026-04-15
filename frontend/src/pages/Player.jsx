import { useState } from 'react';

const Player = ({ username, host, isReady, isCurrentUser, onToggleReady }) => {

    const [mic, setMic] = useState(false);

    return (
        <div className={`relative flex flex-col items-center p-6 w-48 rounded-2xl shadow-xl transition-all duration-300 border backdrop-blur-md
            ${isReady ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-slate-800/80 border-slate-700'}
        `}>
            {/* Host Badge */}
            {host && (
                <div className="absolute -top-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-amber-300/30">
                    Host
                </div>
            )}

            {/* Avatar Circle */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black mb-4 shadow-inner ring-4 transition-all duration-300
                ${isReady ? 'bg-emerald-500/30 ring-emerald-400 text-emerald-100' : 'bg-slate-700 ring-slate-600 text-slate-300'}
            `}>
                {username ? username[0].toUpperCase() : '?'}
            </div>
            
            {/* Username */}
            <h3 className="text-xl font-bold text-white mb-4 tracking-wide truncate w-full text-center">{username}</h3>

            <div className="flex w-full gap-2 mt-auto">
                {/* Mic Button */}
                <button 
                    onClick={() => setMic(!mic)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors
                        ${mic ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}
                    `}
                >
                    {mic ? "Mic On" : "Mic Off"}
                </button>
                
                {/* Ready Button */}
                {isCurrentUser ? (
                    <button 
                        onClick={onToggleReady}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg
                            ${isReady 
                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30' 
                                : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/30'
                            }
                        `}
                    >
                        {isReady ? "Ready!" : "Ready?"}
                    </button>
                ) : (
                    <button 
                        disabled 
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold opacity-70 border pointer-events-none
                            ${isReady 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }
                        `}
                    >
                        {isReady ? "Ready" : "Waiting"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Player;