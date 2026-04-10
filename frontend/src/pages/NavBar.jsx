import Profile from './Profile'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const NavBar=()=>{
    
    const navigate=useNavigate();
    const handleLogout = async () => {
    // Logic for logout  goes here
    
    await axios.post(
      'http://localhost:4000/api/v1/logout',
      {},
      {
        withCredentials: true
      }
    );
    console.log("Logged out");
    navigate('/signin');
  };
    return (
        <div>
        {/* Top Navigation Bar */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Skrribl<span className="text-pink-300">.</span>
        </h1>
        
        <div className="flex items-center gap-6">
          <Profile />
          <button 
            onClick={handleLogout}
            className="cursor-pointer text-white bg-white/10 hover:bg-red-500/80 px-4 py-2 rounded-lg text-sm font-bold transition-all border border-white/20"
          >
            Logout
          </button>
        </div>
      </nav>
      </div>
    )

}

export default NavBar;