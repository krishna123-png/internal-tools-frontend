import React from 'react';
import './EditProfile.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../src/App';
import { jwtDecode } from 'jwt-decode';

const EditProfile = () => {
  const token = localStorage.getItem('ai-internal-tools-token');
  const navigate = useNavigate();

  const { user, setUser } = React.useContext(AuthContext);
  const [formData, setFormdata] = React.useState({
    name: '',
    email: ''
  });

  React.useEffect(() => {
    if (!token) {
        navigate('/')
    }
    else {
        setFormdata({
            name: user.name,
            email: user.email
        })
    }
  }, [token]);

  function handleChange(e) {
    setFormdata(prev => {
        return {
            ...prev,
            [e.target.id]: e.target.value
        }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const token = localStorage.getItem('ai-internal-tools-token');
        console.log(token);
        if (formData.name.trim() === '' || formData.email.trim() === '') {
            return alert("name or email fields must be filled");
        }
        if (formData.name.trim() === user.name && formData.email.trim() === user.email) {
            navigate('/profile');
            return;
        }
        if ( formData.name.trim() !== user.name && formData.email.trim() === user.email) {
            const newToken = (await axios.put(`${import.meta.env.VITE_API_BASE}/api/auth/update`, { name: formData.name.trim() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data.token;
            const decoded = jwtDecode(newToken);
            localStorage.setItem('ai-internal-tools-token', newToken);
            setUser(decoded);
            navigate('/profile');       
        }
        if ( formData.name.trim() === user.name && formData.email.trim() !== user.email) {
            const newToken = (await axios.put(`${import.meta.env.VITE_API_BASE}/api/auth/update`, { email: formData.email.trim() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data.token;
            const decoded = jwtDecode(newToken);
            localStorage.setItem('ai-internal-tools-token', newToken);
            setUser(decoded);
            navigate('/profile');
        }
        if ( formData.name.trim() !== user.name && formData.email.trim() !== user.email ) {
            const newToken = (await axios.put(`${import.meta.env.VITE_API_BASE}/api/auth/update`, { name: formData.name.trim(), email: formData.email.trim() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).data.token;
            const decoded = jwtDecode(newToken);
            localStorage.setItem('ai-internal-tools-token', newToken);
            setUser(decoded);
            navigate('/profile');
        }
    }
    catch(error) {
        console.log(error);
    }
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-box">
        <button className="back-btn" onClick={() => navigate(-1)}>{'<'}</button>
        <h2 className="edit-profile-title">Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="save-btn">Save Changes</button>
        </form>

        <NavLink to="/profile" className="cancel-link">Cancel</NavLink>
      </div>
    </div>
  );
};

export default EditProfile;

