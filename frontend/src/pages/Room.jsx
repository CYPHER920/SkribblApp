import { useState,useEffect } from 'react';
import Nav from './NavBar'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {io} from 'socket.io-client';
import Player from './Player'
const socket=io('http://localhost:4000');
const Room=()=>{
    const {id}=useParams();
    const [players,setPlayers]=useState([]);
    useEffect(()=>{
      const fetchUser=async ()=>{

        const response = await axios.get('http://localhost:4000/api/v1/userinfo',{withCredentials:true});
    
        socket.emit('join-room',{username:response.data.username,roomid:id});
      } 
      const fetchPlayers=async()=>{
          const response= await axios.get('http://localhost:4000/api/v1/getroom',{params:{roomid:id},withCredentials:true});
          setPlayers(response.data.room.players);
          console.log(response);
      }
      fetchUser();
      fetchPlayers();
      socket.on('user-connected',({username})=>{
        alert(`${username} joined the lobby`)
      })
      
    },[]);

   
   return (
        
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Nav/>
      <h1 className="text-4xl font-black mb-4">Lobby: <span className="text-pink-500">{id}</span></h1>
      <p className="text-slate-400 animate-pulse">Waiting for the host to start the game...</p>
       <div>
            {
               players.map((player)=>{
                return <Player username={player.username}/>
               })
            }
       </div>
    </div>
  );
}

export default Room;