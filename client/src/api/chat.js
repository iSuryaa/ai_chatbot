// src/api/chat.js
import api from "./axios";

export const fetchChatHistory = async () => {
  const { data } = await api.get("/chat/history");
  return data;
};

export const sendMessage = async (text) => {
  const { data } = await api.post("/chat/send", { text });
  return data;
};
