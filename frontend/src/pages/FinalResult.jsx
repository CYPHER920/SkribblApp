import useGameStore from "./Zustand";
import { useNavigate } from 'react-router-dom';

const FinalResult = () => {

    const winner = useGameStore((state) => state.winner);
    const winnerScore = useGameStore((state) => state.winnerScore);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] shadow-2xl p-10 flex flex-col items-center text-center">

                {/* Trophy Icon */}
                <div className="w-32 h-32 mb-6 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(245,158,11,0.5)] border-4 border-amber-200/50 animate-bounce">
                    🏆
                </div>

                <h1 className="text-lg text-slate-300 font-black tracking-[0.3em] uppercase mb-2 drop-shadow-md">
                    Winner
                </h1>

                <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 mb-6 drop-shadow-lg pb-2 max-w-full px-4 break-words text-wrap text-center leading-tight">
                    {winner || "No Winner"}
                </h2>

                <div className="flex items-center gap-4 bg-black/40 px-8 py-4 rounded-2xl border border-white/10 shadow-inner mb-10">
                    <span className="text-slate-400 font-black uppercase tracking-widest text-sm">Final Score</span>
                    <span className="text-4xl font-black text-white drop-shadow-md">{winnerScore || 0}</span>
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-[2px] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] active:scale-95"
                >
                    <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-xl px-10 py-4 transition-all group-hover:bg-transparent flex items-center justify-center gap-3">
                        <span className="text-xl">🏠</span>
                        <span className="text-white font-black tracking-widest uppercase text-sm">Go To Home</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FinalResult;