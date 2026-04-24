
import Nav from './NavBar'
import Chat from './Chat'
import Canvas from './Canvas'
import Word from './Word'
import PlayingPlayers from './PlayingPlayers'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import socket from './Socket'
import useGameStore from './Zustand'
import axios from 'axios'

const GamePage = () => {
    const { id } = useParams();

    const setWord = useGameStore((state) => state.setWord);
    const setTime = useGameStore((state) => state.setTime);
    const time = useGameStore((state) => state.time);
    const setRound = useGameStore((state) => state.setRound);
    const currentRound = useGameStore((state) => state.round);
    const currentDrawer = useRef("");
    const currentUser = useRef("");
    const navigate = useNavigate();
    useEffect(() => {

        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/v1/userinfo', { withCredentials: true });
                currentUser.current = res.data.username;
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };
        fetchUser();

        const gameStart = () => {
            socket.emit('start-game', ({ id }));
        }
        gameStart();

        const settingRound = ({ round }) => {
            setRound(round);
        }
        const settingData = ({ word, player }) => {
            currentDrawer.current = player.username;
            const isDrawer = player.username === currentUser.current;
            const upperWord = word.toUpperCase();
            if (isDrawer) {
                setWord(upperWord.split('').join(' '));
            } else {
                const masked = upperWord.split('').map((char, i) => {
                    if (char === ' ') return '  ';
                    // Reveal the first letter and every 3rd letter
                    return i % 3 === 0 ? char : '_';
                }).join(' ');
                setWord(masked);
            }
        }

        const settingTimer = ({ time }) => {
            setTime(time);
        }
        const timeup = () => {
            alert("Time is up!");
        }
        const gameOver = () => {
            // alert("Game Over!");
            navigate('/final-result');
        }
        socket.on('timeup', timeup);
        socket.on('setround', settingRound);
        socket.on('data', settingData);
        socket.on('settime', settingTimer);
        socket.on('game-over', gameOver);

        return () => {
            socket.off('timeup', timeup);
            socket.off('setround', settingRound)
            socket.off('data', settingData);
            socket.off('game-over', gameOver);
            socket.off('settime', settingTimer);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
            <Nav />

            <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
                {/* Left Column - Players */}
                <div className="lg:w-64 flex-shrink-0 flex flex-col">
                    <PlayingPlayers />
                </div>

                {/* Center Column - Canvas & Game Info */}
                <div className="flex-1 flex flex-col gap-4 min-w-0">
                    {/* Top Bar for Game Info */}
                    <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-[2rem] shadow-lg gap-4">
                        <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-700/50">
                            <span className="text-pink-400 font-black uppercase tracking-widest text-xs">Round</span>
                            <span className="bg-white/10 px-3 py-1 rounded-full font-bold text-sm">{currentRound}</span>
                        </div>

                        <div className="flex-1 flex justify-center min-w-[150px]">
                            <Word />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end justify-center">
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Drawing Now</div>
                                <div className="font-bold text-emerald-400 text-sm bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">{currentDrawer.current || "Waiting..."}</div>
                            </div>
                            <div className="flex items-center gap-2 bg-gradient-to-br from-rose-500/20 to-pink-500/20 text-rose-400 px-4 py-2 rounded-xl border border-rose-500/30 shadow-inner">
                                <span className="text-xl animate-pulse">⏱</span>
                                <span className="font-black text-xl w-8 text-center">{time}</span>
                            </div>
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="flex-1 bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white/10 relative min-h-[500px] lg:min-h-0 flex items-center justify-center">
                        <Canvas />
                    </div>
                </div>

                {/* Right Column - Chat */}
                <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col">
                    <Chat />
                </div>
            </div>
        </div>
    );

}

export default GamePage;