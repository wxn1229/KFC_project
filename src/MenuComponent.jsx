

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
    window.scrollTo({
      top: 0,
      left: 0,
    });

    const fetchData = async () => {
      let newData = [];
      let getData = await ComboService.getcombobyID(id);
      let foundCombo = getData.data.foundcombo
      console.log({ msg: "this is found combo", foundCombo });



      let isFirst = true;
      for (const item of getData.data.foundcombo.items) {
        let itemData = await ItemService.getItembyID(item.item)
        let foundItem = itemData.data.foundItem

        console.log({ msg: "this is a foundItem", foundItem })
        if (isFirst) {

          newData = [...newData, {
            title: "主餐",
            name: foundItem.itemname,
            number: item.itemnumber,
            isCanChange: foundItem.canChange,
            image: foundItem.imgpath,

          }]
          isFirst = false
        }
        else {

          newData = [...newData, {
            title: foundItem.title,
            name: foundItem.itemname,
            number: item.itemnumber,
            isCanChange: foundItem.canChange,
            image: foundItem.imgpath,


          }]
        }

        setItemsData(newData);
        console.log(newData);


        console.log({ msg: "itmes data", itemsData })

      }

      setCombo(getData.data.foundcombo)

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

  return (
    <div className="foodMenu">
      <div className="menuHeader">
        <h1>Menu</h1>
        {/* You can add more header details here */}
      </div>
      <div className="menuItems">
        <Menuleft menuItems={itemsData} />
        <Menuright menuItems={itemsData} combo={comboData} />

      </div>
      {/* You can add more sections or components here as needed */}
    </div>
  );
};

export default MenuComponent;

