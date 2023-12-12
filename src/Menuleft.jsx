
import React from 'react';
import "./Menuleft.css"

// A functional component for a menu item
const MenuItem = ({ title, name, number, isCanChange, image }) => {
  return (
    <div className="menu-item">

      <img src={"/img/food/" + image} alt={name} className="menu-item-image" />
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
const Menuleft = ({ menuItems }) => {
  return (
    <div className="Menuleft">
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

export default Menuleft;
