import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav>
      <Logo />
      <div className="tracker-links">
        <Link to="/register" className="nav-links">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
