import { useContext, useState } from "react";
import "./cartStyle.scss";
import { v4 as uuidv4 } from "uuid";
import { CartContext } from "../../App";

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);

  const totalQuantity = cart.reduce((acc, item) => (acc += item.quantity), 0);
  const totalPrice = parseFloat(
    cart
      .reduce((acc, item) => (acc += item.price * item.quantity), 0)
      .toFixed(2)
  );

  function increaseQuantity(index) {
    setCart((prevCart) => {
      return prevCart.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
    });
  }

  function decreaseQuantity(index) {
    setCart((prevCart) => {
      return prevCart.map((item, i) => {
        if (i === index && item.quantity > 1) {
          return {
            key: uuidv4(),
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          return item;
        }
      });
    });
  }

  function handleRemoveItem(index) {
    setCart((prevCart) => {
      return prevCart.filter((item, i) => (i !== index ? item : null));
    });
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h2>Cart</h2>
        {cart.length ? <p>{totalQuantity}</p> : null}
      </div>
      <div className="cart__body">
        {cart.length > 0 ? (
          cart.map((item, index) => {
            return (
              <div className="cartItem" key={item.id}>
                <div className="cartItem__body">
                  <img src={item.image[0]} alt={item.name} />
                  <p className="cartItem__name">{item.name}</p>

                  {/* <p className="cartItem__selectedSizes">{item.size[0]}</p> */}
                </div>
                <div className="cartItem__footer">
                  <div className="cartItem__counter">
                    <button
                      className="cartItem__increaseQty"
                      onClick={() => increaseQuantity(index)}
                    >
                      +
                    </button>
                    <button
                      className="cartItem__decreaseQty"
                      onClick={() => decreaseQuantity(index)}
                    >
                      -
                    </button>
                  </div>
                  <p className="cartItem__price">
                    ${Math.floor(item.price * item.quantity * 100) / 100}
                  </p>
                  <p className="cartItem__quantity">{item.quantity}</p>
                </div>
                <button
                  className="cartItem__delete"
                  onClick={() => handleRemoveItem(index)}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <h2 className="no__item">No item</h2>
        )}
        <div className="cart__item"></div>
      </div>
      <div className="cart__footer">
        <p>sub total</p>
        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
}
