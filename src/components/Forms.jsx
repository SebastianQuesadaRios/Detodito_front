import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Forms.css';

function Forms({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleLogin = async () => {
        setError('');
        setSuccess('');

        const loginData = {
            email: username,
            password,
        };

        try {
            const response = await fetch('https://detodito-back.vercel.app/v1/margarita/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.status);
                callback(result.userId, result.role);
                console.log('Login exitoso:', { username, password });
                navigate('/reclamar-codigo');
            } else {
                setError(result.message);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setError('Error al intentar iniciar sesión. Intente de nuevo más tarde.');
        }
    };

    const handleRegister = () => {
        navigate('/registro'); // Navega a la ruta de registro
    };

    return (
        <div className="login-container">
            <h2 className="login-title">¡Detodito te premia por comer!</h2>
            <p className="login-subtitle">Inicia sesión para registrar un codigo</p>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="form-group">
                <label htmlFor="username">
                    <span className="icon">🙍‍♂️</span> Usuario
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    <span className="icon">🔒</span> Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                />
            </div>
            <button className="login-button" onClick={handleLogin}>Entrar</button>
            <button className="login-button" onClick={handleRegister}>Registrarse</button> {/* Botón de registro */}
        </div>
    );
}

export default Forms;

