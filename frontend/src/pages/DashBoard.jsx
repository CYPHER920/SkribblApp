import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [roomcode, setRoomcode] = useState('');
  const [players,setPlayers]=useState('');
  const [rounds,setRounds]=useState('');
  const navigate = useNavigate();

  const joinHandler = async () => {
    // 1. Create a local trimmed version to avoid mutating state
    const cleanRoomCode = roomcode.trim();

    if (!cleanRoomCode) {
      return alert("Please enter a room code!");
    }

    try {
      setLoading(true);
      
      // 2. Send the request with the clean code
      const response = await axios.post(
        'http://localhost:4000/api/v1/joinroom',
        { roomcode: cleanRoomCode },
        { withCredentials: true }
      );

      if (response.data.success) {
        // 3. Navigate to the dynamic room route
        navigate(`/room/${cleanRoomCode}`);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid Room Code! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createHandler = () => {
    navigate('/createroom');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <NavBar />

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Join Room Card */}
        <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center text-center transition-transform hover:scale-[1.03] group">
          <div className="text-5xl mb-4 group-hover:animate-bounce">🎮</div>
          <h2 className="text-2xl font-black text-indigo-600 mb-2 uppercase italic">Join Room</h2>
          <p className="text-gray-500 mb-6 font-medium text-sm">Have a code? Jump into a friend's game!</p>
          
          {/* Styled Input */}
          <input 
            type="text" 
            value={roomcode}
            onChange={(e) => setRoomcode(e.target.value)} 
            placeholder='ENTER CODE' 
            className="w-full mb-4 p-4 rounded-2xl border-2 border-indigo-50 bg-indigo-50/50 text-center font-black text-indigo-600 placeholder:text-indigo-300 outline-none focus:border-indigo-500 focus:bg-white transition-all tracking-widest uppercase"
            required 
          />

          <button 
            disabled={loading} 
            onClick={joinHandler} 
            className="cursor-pointer w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Checking...
              </>
            ) : "Join Room"}
          </button>
        </div>

        {/* Create Room Card */}
        <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center text-center transition-transform hover:scale-[1.03] group">
          <div className="text-5xl mb-4 group-hover:rotate-12 transition-transform">🎨</div>
          <h2 className="text-2xl font-black text-pink-500 mb-2 uppercase italic">Create Room</h2>
          <p className="text-gray-500 mb-6 font-medium text-sm">Host your own lobby and invite others.</p>
          
          {/* Spacer to keep buttons aligned since the other card has an input */}
          <div className="h-[68px] invisible md:block hidden"></div>
            <label htmlFor="">No of player</label> <input onChange={(e)=>setPlayers(e.target.value)} value={players} required type="text" placeholder='enter the no of players' />
            <label htmlFor=""> no of rounds </label> <input onChange={(e)=>setRounds(e.target.value)} value={rounds}  required type="text"  placeholder='enter no of rounds' />
          <button 
            onClick={createHandler} 
            className="cursor-pointer w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all"
          >
            Create Room
          </button>
        </div>

      </main>

      {/* Footer Info */}
      <div className="mt-12 text-center">
        <span className="px-4 py-2 bg-black/20 backdrop-blur-md rounded-full text-white/90 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 shadow-xl">
          <span className="text-green-400 mr-2 inline-block animate-pulse">●</span> 
          1,240 players online
        </span>
      </div>
    </div>
  );
};

export default DashBoard;