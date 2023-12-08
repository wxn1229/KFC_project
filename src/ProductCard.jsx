
import React from 'react';
import './ProductCard.css'; // 引入CSS样式文件

const ProductCard = ({ title, items, price }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src="./img/combo/楓糖醬脆雞-XL-20231127.jpg" alt="combo item" />
        {/* 在这里放置图片，例如: <img src={imageUrl} alt={title} /> */}
      </div>
      <div className="product-details">
        <h3>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="product-price">{price}</div>
        <button className="btn-order">訂購</button>
      </div>
    </div>
  );
};

export default ProductCard;
