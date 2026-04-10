import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/userinfo', {
          withCredentials: true
        });
        
        // Axios wraps the backend JSON in a .data property
        setUserData(response.data);
      } catch (err) {
        console.error("Authentication failed:", err.message);
        setError(true);
      }
    };

    fetchUser();
  }, []);

  const handleLogin=()=>{
    navigate('/');
  }

  if (error) {
  return (
    <button 
      onClick={handleLogin} 
      className="cursor-pointer px-6 py-2 rounded-xl font-bold text-white 
                 bg-gradient-to-r from-pink-500 to-rose-500 
                 hover:from-indigo-600 hover:to-purple-600 
                 transition-all duration-500 ease-in-out shadow-lg hover:shadow-indigo-500/50"
    >
      Join to play
    </button>
  );
}
  if (!userData) return <div className="text-white">Loading profile...</div>;

  return (
  <div className="flex items-center gap-4 p-2 bg-white/5 rounded-2xl border border-white/10">
    {/* The Avatar Circle */}
    <div className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-full text-white font-bold uppercase shadow-lg shadow-pink-500/20">
      {userData.username[0]}
    </div>
    
    {/* The Username Text */}
    <div>
      <p className="text-[10px] text-pink-300 uppercase tracking-widest font-bold">Player</p>
      <p className="text-white font-medium leading-tight">{userData.username}</p>
    </div>
  </div>
);
};

export default Profile;