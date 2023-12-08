import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout"
import './App.css'
import Homepage from "./Homepage";
import Indivdaul from "./Indivdual";
import MenuComponent from "./MenuComponent";

function App() {
  return (
    <BrowserRouter style={{ background: "#faf6f3" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="indivdual" element={<Indivdaul />}>

          </Route>

          <Route path="MenuComponent" element={<MenuComponent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>



  );
}

export default App;
