import React, { useState } from 'react';
import axios from 'axios';
import './ClientLogin.css';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/client-login', {
        email,
        password,
      });

      console.log('Login successful:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        if (rememberMe) {
          localStorage.setItem('email', email);
        }
        window.location.href = response.data.redirectURL;
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="client-login-container">
      <div className="client-logo">
        <img src="/logo.png" alt="Company Logo" />
      </div>
      <h2>CLIENT LOGIN</h2>
      <form className="client-login-form" onSubmit={handleSubmit}>
        <div className="client-form-group">
          <i className="fas fa-envelope icon"></i>
          <input
            className="client-login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="client-form-group">
          <i className="fas fa-lock icon"></i>
          <input
            className="client-login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="client-form-footer">
          <div className="client-remember-me">
            <input
              type="checkbox"
              id="client-remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="client-remember-me">Remember me</label>
          </div>
          <a href="/forgot-password" className="client-forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="client-login-button">
          Login
        </button>
      </form>
      {errorMessage && <p className="client-error-message">{errorMessage}</p>}
    </div>
  );
};

export default ClientLogin;
