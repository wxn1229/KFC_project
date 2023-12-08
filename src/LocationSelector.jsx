
import React, { useState } from 'react';

const LocationSelector = () => {
  // 縣市數據
  const counties = {
    '台北市': ['信義區', '大安區', '中山區'],
    '高雄市': ['三民區', '左營區', '鼓山區'],
    // 其他縣市及其城市
  };

  // 狀態
  const [selectedCounty, setSelectedCounty] = useState('');
  const [cities, setCities] = useState([]);

  // 處理縣市選擇的變化
  const handleCountyChange = (event) => {
    const county = event.target.value;
    setSelectedCounty(county);
    setCities(counties[county] || []);
  };

  return (
    <div>
      <select value={selectedCounty} onChange={handleCountyChange}>
        <option value="">選擇縣市</option>
        {Object.keys(counties).map((county) => (
          <option key={county} value={county}>{county}</option>
        ))}
      </select>
      <select disabled={!selectedCounty}>
        <option value="">選擇城市</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;



