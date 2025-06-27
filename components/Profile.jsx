import React from 'react';
import './Profile.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../src/App'

const Profile = () => {
  const token = localStorage.getItem('ai-internal-tools-token')
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token]);

  function handleLogout() {
    localStorage.removeItem('ai-internal-tools-token')
    setUser(null)
    navigate('/');
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="top-bar">
          <button className="back-btn">{'<'}</button>
          <button onClick={handleLogout} className="logout-btn">Log out</button>
        </div>

        <h2 className="profile-title">Profile</h2>
        <div className="avatar"></div>

        <div className="profile-field">
          <label>Name</label>
          <input type="text" value={user?.name || ''} readOnly />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input type="text" value={user?.email || ''} readOnly />
        </div>

        <NavLink to="/profile/edit" className="edit-btn">Edit Profile</NavLink>
      </div>
    </div>
  );
};

export default Profile;

