import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://chatbot-desafio.site/api", // Utiliza la variable de entorno
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // No añadir el token en las rutas de login y registro
    const isAuthPath = config.url.includes('/login') || config.url.includes('/register');
    if (!isAuthPath) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Mostrar la ruta a la que se hace la solicitud

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
