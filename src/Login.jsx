
import React, { useState, useEffect } from 'react';
import './Login.css'; // 確保您已經創建了Login.css檔案
import { useNavigate } from 'react-router-dom';

import authService from './services/authService';

// 生成隨機數字驗證碼的函數
function generateCaptcha() {
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += Math.floor(Math.random() * 10); // 生成0到9之間的隨機數字
  }
  return captcha;
}

const Login = ({ curUser, setCurUser }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [email, setEmail] = useState('')

  useEffect(() => {
    setCaptcha(generateCaptcha()); // 在組件加載時生成新的驗證碼
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha()); // 生成新的驗證碼
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (inputCaptcha === captcha) {

      try {
        let loginUser = await authService.login(email, password)
        console.log(loginUser.data)
        localStorage.setItem("user", JSON.stringify(loginUser.data))
        setCurUser(authService.getCurUser())
        alert(loginUser.data.msg)

        navigate("/")

      } catch (e) {
        alert(e.response.data)

      }
      // 在這裡添加登入邏輯
    } else {
      alert("驗證碼錯誤");
      refreshCaptcha();
      setInputCaptcha(''); // 清空輸入框
    }
  };






  return (

    <div className="login-container">
      {curUser &&
        <div className="form-group">
          <h1>會員資訊</h1>
          <h3>email: {curUser.user.email}</h3>
          <h3>電話號碼: {curUser.user.phone}</h3>
          <h3>名字: {curUser.user.username}</h3>
          <h3>生日: {curUser.user.birthday}</h3>
        </div>
      }
      {!curUser &&
        <form className="login-form">
          <h1>會員登入</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group captchadiv">
            <label htmlFor="captcha">驗證碼</label>
            <div onClick={refreshCaptcha} style={{ cursor: 'pointer', background: '#eee', padding: '10px', textAlign: 'center', marginBottom: '10px' }}>
              {captcha} {/* 顯示驗證碼，點擊刷新 */}
            </div>
            <input
              id="captcha"
              type="text"
              value={inputCaptcha}
              onChange={(e) => setInputCaptcha(e.target.value)}
              placeholder="輸入驗證碼"
            />
          </div>
          <div className="form-group">
            <button onClick={submitHandler} className="submit-button">登入</button>
          </div>
        </form>
      }
    </div>

  );
};

export default Login;

