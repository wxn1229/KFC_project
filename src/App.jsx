import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout"
import './App.css'
import Homepage from "./Homepage";

function App() {
  return (
    <BrowserRouter style={{ background: "#faf6f3" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>



  );
}

export default App;
