import "./Head.css"
import { Link } from "react-router-dom"

const logoHandler = () => {

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

}

const Head = () => {
  return (
    <div className="Head">
      <div onClick={logoHandler} className="LogoandLogin">
        <Link className="logoLink" to="./">

          <img src="./img/Head/logo.png" alt="logo" className="logo" style={{ width: "66px" }} />
        </Link>
        <Link className="loginLink" to="#">
          <img src="./img/Head/login.png" alt="login" className="login" />
        </Link>

      </div>
    </div>

  );
};



export default Head;
