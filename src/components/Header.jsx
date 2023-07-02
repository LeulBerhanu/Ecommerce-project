import { Link, NavLink } from "react-router-dom";
import "./componentsStyles.scss";

export default function Header() {
  return (
    <>
      <div className="navBar">
        <h1>E-commerce</h1>
        <div className="links">
          <NavLink className="link" to="/">
            Home
          </NavLink>
          <NavLink className="link" to="/cart">
            cart
          </NavLink>
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
}
