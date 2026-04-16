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
    socket.on('user-connected', handleUserConnected);
    socket.on('player-ready-changed', handlePlayerReadyChanged);
    socket.on('player-left', handlePlayerLeft)
    // Cleanup listeners
    return () => {
      socket.off('user-connected', handleUserConnected);
      socket.off('player-ready-changed', handlePlayerReadyChanged);
      socket.off('player-left', handlePlayerLeft);
    };
  }, [id]);

  const toggleReady = (username, currentReadyState) => {
    const newReadyState = !currentReadyState;
    // Optimistically update local UI
    setPlayers(prev => prev.map(p => p.username === username ? { ...p, isReady: newReadyState } : p));
    // Emit to backend
    socket.emit('player-ready', { roomid: id, username, isReady: newReadyState });
  }

  const allReady = players.length > 1 && players.every(p => p.isReady);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center p-12 select-none">
      <NavBar />
      <div className="mb-12 text-center mt-10">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-sm mb-3">
          Lobby <span className="text-slate-300">#{id}</span>
        </h2>
        <p className="text-slate-400 font-medium tracking-wide">
          Waiting for players to join and ready up...
        </p>
      </div>

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

      <div className="mt-auto mb-10">
        <button
          disabled={!allReady}
          onClick={() => {
            navigate(`/game/${id}`);
            // alert("Game Starting!")
          }}
          className={`px-12 py-4 text-xl font-black tracking-widest uppercase rounded-2xl transition-all duration-300 shadow-2xl
            ${allReady
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/40 hover:-translate-y-1 hover:shadow-emerald-500/60'
              : 'bg-slate-800 text-slate-500 cursor-default border border-slate-700/50'
            }`}
        >
          {allReady ? "Start Game" : "Waiting for Ready"}
        </button>
        <button className="bg-white cursor-pointer px-4 py-2 rounded-lg font-bold text-slate-800" onClick={() => {
          socket.emit('Leave-room', { username: currentUser, id });
          navigate('/dashboard');
        }}>Leave</button>
      </div>
    </div>
  )
}
export default Room;
