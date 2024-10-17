import { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response) {
      localStorage.setItem('token', response.token);
      navigate('/register');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input 
          className="login-input" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          className="login-input" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button className="login-button" type="submit" href='/register'>Login</button>
      </form>
    </div>
  );
};

export default Login;
