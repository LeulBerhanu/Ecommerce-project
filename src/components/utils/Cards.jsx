import { useContext } from "react";
import Card from "./Card";
import { CartContext } from "../../App";
import { Link } from "react-router-dom";
import addToCart from "./addToCart";

function Cards({ filteredProducts }) {
  const [cart, setCart] = useContext(CartContext);

  function handleAddToCart(cardItem) {
    addToCart(cardItem, cart, setCart);
  }

  return (
    <div className="cards">
      {filteredProducts.map((item, index) => {
        return (
          <Card
            key={item.id}
            className="cards__item"
            addToCart={() => handleAddToCart(item)}
            {...item}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default Cards;
