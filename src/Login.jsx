
import React, { useState, useEffect } from 'react';
import './Login.css'; // 確保您已經創建了Login.css檔案

// 生成隨機數字驗證碼的函數
function generateCaptcha() {
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += Math.floor(Math.random() * 10); // 生成0到9之間的隨機數字
  }
  return captcha;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha()); // 在組件加載時生成新的驗證碼
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha()); // 生成新的驗證碼
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputCaptcha === captcha) {
      console.log({ username, password, rememberMe });
      // 在這裡添加登入邏輯
    } else {
      alert("驗證碼錯誤");
      refreshCaptcha();
      setInputCaptcha(''); // 清空輸入框
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">用戶名/Email</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="captcha">驗證碼</label>
          <div onClick={refreshCaptcha} style={{ cursor: 'pointer', background: '#eee', padding: '10px', textAlign: 'center', marginBottom: '10px' }}>
            {captcha} {/* 顯示驗證碼，點擊刷新 */}
          </div>
          <input
            id="captcha"
            type="text"
            value={inputCaptcha}
            onChange={(e) => setInputCaptcha(e.target.value)}
            placeholder="輸入上面的驗證碼"
          />
        </div>
        <div className="form-group checkbox">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">記住用戶</label>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">登入</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

