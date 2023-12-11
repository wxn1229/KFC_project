
import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <div className="Navbar">
      <nav className="navbar">
        <ul className="navList">
          <li className="navItem"><Link className="navLink" to="./indivdual">個人餐</Link></li>
          <li className="navItem"><Link className="navLink" to="./share">多人餐</Link></li>
          <li className="navItem"><Link className="navLink" to="./alacert">單點</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

