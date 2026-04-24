import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from './Socket';
import useGameStore from './Zustand';
const PlayingPlayers = () => {
    const { id } = useParams();
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState("");
    const setWinner = useGameStore((state) => state.setWinner);
    const setWinnerScore = useGameStore((state) => state.setWinnerScore);
    useEffect(() => {
        const getPlayers = async () => {
            try {
                const result = await axios.get('http://localhost:4000/api/v1/getroom', {
                    params: { roomid: id },
                    withCredentials: true
                });
                const allPlayers = result.data.room.players;
                // console.log("currPlayer: ", currPlayer.data.username);

                setPlayers([...allPlayers].sort((a, b) => b.score - a.score));
                setWinner(allPlayers[0].username);
                setWinnerScore(allPlayers[0].score);

            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        const getUser = async () => {
            const currPlayer = await axios.get('http://localhost:4000/api/v1/userInfo', { withCredentials: true });
            setCurrentPlayer(currPlayer.data.username);
        }
        getUser();
        socket.on("scoreupdate", getPlayers)
        if (id) {
            getPlayers();
        }

        return () => {
            socket.off("scoreupdate", getPlayers)
        }

    }, [id]);

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl p-5 flex flex-col gap-3 h-[300px] lg:h-full overflow-y-auto">
            <h2 className="text-white font-black tracking-widest uppercase text-sm drop-shadow-md mb-2">Players</h2>
            <div className="flex flex-col gap-3">
                {
                    players.map((player, index) => {
                        const isMe = player.username === currentPlayer;
                        return (
                            <div key={index} className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${isMe ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/50 shadow-lg shadow-pink-500/10' : 'bg-slate-800/50 border-white/5 hover:bg-slate-700/50'}`}>
                                <div className="text-center w-4">{index + 1}.</div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black shrink-0 ${isMe ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md' : 'bg-slate-700 text-slate-300'}`}>
                                    {player.username?.[0].toUpperCase() || '?'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-bold truncate text-sm ${isMe ? 'text-pink-300' : 'text-slate-200'}`}>
                                        {player.username}
                                    </h3>
                                    {isMe && <span className="text-[10px] uppercase tracking-widest font-black text-pink-400/80">You</span>}
                                </div>
                                <div className="text-right pl-2 border-l border-white/10">
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Pts</div>
                                    <div className="font-black text-white text-lg leading-none">{player.score || 0}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
export default PlayingPlayers;
