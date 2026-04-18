
import Nav from './NavBar'
import Chat from './Chat'
import Canvas from './Canvas'
import Word from './Word'
import PlayingPlayers from './PlayingPlayers'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import socket from './Socket'
import axios from 'axios'
const GamePage = () => {
    const { id } = useParams();
   
    useEffect(()=>{

        socket.emit('gameinfo',{id});

    },[]);
   
    return (<div>
        <h1>Game Page</h1>

        <Nav />
        <PlayingPlayers id={id} />
        <Word />
        <Canvas />
        <Chat id={id} />


    </div>)
}

export default GamePage;