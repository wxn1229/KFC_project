import { Link } from "react-router-dom"
import "./Accountbar.css"



const Accountbar = () => {
  return (
    <nav className="vertical-navbar">
      <ul>
        <li><Link className="accountlink" to="/account/login">會員登入</Link></li>
        <li><Link className="accountlink" to="/account/register">註冊會員</Link></li>
        <li><Link className="accountlink" to="/account/forget">忘記密碼</Link></li>
      </ul>
    </nav>)
}


export default Accountbar
