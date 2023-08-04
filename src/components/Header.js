import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const location = useLocation();

  return (
    <nav>
      <div className="logo-container">
        <Logo />
        <span className="logo-text">Space Travelers&apos; Hub</span>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={location.pathname === '/' ? 'active-link' : ''}>Rockets</NavLink>
        </li>
        <li>
          <NavLink to="/missions" className={location.pathname === '/missions' ? 'active-link' : ''}>Missions</NavLink>
        </li>
        <span className="upbar">|</span>
        <li>
          <NavLink to="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}>My Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
