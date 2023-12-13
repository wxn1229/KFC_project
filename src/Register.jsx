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


const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [phone, setPhone] = useState('')
  const [checkpassword, setCheckpassword] = useState('')
  const [checkemail, setCheckemail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  useEffect(() => {
    setCaptcha(generateCaptcha()); // 在組件加載時生成新的驗證碼
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha()); // 生成新的驗證碼
  };

  const getcodeHandler = async (event) => {
    event.preventDefault();
    try {
      let getInfo = await authService.sendVerificationcode(email)
      console.log(getInfo.data)
      setVerificationCode(getInfo.data.code)
      alert("已寄出驗證郵件到 " + email)
    } catch (e) {
      console.log(e)

    }


  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (inputCaptcha === captcha) {

      if (password === checkpassword) {
        if (verificationCode === checkemail) {
          console.log({ phone, username, email, password, birthday });
          try {
            let registerUser = await authService.register(phone, username, email, password, birthday)
            console.log(registerUser.data)
            alert(registerUser.data.msg)
            navigate("/account/login")


          } catch (e) {
            alert(e.response.data)
          }
        }
        else {
          alert("信箱驗證碼錯誤")
        }


      }
      else {
        alert("確認密碼與密碼不一樣")
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
      <h1>加入會員</h1>
      <form className="login-form">

        <div className="form-group">
          <label htmlfor="phone">電話號碼</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}

          />
        </div>

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
        <div className="form-group">
          <label htmlFor="checkpassword">確認密碼</label>
          <input
            id="checkpassword"
            type="password"
            value={checkpassword}
            onChange={(e) => setCheckpassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">名字</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="birthday">生日</label>
          <input
            id="birthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="checkemail">email 驗證碼</label>
          <input
            id="checkemail"
            type="text"
            value={checkemail}
            onChange={(e) => setCheckemail(e.target.value)}
            placeholder="輸入email驗證碼"
          />
        </div>
        <div className="form-group">
          <button onClick={getcodeHandler} className="submit-button">獲取驗證碼</button>
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
          <button onClick={submitHandler} className="submit-button">註冊</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

