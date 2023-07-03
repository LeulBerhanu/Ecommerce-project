import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./componentsStyles.scss";
import { CartContext } from "../App";
import { totalQuantity } from "./utils/cartFunctions";

export default function Header() {
  const [cart] = useContext(CartContext);

  function calculateTotalQuantity() {
    return totalQuantity(cart);
  }

  return (
    <>
      <div className="navBar">
        <h1>E-commerce</h1>
        <div className="links">
          <NavLink className="link" to="/">
            Home
          </NavLink>
          <NavLink className="link" to="/products">
            Products
          </NavLink>
          <NavLink className="link cart__link" to="/cart">
            Cart
            {cart.length > 0 ? (
              <span className="counterOnLink">{calculateTotalQuantity()}</span>
            ) : null}
          </NavLink>
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
}
