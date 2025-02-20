import axios from 'axios';

// 🔹 Usa la URL de la API desplegada en lugar de localhost
const API_URL = 'https://pwaapi-one.vercel.app/api'; // Reemplaza con tu dominio real

// Configuración de Axios con interceptor para incluir el token en las peticiones autenticadas
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir el token automáticamente si está disponible
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Guarda el token en el almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Función para registrar un usuario
export const registerUser = async (userData: {
  email: string;
  username: string;
  password: string;
  role: string;
}) => {
  return apiClient.post('/register', userData);
};

// 🔹 Función para iniciar sesión
export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await apiClient.post('/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Guarda el token al iniciar sesión
  }
  return response;
};

// 🔹 Función para sembrar roles (solo para una vez)
export const seedRoles = async () => {
  return apiClient.post('/seedRoles');
};

// 🔹 Obtener todos los usuarios (requiere autenticación)
export const getUsers = async () => {
  return apiClient.get('/users');
};

// 🔹 Actualizar usuario
export const updateUser = async (userId: string, userData: { email?: string; username?: string; role?: string }) => {
  return apiClient.put(`/users/${userId}`, userData);
};

// 🔹 Eliminar usuario
export const deleteUser = async (userId: string) => {
  return apiClient.delete(`/users/${userId}`);
};

// 🔹 Obtener datos del usuario autenticado (si quieres mostrar perfil)
export const getProfile = async () => {
  return apiClient.get('/profile');
};

// 🔹 Cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token'); // Elimina el token del almacenamiento local
};
