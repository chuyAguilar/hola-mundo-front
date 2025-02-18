// src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ajusta el puerto si es necesario

export const registerUser = (userData: {
  email: string;
  username: string;
  password: string;
  role: string;
}) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials: { username: string; password: string }) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const seedRoles = () => {
  return axios.post(`${API_URL}/seedRoles`);
};
