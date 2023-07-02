import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
// import Cart from "./components/utils/Cart";
import CartPage from "./pages/CartPage";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Card />} /> */}
          <Route index element={<Home />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
