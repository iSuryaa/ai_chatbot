import axios from "axios";

const API = axios.create({
  baseURL: process.env.VITE_API_URL || "https://ai-chatbot-1-sbna.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
