import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        if (response) {
            localStorage.setItem('token', response.token);
            if (rememberMe) {
                localStorage.setItem('email', email);
            }
            navigate('/register');
        }
    };

    return (
        <div className="login-container">
            <div className="logo">
                <img src="/logo.png" alt="Talent Corners" />
            </div>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <i className="fas fa-envelope icon"></i>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder="Enter your email" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <i className="fas fa-lock icon"></i>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                        required 
                    />
                </div>
                <div className="form-footer">
                    <div className="remember-me">
                        <input 
                            type="checkbox" 
                            id="remember-me" 
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)} 
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
