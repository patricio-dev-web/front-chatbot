// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import api from '../../services/api';
import './Login.css'; // Importar el archivo de estilos CSS
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);
  let navigate = useNavigate();

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-center"
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-center"
      })
    }
  };

  useEffect(() => {
    // Al cargar el componente, intenta obtener el usuario del localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      notify("success", "Inicio de sesión recordado");
      navigate(`/`);
    } else {
      // Si no hay usuario en el localStorage, redirige a "/"
      navigate(`/login`);
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      loginUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      navigate(`/`);
      notify("success", "Inicio de sesión exitoso");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        notify("error", error.response.data.error)
      } else {
        notify("error", "Error al iniciar sesión")
      }
    }
  };

  return (
    <div className="login-container">
      <div className="background-image"></div>
      <div className="login-form">
        <h2>Iniciar sesión</h2>
        <form className='form-login' onSubmit={handleSubmit}>
          <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Iniciar sesión</button>
        </form>
        <p className='my-3'>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>

      </div>
    </div>
  );
}

export default Login;
