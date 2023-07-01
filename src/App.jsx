import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import Home from "./pages/Home.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Card />} /> */}
        <Route index element={<Home />} />
        <Route path="cart" element={<h1>Cart</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
