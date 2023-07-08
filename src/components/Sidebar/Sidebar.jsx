import React from 'react';
import { Link } from 'react-router-dom';

import { menu } from '../../menu-items';
import { FaSignOutAlt } from 'react-icons/fa';
import avatar from '../../img/avatar.jpg';

import './Sidebar.css';

const Sidebar = ({ active, setActive }) => {
  return (
    <div className="sidebar">
      <div className="user">
        <img src={avatar} alt="user" className="user-avatar" />
        <div className="user-info">
          <h2>Alex</h2>
          <p>
            <span className="title">Total Money:</span> $1500
          </p>
        </div>
      </div>
      <div className="menu-list">
        {menu.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            onClick={() => setActive(item.id)}
            className={active === item.id ? 'active' : ''}
          >
            {item.icon}
            <span className="title">{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="logout">
        <Link to="/logout">
          <FaSignOutAlt /> <span className="title">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
