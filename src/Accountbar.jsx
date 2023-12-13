import { Link } from "react-router-dom"
import "./Accountbar.css"
import authService from "./services/authService"



const Accountbar = ({ curUser, setCurUser }) => {
  const logoutHandler = () => {
    authService.logout()
    setCurUser(authService.getCurUser())
    alert("成功登出")

  }
  return (
    <nav className="vertical-navbar">
      <ul>
        {!curUser && <li><Link className="accountlink" to="/account/login">會員登入</Link></li>}
        {!curUser && <li><Link className="accountlink" to="/account/register">註冊會員</Link></li>}
        {!curUser && <li><Link className="accountlink" to="/account/forget">忘記密碼</Link></li>}
        {curUser && <li><Link onClick={logoutHandler} className="accountlink" to="/">登出</Link></li>}
      </ul>
    </nav>)
}


export default Accountbar
