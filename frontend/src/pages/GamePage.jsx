
import Nav from './NavBar'
import Chat from './Chat'
import { useParams } from 'react-router-dom'
const GamePage = () => {
    const { id } = useParams();

    return (<div>
        <h1>Game Page</h1>
        <Nav />
        <Chat id={id} />

    </div>)
}

export default GamePage;