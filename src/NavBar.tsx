import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/CheckoutLines">Checkout Lines</Link>
        </li>
        <li>
          <Link to="/problem2">problem 2</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
