import ProductCard from "./ProductCard";
import "./Indivdual.css"
import React, { useEffect, useState } from "react";
import ComboService from "./services/comboService";
import ItemService from "./services/ItemService";



const Alacert = () => {

  const titles = ["單點主餐", "蛋塔", "附餐", "飲料or湯品"]
  const [productsData, setproductsData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let newData = {};

      for (const title of titles) {
        let getdata = await ItemService.getItemsbyTitle(title);
        let items = getdata.data.foundItem;


        newData[title] = items;
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
                title={product.itemname}
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


export default Alacert;
