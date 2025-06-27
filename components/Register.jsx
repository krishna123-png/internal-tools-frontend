import React from 'react';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../src/App';

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = React.useContext(AuthContext)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const token = (await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/register`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim()
      })).data.token

      const decoded = jwtDecode(token)
      localStorage.setItem('ai-internal-tools-token', token);
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
    <div className="register-container">
      <div className="register-box">
        <NavLink to="/" className="back-link">← Back to Home</NavLink>
        <h2 className="register-title">Register</h2>
        <p className="register-subtitle">Create an account</p>
        
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="John Doe" required onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="johndoe@example.com" required onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" required onChange={handleChange}/>
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <p className="redirect-login">
          Already have an account? <NavLink to="/login">Log in</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;

