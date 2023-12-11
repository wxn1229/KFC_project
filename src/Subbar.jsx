import React from 'react';
import { useLocation } from 'react-router-dom';

import './Subbar.css'; // Import the CSS file

const Subbar = () => {
  const location = useLocation().pathname



  const scrollToElement = (id, offset = 200) => {

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };
  const indivdual_title = ["XL 超肯豪!餐", "L 絕配餐", "M 經典餐", "S 雞勵餐"]
  const share_title = ["2-4人歡聚餐", "5-7人歡聚餐"]
  const alacert_title = ["單點主餐", "蛋塔", "附餐", "飲料or湯品"]

  return (
    <div className="Subbar">
      <nav className="subbar">

        <ul className="subList">
          {(location === "/indivdual") && indivdual_title.map((title, Titleindex) => (
            <li className="subItem">
              <a className="subLink" href={`#Indivdual${Titleindex}`} onClick={(e) => {
                e.preventDefault();
                scrollToElement(`Indivdual${Titleindex}`);
              }}>
                {title}
              </a>
            </li>
          ))}
          {(location === "/share") && share_title.map((title, Titleindex) => (
            <li className="subItem">
              <a className="subLink" href={`#Indivdual${Titleindex}`} onClick={(e) => {
                e.preventDefault();
                scrollToElement(`Indivdual${Titleindex}`);
              }}>
                {title}
              </a>
            </li>
          ))}
          {(location === "/alacert") && alacert_title.map((title, Titleindex) => (
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

