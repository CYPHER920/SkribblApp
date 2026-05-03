import axios from 'axios';

// This handles both Local and Production automatically
// Note: Changed process.env to import.meta.env since this is a Vite project
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://backendgame-latest.onrender.com";

const API = axios.create({
  baseURL: BASE_URL
});

export default API;
