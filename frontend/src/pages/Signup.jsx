import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Signup = () => {

    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    const [loading,setLoading]=useState(false);
    
    const handleSignin=()=>{
        navigate('/signin');
    }

    const handleSignup = async (e) => {
    e.preventDefault(); // Stops the page from reloading
    const formData={
      email,
      password,
      username
    }

    try{
      setLoading(true)
    const response =await axios.post("http://localhost:4000/api/v1/signup",formData,{
      withCredentials:true
    })
    setEmail("");
    setPassword("");
    setUsername("");
    console.log("Form submitted safely without page reload!");
    navigate('/dashboard');
    }
    catch(err){
      const errorMsg = err.response?.data?.message || err.message;
      console.error("Signup error: " + errorMsg);
      alert(errorMsg);
    }
    finally{
      setLoading(false);
    }
    // console.log(response.data);
    // Example: Logic to collect data would go here
  };
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      
      {/* Small Logo for sub-pages */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white tracking-tighter">
          Skrribl<span className="text-pink-300">.</span>
        </h1>
      </div>

      <div  className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label  className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">Email</label>
            <input 
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
              type="email" 
              placeholder="Enter email" 
              className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">Username</label>
            <input 
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
              type="text" 
              placeholder="Choose a name" 
              className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">Password</label>
            <input 
             onChange={(e)=>setPassword(e.target.value)}
             value={password}
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 mt-4 cursor-pointer"
          >
            "Sign Up"
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