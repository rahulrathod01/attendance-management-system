import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./CompanyLogin.css";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        alert("Login failed. Please check your credentials.");
        return null;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response) {
      localStorage.setItem("token", response.token);
      if (rememberMe) {
        localStorage.setItem("email", email);
      }
      navigate("/register");
    }
  };

  return (
    <div className="company-login-container">
      <div className="company-logo">
        <img src="/logo.png" alt="Company Logo" />
      </div>
      <h2>COMPANY LOGIN</h2>
      <form className="company-login-form" onSubmit={handleSubmit}>
        <div className="company-form-group">
          <i className="fas fa-envelope icon"></i>
          <input
            className="company-login-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="comapny-form-group">
          <i className="fas fa-lock icon"></i>
          <input
            className="company-login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="company-form-footer">
          <div className="company-remember-me">
            <input
              type="checkbox"
              id="company-remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="company-remember-me">Remember me</label>
          </div>
          <a href="/forgot-password" className="company-forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="company-login-button">
          Login
        </button>
      </form>
      {errorMessage && <p className="companyt-error-message">{errorMessage}</p>}
    </div>
  );
};

export default CompanyLogin;
