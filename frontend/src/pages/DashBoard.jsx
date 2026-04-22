import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [roomcode, setRoomcode] = useState('');
  const [players, setPlayers] = useState('');
  const [rounds, setRounds] = useState('');
  const navigate = useNavigate();

  const joinHandler = async () => {
    const roomid = roomcode.trim();
    if (!roomid) return alert("Please enter a room code!");
    try {
      setLoading(true);
      const roomState = await axios.get('http://localhost:4000/api/v1/getroom', { params: { roomid }, withCredentials: true });

      if (roomState.data.room.players.length >= roomState.data.room.maxPlayers) {
        return alert('Room is Full!');
      }

      if (roomState.data.room.status === 'playing') {

        return alert('Game started sorry!');
      }
      const response = await axios.post('http://localhost:4000/api/v1/joinroom', { roomid }, { withCredentials: true });

      if (response.data.success) navigate(`/room/${roomid}`);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Room Code!");
    } finally {
      setLoading(false);
    }
  };

  const createHandler = async () => {
    if (!rounds.trim() || !players.trim()) return alert("Please Enter Rounds and Players");
    if (parseInt(rounds) <= 0 || parseInt(players) <= 1) return alert("Rounds greater than 0 and Players greater than 1");
    if (parseInt(rounds) > 4 || parseInt(players) > 5) return alert("Max Rounds: 4, Max Players: 5");

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:4000/api/v1/createroom', { maxRounds: parseInt(rounds), maxPlayers: parseInt(players) }, { withCredentials: true });
      if (response.data.success) navigate(`/room/${response.data.roomId}`);
    } catch (err) {
      alert("Failed to create room.");
    } finally {
      setLoading(false);
    }
  };

  const cardClass = "bg-white/95 backdrop-blur-md p-6 rounded-[1.8rem] shadow-2xl border border-white/20 flex flex-col items-center text-center transition-all hover:scale-[1.02] w-full max-w-[340px] min-h-[370px] justify-between";
  const labelClass = "text-[9px] font-black uppercase ml-1 mb-1 tracking-widest block text-left opacity-70";
  const inputBase = "w-full rounded-xl border-2 outline-none transition-all font-bold text-sm shadow-sm";

  return (
    /* min-h-screen: Background stays full height
       overflow-y-auto: Scrollbar appears ONLY if content overflows
    */
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col overflow-y-auto">
      <div className="p-4 md:px-8">
        <NavBar />
      </div>

      <main className="flex-1 flex flex-col lg:flex-row gap-6 items-center justify-center p-6 my-auto">

        {/* Join Room Card */}
        <div className={cardClass}>
          <div className="w-full">
            <div className="text-4xl mb-3">🎮</div>
            <h2 className="text-xl font-black text-indigo-600 uppercase italic leading-none mb-1.5">Join Room</h2>
            <p className="text-gray-400 mb-6 text-[11px] font-semibold tracking-tight">Enter a code to join friends</p>

            <div className="w-full text-left">
              <label className={`${labelClass} text-indigo-500`}>Room Code</label>
              <input
                type="text"
                value={roomcode}
                onChange={(e) => setRoomcode(e.target.value)}
                placeholder='Enter Room ID'
                className={`${inputBase} p-3 border-indigo-50 bg-indigo-50/50 text-indigo-600 focus:border-indigo-500 focus:bg-white tracking-widest uppercase placeholder:text-indigo-200`}
              />
            </div>
          </div>

          <button
            disabled={loading}
            onClick={joinHandler}
            className="cursor-pointer w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-black rounded-xl shadow-lg shadow-indigo-500/30 transition-all uppercase tracking-widest mt-4 text-xs"
          >
            {loading ? "Checking..." : "Join Game"}
          </button>
        </div>

        {/* Create Room Card */}
        <div className={cardClass}>
          <div className="w-full">
            <div className="text-4xl mb-3">🎨</div>
            <h2 className="text-xl font-black text-pink-500 uppercase italic leading-none mb-1.5">Create Room</h2>
            <p className="text-gray-400 mb-6 text-[11px] font-semibold tracking-tight">Customize your lobby settings</p>

            <div className="w-full grid grid-cols-2 gap-3">
              <div className="text-left">
                <label className={`${labelClass} text-pink-500`}>Players</label>
                <input
                  onChange={(e) => setPlayers(e.target.value)}
                  value={players}
                  type="text"
                  placeholder='4'
                  className={`${inputBase} p-3 border-pink-50 bg-pink-50/50 text-pink-600 focus:border-pink-500 placeholder:text-pink-200`}
                />
              </div>
              <div className="text-left">
                <label className={`${labelClass} text-pink-500`}>Rounds</label>
                <input
                  onChange={(e) => setRounds(e.target.value)}
                  value={rounds}
                  type="text"
                  placeholder='3'
                  className={`${inputBase} p-3 border-pink-50 bg-pink-50/50 text-pink-600 focus:border-pink-500 placeholder:text-pink-200`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={createHandler}
            disabled={loading}
            className="cursor-pointer w-full py-3.5 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-black rounded-xl shadow-lg shadow-pink-500/30 transition-all uppercase tracking-widest mt-4 text-xs"
          >
            {loading ? "Creating..." : "Create Game"}
          </button>
        </div>

      </main>

      <div className="py-6 text-center shrink-0">
        <span className="px-5 py-2.5 bg-black/20 backdrop-blur-md rounded-full text-white/90 text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-2xl inline-block">
          <span className="text-green-400 mr-2 animate-pulse">●</span>
          1,240 players active
        </span>
      </div>
    </div>
  );
};

export default DashBoard;