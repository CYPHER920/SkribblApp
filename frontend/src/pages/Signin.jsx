
  import {useNavigate} from 'react-router-dom'
  import axios from 'axios'
  import { useState } from 'react';
  const Signin = () => {

    /*{Loader for button}*/
    const [loading,setLoading]=useState(false);

  /// SignIn form variables

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  // Event handler s
  
    const navigate=useNavigate(); // for navigating pages

        const singupHandler=()=>{
            navigate('/signup');
        }
  
  
  const handleSubmit =  async (e) => {
      e.preventDefault();
      console.log(email,password);
      
      try{
        setLoading(true);
        const formData={email,password};
        const response=await axios.post('http://localhost:4000/api/v1/signin',formData,{
          withCredentials:true
        });
        setEmail("");
        setPassword("");
        navigate('/dashboard');
      }
      catch(err)
      {
        const errorMsg = err.response?.data?.message || err.message;
        console.error("Signup error: " + errorMsg);
        alert(errorMsg);
      }
      finally{
        setLoading(false);
      }
    
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
        
        {/* Brand Logo */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Skrribl<span className="text-pink-300">.</span>
          </h1>
        </div>

        {/* Signin Card */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-8">Login to start sketching!</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">
                Email Address
              </label>
              <input value={email} onChange={(e)=>{setEmail(e.target.value)}}
                type="email" 
                placeholder="enter email" 
                className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
                required 
              />
            </div>

            {/* Password Field */}
            <div>
              <label  className="block text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 ml-1">
                Password
              </label>
              <input value={password}  onChange={(e)=>{
                  setPassword(e.target.value) }}
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-2xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-indigo-50/30"
                required 
              />
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading}
              type="submit" 
              className=" cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 mt-2"
            >
                "Sign In"
            </button>
          </form>

          {/* Redirect to Signup */}
          <p className="mt-6 text-center text-sm text-gray-500">
            New to Skrribl? <span onClick={singupHandler} className="text-indigo-600 font-bold cursor-pointer hover:underline">Create an account</span>
          </p>
        </div>
      </div>
    );
  };

  export default Signin;