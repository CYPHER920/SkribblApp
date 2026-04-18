import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Player from "./Player";
import axios from "axios";
import socket from "./Socket";
import NavBar from "./NavBar";
const Room = () => {
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getInfo = async () => {
      try {
        const result = await axios.get('http://localhost:4000/api/v1/getroom', {
          params: { roomid: id },
          withCredentials: true
        });
        setPlayers(result.data.room.players);

        const user = await axios.get('http://localhost:4000/api/v1/userinfo', { withCredentials: true });
        setCurrentUser(user.data.username);

        // We emit roomid, not id, according to the backend listener
        socket.emit('join-room', { username: user.data.username, roomid: id });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getInfo();

    // Listen for NEW players joining
    const handleUserConnected = ({ username }) => {
      setPlayers((prev) => {
        const exist = prev.find((p) => p.username === username);
        if (exist) return prev;
        return [...prev, { username, isHost: false, isReady: false }]
      });
    };

    // Listen for Ready changes
    const handlePlayerReadyChanged = ({ username, isReady }) => {
      setPlayers((prev) =>
        prev.map(p => p.username === username ? { ...p, isReady } : p)
      );
    };
    const handlePlayerLeft = ({ players }) => {
      console.log(players.length);
      setPlayers(players);
    }

    const handleGameStart = () => {
      navigate(`/game/${id}`);
    }

    socket.on('user-connected', handleUserConnected);
    socket.on('player-ready-changed', handlePlayerReadyChanged);
    socket.on('player-left', handlePlayerLeft)
    socket.on('game-started', handleGameStart);
    // Cleanup listeners
    return () => {
      socket.off('user-connected', handleUserConnected);
      socket.off('player-ready-changed', handlePlayerReadyChanged);
      socket.off('player-left', handlePlayerLeft);
      socket.off('game-started', handleGameStart);
    };
  }, [id]);

  const toggleReady = (username, currentReadyState) => {
    const newReadyState = !currentReadyState;
    // Optimistically update local UI 
    setPlayers(prev => prev.map(p => p.username === username ? { ...p, isReady: newReadyState } : p));
    // Emitting palyer ready state to backend
    socket.emit('player-ready', { roomid: id, username, isReady: newReadyState });
  }

  const allReady = players.length > 1 && players.every(p => p.isReady);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col overflow-y-auto selection:bg-pink-300 selection:text-white">
      <div className="p-4 md:px-8">
        <NavBar />
      </div>

      <main className="flex-1 flex flex-col items-center justify-start p-6 mt-4 w-full">
        {/* Lobby Header */}
        <div className="mb-12 text-center bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-3 uppercase tracking-[0.1em] relative z-10">
            Lobby <span className="text-pink-300">#{id}</span>
          </h2>
          <p className="text-indigo-50 font-bold tracking-widest uppercase text-xs md:text-sm relative z-10 drop-shadow-md">
            Waiting for players to join and ready up...
          </p>
        </div>

        {/* Players Container */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-5xl mb-12">
          {
            players.map((player, index) => {
              return (
                <Player
                  key={index}
                  username={player.username}
                  host={player.isHost}
                  isReady={player.isReady}
                  isCurrentUser={player.username === currentUser}
                  onToggleReady={() => toggleReady(player.username, player.isReady)}
                />
              )
            })
          }
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto mb-10 flex flex-col sm:flex-row gap-6 items-center bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-xl">
          <button
            disabled={!allReady}
            onClick={() => {
              socket.emit('start-game', { id });
              navigate(`/game/${id}`);
            }}
            className={`px-12 py-4 text-sm md:text-lg font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-2xl
              ${allReady
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-white shadow-emerald-500/40 hover:-translate-y-1 hover:shadow-emerald-500/60 cursor-pointer border-2 border-emerald-300'
                : 'bg-white/10 text-white/50 cursor-not-allowed border-2 border-white/10 backdrop-blur-sm'
              }`}
          >
            {allReady ? "Start Game" : "Waiting for Ready"}
          </button>

          <div className="w-full sm:w-px h-px sm:h-12 bg-white/20"></div>

          <button
            className="bg-rose-500/90 hover:bg-rose-500 text-white cursor-pointer px-10 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-rose-500/40 border-2 border-rose-400 hover:-translate-y-1 text-sm md:text-lg"
            onClick={() => {
              socket.emit('Leave-room', { username: currentUser, id });
              navigate('/dashboard');
            }}>
            Leave Room
          </button>
        </div>
      </main>
    </div>
  )
}
export default Room;
