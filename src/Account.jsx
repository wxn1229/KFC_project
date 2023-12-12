import { Outlet } from "react-router-dom"
import Accountbar from "./Accountbar";
import "./Account.css"


const Account = () => {
  return (
    <div className="Account">
      <div className="left">
        <Outlet />
      </div>
      <div className="right">
        <Accountbar />
      </div>

    </div>

  )

}


export default Account;
