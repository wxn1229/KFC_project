import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css';
import listService from './services/listService';

const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const formatTime = (date) => {
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

function MainPage({ curUser, setCurUser }) {
  const navigate = useNavigate()
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

  const [selectedCity, setSelectedCity] = useState('請選擇');
  const [selectedArea, setSelectedArea] = useState('');
  const [serviceType, setServiceType] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [selectedTime, setSelectedTime] = useState(formatTime(today));
  const [isConfirmed, setIsConfirmed] = useState(false);
  const minDate = formatDate(today);
  const maxDate = formatDate(nextWeek);

  const cityOptions = ['請選擇', '台北市', '新北市', '桃園市'];
  const areaOptions = {
    '請選擇': ['請選擇'],
    '台北市': ['請選擇', '士林區', '大同區', '大安區'],
    '新北市': ['請選擇', '八里區', '三峽區', '三重區'],
    '桃園市': ['請選擇', '八德區', '大園區', '大溪區'],
  };
  const restaurants = {
    '士林區': [
      { name: '士林文昌餐廳', address: '台北市士林區中正路351號' },
    ],
    '大同區': [
      { name: '台北承德餐廳 (京站對面)', address: '台北市大同區承德路一段38號' },
    ],
    '大安區': [
      { name: '台北復興南餐廳', address: '台北市大安區復興南路二段183號' },
    ],
    '八里區': [
      { name: '新北八里餐廳', address: '新北市八里區中華路二段512號' },
    ],
    '三峽區': [
      { name: '三峽北大餐廳 (台北大學)', address: '新北市三峽區大學路150號' },
    ],
    '三重區': [
      { name: '三重正義餐廳', address: '新北市三重區正義北路139-141號' },
    ],
    '八德區': [
      { name: '桃園介壽餐廳', address: '桃園市八德區介壽路一段808號' },
    ],
    '大園區': [
      { name: '桃園大園餐廳 (大園農會對面)', address: '桃園市大園區中正東路142號' },
    ],
    '大溪區': [
      { name: '桃園大溪餐廳', address: '桃園市大溪區員林路一段199號' },
    ],
  };

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    setIsConfirmed(false);
    setSelectedCity('請選擇');
    setSelectedArea('');
    setSelectedRestaurant(null);
  };

  const handleConfirmClick = async () => {

    if (serviceType === 'pickup') {
      if (curUser) {
        try {

          let createlist = await listService.createList(curUser.user._id, selectedRestaurant.adress + selectedRestaurant.name, (selectedDate + selectedTime))
          console.log(createlist.data)

        } catch (e) {
          console.log(e)

        }







      }
      else {
        alert("請先登入")
        navigate("/account/login")

      }
    } else {
      if (curUser) {
        try {

          let createlist = await listService.createList(curUser.user._id, deliveryAddress, (selectedDate + " " + selectedTime))
          console.log(createlist.data)

        } catch (e) {
          console.log(e)

        }







      }
      else {
        alert("請先登入")
        navigate("/account/login")

      }

    }
  };

  const handleModifyClick = () => {
    setIsConfirmed(false);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea('');
    setSelectedRestaurant(null);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
    setSelectedRestaurant(null);
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="rectangle-box">
      {!isConfirmed ? (
        <>
          <div className='orderplace'>
            <button onClick={() => handleServiceTypeChange('pickup')}>預定快取</button>
            <button onClick={() => handleServiceTypeChange('delivery')}>專業外送</button>
          </div>

          {serviceType === 'pickup' && (
            <>
              <div>
                <h2>請選擇縣市：</h2>
                <select value={selectedCity} onChange={handleCityChange}>
                  {cityOptions.map((cityOption, index) => (
                    <option key={index} value={cityOption}>{cityOption}</option>
                  ))}
                </select>
              </div>

              {selectedCity !== '請選擇' && (
                <div>
                  <h2>請選擇地區：</h2>
                  <select value={selectedArea} onChange={handleAreaChange}>
                    {areaOptions[selectedCity].map((areaOption, index) => (
                      <option key={index} value={areaOption}>{areaOption}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCity !== '請選擇' && selectedArea !== '' && (
                <>
                  <div className="restaurant-list">
                    {selectedArea && restaurants[selectedArea] && restaurants[selectedArea].map((restaurant, index) => (
                      <div
                        key={index}
                        className={`restaurant-card ${selectedRestaurant?.name === restaurant.name ? 'selected' : ''}`}
                        onClick={() => handleRestaurantSelect(restaurant)}
                      >
                        <p>{restaurant.name}</p>
                        <p>{restaurant.address}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h2>請選擇取餐日期：</h2>
                    <input type="date" value={selectedDate} min={minDate} max={maxDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  </div>

                  <div>
                    <h2>請選擇取餐時間：</h2>
                    <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                  </div>

                  <button className="confirm-button" onClick={handleConfirmClick}>確定</button>
                </>
              )}
            </>
          )}

          {serviceType === 'delivery' && (
            <div>
              <h2>請輸入外送地址：</h2>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="輸入地址"
              />
              <div>
                <h2>請選擇取餐日期：</h2>
                <input type="date" value={selectedDate} min={minDate} max={maxDate} onChange={(e) => setSelectedDate(e.target.value)} />
              </div>

              <div>
                <h2>請選擇取餐時間：</h2>
                <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
              </div>
              <button className="confirm-button" onClick={handleConfirmClick}>確定</button>
            </div>
          )}
        </>
      ) : (
        <div>
          {serviceType === 'pickup' && selectedRestaurant && (
            <>
              <p>餐廳: {selectedRestaurant.name}</p>
              <p>地址: {selectedRestaurant.address}</p>
            </>
          )}
          {serviceType === 'delivery' && (
            <>
              <p>外送地址: {deliveryAddress}</p>
            </>
          )}
          <p>日期: {selectedDate}</p>
          <p>時間: {selectedTime}</p>
          <button className="modify-button" onClick={handleModifyClick}>修改</button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
