
import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <div className="Navbar">
      <nav className="navbar">
        <ul className="navList">
          <li className="navItem"><Link className="navLink" to="#">個人餐</Link></li>
          <li className="navItem"><Link className="navLink" to="#">多人餐</Link></li>
          <li className="navItem"><Link className="navLink" to="#">早餐</Link></li>
          <li className="navItem"><Link className="navLink" to="#">單點</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

