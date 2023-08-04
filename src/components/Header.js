import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
          <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Rockets</Link>
        </li>
        <li>
          <Link to="/missions" className={location.pathname === '/missions' ? 'active-link' : ''}>Missions</Link>
        </li>
        <span className="upbar">|</span>
        <li>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active-link' : ''}>My Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
