// src/api/auth.js
import api from "./axios";

export const login = async (form) => {
  const { data } = await api.post("/auth/login", form);
  return data;
};

export const signup = async (form) => {
  const { data } = await api.post("/auth/signup", form);
  return data;
};

export const forgot = async (form) => {
  const { data } = await api.post("/auth/reset-password", form);
  return data;
};
