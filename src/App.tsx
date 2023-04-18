import NavBar from "./NavBar";
import Home from "./pages/Home";
import CheckoutLines from "./pages/CheckoutLines";
import Sudoku from "./pages/Sudoku";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CheckoutLines" element={<CheckoutLines />} />
          <Route path="/Sudoku" element={<Sudoku />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
