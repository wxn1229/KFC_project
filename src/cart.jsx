import React, { useState } from 'react';
import './cart.css'; // 确保您的CSS文件路径正确
import { Link } from 'react-router-dom';
  


//傳餐點的名字、數量、錢、


function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      category: '楓糖香蒜脆雞XL超豪肯餐修改',
      details: ['楓糖香蒜脆雞(辣) x 2', '上校雞塊4塊 x 1', '香酥脆薯(中) x 1', '原味蛋撻 x 1', '百事可樂(中) x 1'],
      quantity: 2,
      price: 10, // 假设单价为10
    },
    {
      category: '楓糖香蒜脆雞XL超豪肯餐修改',
      details: ['楓糖香蒜脆雞(辣) x 2', '上校雞塊4塊 x 1', '香酥脆薯(中) x 1', '原味蛋撻 x 1', '百事可樂(中) x 1'],
      quantity: 2,
      price: 10, // 假设单价为10
    },
    // ...其他商品...
  ]);

  const [needBag, setNeedBag] = useState(false);
  const [bagQuantity, setBagQuantity] = useState(1);
  const bagPricePerUnit = 3;
  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const bagTotal = needBag ? bagQuantity * bagPricePerUnit : 0;
    return itemsTotal + bagTotal;
  };

  const handleModify = (index) => {
    // 在这里处理修改商品信息的逻辑
    // 可以通过 index 找到要修改的商品项，并进行相应的更新
    console.log(`修改商品索引为 ${index} 的信息`);
  };

  const handleDelete = (index) => {
    // 复制购物车项目数组并删除指定索引的项目
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    // 更新购物车项目
    setCartItems(updatedCartItems);
  };

  const handleBagChange = (e) => {
    setNeedBag(e.target.checked);
  };

  const handleBagQuantityChange = (e) => {
    setBagQuantity(e.target.value);
  };

  const renderBagOptions = () => {
    return needBag && (
      <div className="bag-options">
        <label htmlFor="bag-quantity">購物袋數量：</label>
        <select id="bag-quantity" value={bagQuantity} onChange={handleBagQuantityChange}>
          {[...Array(30).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        <div className="bag-price">價格: ${bagQuantity * bagPricePerUnit}</div>
      </div>
    );
  };

  const renderCartItems = () => {
    return (
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-details">
              <div className="category">{item.category}</div>
              <ul>
                {item.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="item-total">
              {item.quantity} 份 ${item.price * item.quantity}
            </div>
            <button className="modify-button" href="/" onClick={() => handleModify(index)}>
              修改
            </button>
            <button className="delete-button" onClick={() => handleDelete(index)}>
              删除
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="cart-container">
      {renderCartItems()}
      <div className="bag-selection">
        <label>
          <input type="checkbox" checked={needBag} onChange={handleBagChange} />
          我需要購物袋
        </label>
        {renderBagOptions()}
      </div>
      <div className="total-amount">
        <strong>總金額: ${calculateTotal()}</strong>
      </div>
      <div className="checkout-area">
        <Link to="/Checkout">
          <button className="checkout-button">立即結帳</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
