import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL || "https://backendgame-latest.onrender.com");

export default socket;