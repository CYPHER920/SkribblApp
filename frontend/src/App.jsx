import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Signup from "./pages/Singup"
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
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
