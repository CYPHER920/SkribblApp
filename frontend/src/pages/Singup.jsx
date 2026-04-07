import React from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    const navigate=useNavigate();
    const handleSignin=()=>{
        navigate('/signin');
    }

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      
      {/* Small Logo for sub-pages */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Skrribl<span className="text-pink-300">.</span>
        </h1>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">Username</label>
            <input 
              type="text" 
              placeholder="Choose a name" 
              className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 mt-4 cursor-pointer"
          >
            Get Started
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Joined before? <span onClick={handleSignin} className="text-indigo-600 font-bold cursor-pointer hover:underline">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;