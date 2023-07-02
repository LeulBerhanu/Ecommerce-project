import { useState, useContext } from "react";
import Card from "./Card";
import { CartContext } from "../../App";

function Cards({ filteredProducts }) {
  const [cart, setCart] = useContext(CartContext);

  function addToCart(cardsItem) {
    const itemIndex = cart.findIndex(
      (cartItem) => cartItem.id === cardsItem.id
    );

    if (itemIndex !== -1) {
      setCart((prevCart) => {
        return prevCart.map((item, i) => {
          if (i === itemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      });
    } else {
      setCart((prevCart) => {
        return [
          ...prevCart,
          {
            ...cardsItem,
            quantity: 1,
            addedToCart: true,
          },
        ];
      });
    }
  }

  return (
    <div className="cards">
      {filteredProducts.map((item, index) => {
        return (
          <Card
            className="cards__item"
            addToCart={() => addToCart(item)}
            {...item}
            index={index}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default Cards;
