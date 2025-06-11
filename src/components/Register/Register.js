import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import api from '../../services/api';
import './Register.css'; // Importar el archivo de estilos CSS
import { toast } from 'react-toastify';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');


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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === "") {
            notify("error", "Ingrese un nombre de usuario válido");
            return;
        }
        if (email === "") {
            notify("error", "Ingrese un correo de electrónico válido");
            return;
        }
        if (password !== passwordConfirm) {
            notify("error", "Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await api.post('/register', { username, password, email });
            notify("success", "Registro de usuario exitoso, puede iniciar sesión");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                notify("error", error.response.data.error)
            } else {
                notify("error", "Error al registrar el usuario")
            }
        }
    };

    return (
        <div className="login-container">
            <div className="background-image"></div>
            <div className="login-form">
                <h2>Registro de usuario</h2>
                <form className='form-login' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Repita la contraseña" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />

                    <button type="submit">Registrar</button>
                </form>
                <p className='my-3'>¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link></p>

            </div>
        </div>
    );
}

export default Register;
