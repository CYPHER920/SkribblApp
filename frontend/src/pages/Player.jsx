import { useState } from 'react';

const Player=({username})=>{

    const [ready,setReady]=useState(false);
    const [mic,setMic]=useState(false);
    return (
        <div>

        <h1>{username[0]}</h1>            
        <h3>{username}</h3>
        <button onClick={()=>setMic(!mic)}>{mic?"Mic On":"Mic off"}</button>
        <button onClick={()=>setReady(!ready)}>{ready?"Ready":"Not Ready"}</button>
        </div>
    )
}

export default Player;