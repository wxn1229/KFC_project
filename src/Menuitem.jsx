
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
const Menuitem = ({ count, setCount, menuItems, combo, bonus }) => {
  console.log({ msg: "this is munuright combo", combo })
  return (
    <div className="Menuright">
      <img src={"/img/food/" + combo.imgpath_inside} alt="image" />
      <h2>{combo.itemname}</h2>
      {/*menuItems.map((item, index) => (
        <p key={index}>{item.name} x{item.number * count}</p>
      ))*/}

      <hr />

      <div className="total">
        <div>
          餐點小記
        </div>
        <div className="price">
          $ {combo.price * count}
        </div>
      </div>




    </div>
  );
};

export default Menuitem;
