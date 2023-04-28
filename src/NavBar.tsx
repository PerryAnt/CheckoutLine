import React, { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <nav className="nav">
        <Link to="/ReactStuff/">Home</Link>
        <Link to="/CheckoutLines/">Checkout Lines</Link>
        <Link to="/Sudoku/">Sudoku</Link>
      </nav>
      <div className="container">
        <Suspense fallback={<h1>Loading</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default NavBar;
