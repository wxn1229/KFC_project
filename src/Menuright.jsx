
import React from 'react';
import "./Menuright.css"

// A functional component for a menu item
const MenuItem = ({ title, name, number, isCanChange, image }) => {
  return (
    <div className="menuright">

      <img src={image} alt={name} className="menu-item-image" />
      <h1>套餐</h1>
      <div className="menu-item-content">
        <div className="menu-item-header">{title}</div>
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-number">x{number}</div>
        {isCanChange && <button className="change-button">更換</button>}
      </div>
    </div>
  );
};

// The Menu component that would render all the menu items
const Menuright = ({ menuItems }) => {
  return (
    <div className="menu">

      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          name={item.name}
          number={item.number}
          isCanChange={item.isCanChange}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Menuright;
