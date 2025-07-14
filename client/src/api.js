import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://virtual-study-room-gwjx.onrender.com/api",
  withCredentials: true, // optional, depending on your setup
});

export default api;