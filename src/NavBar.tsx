import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/ReactStuff">Home</Link>
        </li>
        <li>
          <Link to="/CheckoutLines">Checkout Lines</Link>
        </li>
        <li>
          <Link to="/Sudoku">Sudoku</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
