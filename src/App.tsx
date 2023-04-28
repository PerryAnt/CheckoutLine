import { Suspense, lazy } from "react";
import NavBar from "./NavBar";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const CheckoutLines = lazy(() => import("./pages/CheckoutLines"));
const Sudoku = lazy(() => import("./pages/Sudoku"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/ReactStuff/" element={<Home />} />
          <Route path="/CheckoutLines/" element={<CheckoutLines />} />
          <Route path="/Sudoku/" element={<Sudoku />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
