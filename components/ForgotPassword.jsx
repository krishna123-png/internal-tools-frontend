import React, { useState } from 'react';
import './ForgotPassword.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
import { AuthContext } from '../src/App';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');

    /*React.useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, []);*/

    function handleChange(e) {
        setEmail(e.target.value.trim());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const message = (await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/forgot-password`, { email: email.trim() })).data.message;
            alert(message)
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        }
        catch(error) {
            console.log(error);
        }
    }



  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <button className="back-btn" onClick={() => navigate('/login')}>{'<'}</button>

        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">No problem! Enter your email below</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="reset-btn">Send Reset Link</button>
        </form>

        <NavLink to="/login" className="back-login">Back to log in</NavLink>
      </div>
    </div>
  );
};

export default ForgotPassword;

