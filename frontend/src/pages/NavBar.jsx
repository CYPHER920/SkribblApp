import Profile from './Profile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Logic for logout goes here
    try {
      await axios.post(
        'http://localhost:4000/api/v1/logout',
        {},
        {
          withCredentials: true
        }
      );
      console.log("Logged out");
      navigate('/signin');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Top Navigation Bar */}
      <nav className="w-full flex justify-between items-center bg-white/10 backdrop-blur-xl px-6 py-4 rounded-[2rem] border border-white/20 shadow-xl mb-6 transition-all hover:border-white/30 hover:bg-white/15">
        <h1
          className="text-3xl sm:text-4xl font-black text-white tracking-tighter cursor-pointer hover:scale-105 transition-transform drop-shadow-md"
          onClick={() => navigate('/')}
        >
          Skrribl<span className="text-pink-400 animate-pulse">.</span>
        </h1>

        <div className="flex items-center gap-3 sm:gap-6">
          <Profile />
          <button
            onClick={handleLogout}
            className="cursor-pointer text-white bg-white/5 hover:bg-rose-500 px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black tracking-[0.15em] uppercase transition-all duration-300 shadow-lg hover:shadow-rose-500/30 border border-white/10 hover:border-rose-400"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;