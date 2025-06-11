import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    // Al cargar el componente, intenta obtener el usuario del localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Si no hay usuario en el localStorage, redirige a "/"
      const url = window.location.href
      if (url.includes('register')){
        navigate(`/register`);
      }else{
        navigate(`/login`);
      }
      
    }
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
