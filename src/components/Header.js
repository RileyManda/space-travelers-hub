import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => (
  <nav>
    <div className="logo-container">
      <Logo />
      <span className="logo-text">Space Travelers&apos; Hub</span>
    </div>
    <ul>
      <li>
        <Link to="/">Rockets</Link>
      </li>
      <li>
        <Link to="/missions">Missions</Link>
      </li>
    </ul>
  </nav>
);

export default Header;
