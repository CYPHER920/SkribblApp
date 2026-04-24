import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Signup from "./pages/Signup"
import Signin from './pages/Signin'
import DashBoard from './pages/DashBoard';
import Profile from './pages/Profile'
import Room from './pages/Room'
import Gamepage from './pages/GamePage'
import FinalResult from './pages/FinalResult';
function App() {

  // useEffect(()=>{
  //  const socket=io("http://localhost:4000");
  //  socket.on('connect',()=>{
  //   console.log("connectd",socket.id);
  //  })
  // },[])


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/room/:id' element={<Room />} />
        <Route path='/game/:id' element={<Gamepage />} />
        <Route path='/final-result' element={<FinalResult />} />
      </Routes >

    </BrowserRouter>
  )
}

export default App
