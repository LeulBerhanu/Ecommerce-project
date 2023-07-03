import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Card />} /> */}
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="cart" element={<CartPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
