import React, { useState, useEffect } from 'react';
import './Login.css'; // 確保您已經創建了Login.css檔案
import authService from './services/authService';
import { useNavigate } from 'react-router-dom';
function generateCaptcha() {
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += Math.floor(Math.random() * 10); // 生成0到9之間的隨機數字
  }
  return captcha;
}


const Forget = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [phone, setPhone] = useState('')
  const [checkpassword, setCheckpassword] = useState('')
  const [checkemail, setCheckemail] = useState('')

  useEffect(() => {
    setCaptcha(generateCaptcha()); // 在組件加載時生成新的驗證碼
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha()); // 生成新的驗證碼
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputCaptcha === captcha) {
      let reData = await authService.sendnewpassword(email)
      alert("已發送新密碼至" + email)

      console.log(reData.data)
      navigate("/account/login")
      // 在這裡添加登入邏輯
    } else {
      alert("驗證碼錯誤");
      refreshCaptcha();
      setInputCaptcha(''); // 清空輸入框
    }
  };

  return (
    <div className="login-container">
      <h1>忘記密碼</h1>
      <form className="login-form">
        <div className="form-group">

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button onClick={handleSubmit} className="submit-button">送出</button>
        </div>
      </form>
    </div>
  );
};

export default Forget;

