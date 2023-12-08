
// Homepage.jsx

import React, { useState } from 'react';
import LocationSelector from './LocationSelector';
import "./Homepage.css"
import AddressForm from './AdressForm';

const Homepage = () => {
  const [showSelector, setShowSelector] = useState("location-selector");

  const handleTabClick = (selector) => {
    setShowSelector(selector);
  }

  const getButtonClassName = (selector) => {

    return showSelector === selector ? "button-active" : "";
  }

  return (
    <div className="Homepage">
      <h1>HomePage</h1>
      <div className="pickupMeal">
        <button
          id="tab1"
          className={getButtonClassName("location-selector")}
          onClick={() => handleTabClick("location-selector")}
        >
          Location Selector
        </button>
        <button
          id="tab2"
          className={getButtonClassName("AddressForm")}
          onClick={() => handleTabClick("AddressForm")}
        >
          AddressForm
        </button>
        {showSelector === "location-selector" && <LocationSelector />}
        {/* 如果您有 LocationSelector2 组件，也可以像下面这样添加 */}
        {showSelector === "AddressForm" && <AddressForm />}
      </div>
    </div>
  );
};

export default Homepage;


