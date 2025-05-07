// Header.js

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import '../css/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // 🔑 Use auth context

  const handleLogout = () => {
    localStorage.removeItem('customerId');
    setIsLoggedIn(false); // ✅ Update global login state
    navigate('/');
  };

  return (
    <nav className='nav-container'>
      <div className='head-logo'>
        <h2>IOB Bank</h2>
      </div>

      <div className='nav-list'>
        <br />
        {!isLoggedIn ? (
          <>
            <NavLink to="/" className="list-item">Home</NavLink>
            <NavLink to="/login" className="list-item">Login</NavLink>
            <NavLink to="/register" className="list-item">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/customer" className="list-item">Dashboard</NavLink>
            <button onClick={handleLogout} className="list-item logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
