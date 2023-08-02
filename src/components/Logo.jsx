import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <span style={{ marginLeft: '2px', letterSpacing: '.1rem' }}>Tracker</span>
    </div>
  );
};

export default Logo;
