import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./CompanyLogin.css";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
    <div className="login-container">
      <div className="logo">
        <img src="/logo.png" alt="Talent Corners" />
      </div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <i className="fas fa-envelope icon"></i>
          <input
            className="login-from-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <i className="fas fa-lock icon"></i>
          <input
            className="login-from-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default CompanyLogin;