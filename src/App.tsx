import NavBar from "./NavBar";
import Home from "./pages/Home";
import CheckoutLines from "./pages/CheckoutLines.js";
import Problem2 from "./pages/Problem2";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CheckoutLines" element={<CheckoutLines />} />
          <Route path="/problem2" element={<Problem2 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
