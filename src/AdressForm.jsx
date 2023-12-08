
import React, { useState } from 'react';

const AddressForm = () => {
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为
    console.log('Submitted address:', address);
    // 在这里，您可以添加将地址发送到服务器的代码
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="addressInput">地址:</label>
      <input
        type="text"
        id="addressInput"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="请输入地址"
      />
      <button type="submit">提交</button>
    </form>
  );
};

export default AddressForm;
