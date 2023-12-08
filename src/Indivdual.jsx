import ProductCard from "./ProductCard";
import "./Indivdual.css"
import React from "react";

const Indivdaul = () => {
  const products = [
    {
      title: "連連看優惠套餐XL超享組",
      items: ["連連看薯條(中) x 2", "上校雞塊4塊 x 1", "香酥雞腿(中) x 1"],
      price: "$235"
    },
    {
      title: "連連看優惠套餐XL超享組",
      items: ["連連看薯條(中) x 2", "上校雞塊4塊 x 1", "香酥雞腿(中) x 1"],
      price: "$235"
    },
    {
      title: "連連看優惠套餐XL超享組",
      items: ["連連看薯條(中) x 2", "上校雞塊4塊 x 1", "香酥雞腿(中) x 1"],
      price: "$235"
    },
    {
      title: "連連看優惠套餐XL超享組",
      items: ["連連看薯條(中) x 2", "上校雞塊4塊 x 1", "香酥雞腿(中) x 1"],
      price: "$235"
    },
    {
      title: "連連看優惠套餐XL超享組",
      items: ["連連看薯條(中) x 2", "上校雞塊4塊 x 1", "香酥雞腿(中) x 1"],
      price: "$235"
    },
    {
      title: "連連看優惠套餐XL超享組",
      items: ["連連看薯條(中) x 2", "上校雞塊4塊 x 1", "香酥雞腿(中) x 1"],
      price: "$235"
    },
    // ... 其他产品
  ];
  const titles = ["XL 超肯豪!餐", "L 絕配餐", "M 經典餐", "S 雞勵餐"]
  return (
    <div className="Indivdual">
      {titles.map((title, Titleindex) => (
        // 使用 React.Fragment 或 <> 来包裹相邻元素
        <React.Fragment key={Titleindex}>
          <h1 id={"Indivdual" + Titleindex}>{title}</h1>
          <div className="products">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                items={product.items}
                price={product.price}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>

  );
};


export default Indivdaul;
