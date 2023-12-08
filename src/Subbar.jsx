import React from 'react';
import { Link } from "react-router-dom";
import './Subbar.css'; // Import the CSS file

const Subbar = () => {

  const scrollToElement = (id, offset = 200) => {

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };
  const titles = ["XL 超肯豪!餐", "L 絕配餐", "M 經典餐", "S 雞勵餐"]
  return (
    <div className="Subbar">
      <nav className="subbar">

        <ul className="subList">
          {titles.map((title, Titleindex) => (
            <li className="subItem">
              <a className="subLink" href={`#Indivdual${Titleindex}`} onClick={(e) => {
                e.preventDefault();
                scrollToElement(`Indivdual${Titleindex}`);
              }}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

    </div >
  );
};

export default Subbar;

