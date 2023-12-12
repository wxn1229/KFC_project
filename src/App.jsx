import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout"
import './App.css'
import Homepage from "./Homepage";
import Indivdaul from "./Indivdual";
import MenuComponent from "./MenuComponent";
import Share from "./Share";
import Alacert from "./Alacert";
import Login from "./Login";
import Account from "./Account";
import Register from "./Register";
import Forget from "./Forget";
import { useState } from "react";

function App() {
  const [adress, setAdress] = useState("");


  return (
    <BrowserRouter style={{ background: "#faf6f3" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="indivdual" element={<Indivdaul />}></Route>
          <Route path="share" element={< Share />}></Route>
          <Route path="alacert" element={<Alacert />} ></Route>

          <Route path="account" element={< Account />}>
            <Route path="login" element={< Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="forget" element={<Forget />}></Route>
          </Route>

          <Route path="menu/combo/:id" element={<MenuComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>



  );
}

export default App;
