import { Outlet } from "react-router-dom"
import Accountbar from "./Accountbar";
import "./Account.css"


const Account = ({ curUser, setCurUser }) => {
  return (
    <div className="Account">
      <div className="left">
        <Outlet />
      </div>
      <div className="right">
        <Accountbar curUser={curUser} setCurUser={setCurUser} />
      </div>

    </div>

  )

}


export default Account;
