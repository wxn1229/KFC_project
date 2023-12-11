import ProductCard from "./ProductCard";
import "./Indivdual.css"
import React, { useEffect, useState } from "react";
import ComboService from "./services/comboService";
import ItemService from "./services/ItemService";



const Indivdaul = () => {

  const titles = ["XL 超豪肯! 餐", "L絕配餐", "M經典餐", "S 雞勵餐"]
  const [productsData, setproductsData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let newData = {};

      for (const title of titles) {
        let getdata = await ComboService.getcombobyTitle(title);
        let combos = getdata.data.foundcombo;

        for (const combo of combos) {
          for (const item of combo.items) {
            // 假设 getItembyID 返回一个包含名称的对象
            let itemData = await ItemService.getItembyID(item.item);
            item.itemName = itemData.data.foundItem.itemname; // 假设返回的对象有一个 'name' 字段
            console.log(itemData.data.foundItem.itemname)
          }
        }

        newData[title] = combos;
      }

      setproductsData(newData);
      console.log(newData)
    };

    fetchData();
  }, []);



  return (
    <div className="Indivdual">
      {titles.map((title, Titleindex) => (

        // 使用 React.Fragment 或 <> 来包裹相邻元素

        <React.Fragment key={Titleindex}>
          <h1 id={"Indivdual" + Titleindex}>{title}</h1>
          <div className="products">
            {Array.isArray(productsData[title]) && productsData[title]?.map((product, index) => (
              <ProductCard
                key={index}
                title={product.comboname}
                items={product.items}
                price={product.price}
                imgpath={product.imgpath}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>

  );
};


export default Indivdaul;
