

import React from 'react';
import './MenuComponent.css'; // Assuming you have a CSS file for styling
import Menuleft from './Menuleft';

// MenuItem component for individual items
// FoodMenu component for the whole menu
const MenuComponent = () => {
  // You would fetch or define your menu items here
  //
  const combo = { imagePath: "./img/combo/楓糖醬脆雞-XL-20231127.jpg", name: "炸機套餐", price: 235 };


  const menuItems = [
    { title: '主餐', name: "炸機", number: 1, isCanChange: false, image: './img/combo/楓糖醬脆雞-XL-20231127.jpg' },
    { title: '配餐', name: "蛋塔", number: 2, isCanChange: true, image: './img/combo/楓糖醬脆雞-XL-20231127.jpg' },

    // ... other menu items
  ];

  return (
    <div className="foodMenu">
      <div className="menuHeader">
        <h1>Menu</h1>
        {/* You can add more header details here */}
      </div>
      <div className="menuItems">
        <Menuleft menuItems={menuItems} />
      </div>
      {/* You can add more sections or components here as needed */}
    </div>
  );
};

export default MenuComponent;

