import axios from 'axios';
import { useEffect, useState } from 'react';

const PlayingPlayers = ({ id }) => {
    const [players, setPlayers] = useState([]);
    // const [currentPlayer,setCurrentPlayer]=useState("");
    useEffect(() => {
        const getPlayers = async () => {
            try {
                const result = await axios.get('http://localhost:4000/api/v1/getroom', {
                    params: { roomid: id },
                    withCredentials: true
                });
                const allPlayers=result.data.room.players;
                const currPlayer=await axios.get('http://localhost:4000/api/v1/userInfo',{withCredentials:true});
                setPlayers(allPlayers.filter((player)=>{
                     return player.username!==currPlayer.data.username;
                }) );
    
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        if (id) {
            getPlayers();
        }
    }, [id]);

    return (
        <div>
            {
                players.map((player, index) => {
                    return <div key={index}>
                        <h1>{player.username?.[0].toUpperCase() || '?'}</h1>
                        <h2>{player.username || 'Unknown player'}</h2>
                    </div>
                })
            }
        </div>
    );
};
export default PlayingPlayers;
