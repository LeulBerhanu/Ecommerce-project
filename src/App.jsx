import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import LoginPage from "./pages/LoginPage";
// import Cart from "./components/utils/Cart";
import CartPage from "./pages/CartPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Card />} /> */}
          <Route index element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="cart" element={<CartPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
