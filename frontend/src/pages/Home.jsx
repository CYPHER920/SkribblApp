import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate=useNavigate();
    const handleSignup=()=>{
        navigate('/signup');
    }
    const handleSignin=()=>{
        navigate('/signin');
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-full max-w-sm transform transition-all hover:scale-105">
        
        {/* Logo Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tighter">
            Skrribl
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Ready to draw?</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button onClick={handleSignup} className="cursor-pointer w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-colors duration-200">
            Sign Up
          </button>
          
          <button onClick={handleSignin} className="cursor-pointer w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors duration-200">
            Sign In
          </button>
        </div>

        {/* Optional Footer */}
        <div className="mt-8 text-xs text-gray-400 uppercase tracking-widest">
          Join the fun
        </div>
      </div>
    </div>
  );
};

export default Home;