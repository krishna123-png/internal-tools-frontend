import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../src/App';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthContext);
  const [ formData, setFormData ] = React.useState({
    email: '',
    password: ''
  });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const token = (await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        email: formData.email,
        password: formData.password
      })).data.token;
      
      const decoded = jwtDecode(token)
      localStorage.setItem('ai-internal-tools-token', token)
      setUser(decoded)
      navigate('/')
    }
    catch (error) {
      console.log(error);
    } 
  }

  function handleChange(e) {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>Log in</h1>
        <p className="welcome-text">Welcome back!</p>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="johndoe@example.com" required onChange={handleChange} />

          <div className="password-label">
            <label htmlFor="password">Password</label>
            <NavLink to="/forgot-password" className="forgot-link">Forgot password?</NavLink>
          </div>
          <input type="password" id="password" placeholder="••••••••" required onChange={handleChange}/>

          <button type="submit" className="login-btn">Log in</button>
        </form>

        <p className="signup-text">
          Don't have an account? <NavLink to="/register" className="signup-link">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
}

