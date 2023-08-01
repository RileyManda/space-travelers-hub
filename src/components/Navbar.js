import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => (
  <nav>
    <div className="logo-container">
      <Logo />
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

export default Navbar;
