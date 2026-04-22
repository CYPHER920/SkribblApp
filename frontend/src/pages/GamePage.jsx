
import Nav from './NavBar'
import Chat from './Chat'
import Canvas from './Canvas'
import Word from './Word'
import PlayingPlayers from './PlayingPlayers'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import socket from './Socket'
import useGameStore from './Zustand'
const GamePage = () => {
    const { id } = useParams();
    // const [word, setWord] = useState("");
    const setWord = useGameStore((state) => state.setWord);
    const [currentRound, setCurrentRound] = useState(0);
    const [currentDrawer, setCurrentDrawer] = useState("");
    const [time, setTimer] = useState();
    useEffect(() => {

        const gameStart = () => {
            socket.emit('start-game', ({ id }));
        }
        gameStart();

        const settingRound = ({ round }) => {
            setCurrentRound(round);
        }
        const settingData = ({ word, player }) => {
            setWord(word);
            setCurrentDrawer(player.username);
        }

        const settingTimer = ({ time }) => {
            setTimer(time);
        }
        const timeup = ({ player }) => {
            if (player.username === currentDrawer) alert("Time is up!");
        }
        const gameOver = () => {
            alert("Game Over!");
        }
        socket.on('timeup', timeup);
        socket.on('setround', settingRound);
        socket.on('data', settingData);
        socket.on('settime', settingTimer);
        socket.on('game-over', gameOver);

        return () => {
            socket.off('timeup', timeup);
            socket.off('setround', settingRound)
            socket.off('data', settingData);
            socket.off('game-over', gameOver);
            socket.off('settime', settingTimer);
        };
    }, []);

    return (<div>
        <h1>Game Page</h1>

        <Nav />
        <div>
            <h1> Timer: {time}</h1>
            <h2> Round: {currentRound}</h2>
            <h2> Drawer: {currentDrawer}</h2>
        </div>
        <PlayingPlayers id={id} />
        <Word />
        <Canvas />
        <Chat id={id} />

    </div>)

}

export default GamePage;