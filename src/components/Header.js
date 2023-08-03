import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Header = () => (
  <nav>
    <div className="logo-container">
      <Logo />
      <span className="logo-text">Space Travelers&apos; Hub</span>
    </div>
    <ul className="nav-list">
      <li>
        <NavLink exact to="/" activeClassName="active-link">Rockets</NavLink>
      </li>
      <li>
        <NavLink to="/missions" activeClassName="active-link">Missions</NavLink>
      </li>
      <span className="upbar">|</span>
      <li>
        <NavLink to="/profile" activeClassName="active-link">My Profile</NavLink>
      </li>
    </ul>
  </nav>
);

export default Header;
