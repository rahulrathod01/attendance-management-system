import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../services/authService';
import './ClientLogin.css';

function ClientLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { companyName, generatedPassword } = useParams();

    useEffect(() => {
        if (companyName) {
            setEmail(companyName);
        }
        if (generatedPassword) {
            setPassword(generatedPassword);
        }
    }, [companyName, generatedPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            localStorage.setItem('token', response.token);
            navigate('/client-dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Client Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <i className="fas fa-envelope"></i>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                        required 
                    />
                </div>
                <div>
                    <i className="fas fa-lock"></i>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default ClientLogin;
