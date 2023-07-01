import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";
import Cart from "./components/utils/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Card />} /> */}
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
