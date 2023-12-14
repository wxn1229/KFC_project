
import "./Counter.css"

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MenuComponent.css'; // Assuming you have a CSS file for styling
import Menuleft from './Menuleft';
import Menuright from './Menuright';
import ComboService from './services/comboService';
import ItemService from './services/ItemService';

// MenuItem component for individual items
// FoodMenu component for the whole menu
//


const ItemComponent = () => {
  let { id } = useParams();
  const [itemsData, setItemsData] = useState([]);

  const [count, setCount] = useState(1)
  const [comboData, setCombo] = useState({});
  const [addPrice, setAddPrice] = useState(0);
  const [bonus, setBonus] = useState(0);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });

    const fetchData = async () => {



      let itemData = await ItemService.getItembyID(id)
      let foundItem = itemData.data.foundItem
      setCombo(foundItem)



      console.log({ msg: "combo data", comboData })

    }

    fetchData();

  }, [])

  // You would fetch or define your menu items here
  //
  const combo = { imagePath: "./img/combo/楓糖醬脆雞-XL-20231127.jpg", name: "炸機套餐", price: 235 };


  const menuItems = [
    { title: '主餐', name: "炸機", number: 1, isCanChange: false, image: './img/combo/楓糖醬脆雞-XL-20231127.jpg' },
    { title: '配餐', name: "蛋塔", number: 2, isCanChange: true, image: './img/combo/楓糖醬脆雞-XL-20231127.jpg' },

    // ... other menu items
  ];
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };


  return (
    <div className="foodMenu">
      <div className="menuHeader">
        <h1>Menu</h1>
        {/* You can add more header details here */}
      </div>
      <div className="menuItems">
        <Menuright count={count} setCount={setCount} menuItems={itemsData} combo={comboData} addPrice={addPrice} setAddPrice={setAddPrice} bonus={bonus} setBonus={setBonus} />

      </div>
      <div className="counter">
        <button onClick={decrementCount}>-</button>
        <span>{count}</span>
        <button onClick={incrementCount}>+</button>


      </div>
      {/* You can add more sections or components here as needed */}
    </div>
  );
};

export default ItemComponent;


