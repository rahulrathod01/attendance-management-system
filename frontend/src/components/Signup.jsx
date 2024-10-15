import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { email, password });
      console.log(response.data);

    } catch (err) {
      setError('Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Sign Up</h2>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
      {error && <div className="error">{error}</div>}
      <Link to="/signin" type="submit" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </Link>
    </form>
  );
}

export default SignUp;
