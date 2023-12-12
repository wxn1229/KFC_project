

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


const MenuComponent = () => {
  let { id } = useParams();
  const [itemsData, setItemsData] = useState([]);

  const [comboData, setCombo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let newData = [];
      let getData = await ComboService.getcombobyID(id);
      console.log(getData.data.foundcombo);
      let isFirst = true;
      for (const item of getData.data.foundcombo.items) {
        let itemData = await ItemService.getItembyID(item.item)
        item.itemName = itemData.data.foundItem.itemname;
        console.log({ msg: "this is a item", item })
        if (isFirst) {

          newData = [...newData, {
            title: "主餐",
            name: item.itemName,
            number: item.itemnumber,
            isCange: item.canChange,
            image: item.imgpath_inside,

          }]
        }
        else {

          newData = [...newData, {}]
        }

        setItemsData(newData);
        console.log(newData);

      }
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

  return (
    <div className="foodMenu">
      <div className="menuHeader">
        <h1>Menu</h1>
        {/* You can add more header details here */}
      </div>
      <div className="menuItems">
        <Menuleft menuItems={menuItems} />
        <Menuright combo={combo} />

      </div>
      {/* You can add more sections or components here as needed */}
    </div>
  );
};

export default MenuComponent;

