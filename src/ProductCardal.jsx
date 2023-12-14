
import React from 'react';
import './ProductCard.css'; // 引入CSS样式文件
import { Link } from 'react-router-dom';

const ProductCard = ({ title, items, price, imgpath, _id }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={"./img/food/" + imgpath} alt="combo item" />
        {/* 在这里放置图片，例如: <img src={imageUrl} alt={title} /> */}
      </div>
      <div className="product-details">
        <h3>{title}</h3>
        <ul>
          {Array.isArray(items) && items.map((item, index) => (
            <li key={index}>{item.itemName} x{item.itemnumber}</li>
          ))}
        </ul>
        <div className="product-price">${price}</div>
        <button className="btn-order"><Link to={"../menu/item/" + _id}>訂購</Link></button>
      </div>
    </div>
  );
};

export default ProductCard;
