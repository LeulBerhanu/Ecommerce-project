export function addToCart(cardsItem, cart, setCart) {
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === cardsItem.id);

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

export function totalQuantity(cart) {
  return cart.reduce((acc, item) => (acc += item.quantity), 0);
}

export function totalPrice(cart) {
  return parseFloat(
    cart
      .reduce((acc, item) => (acc += item.price * item.quantity), 0)
      .toFixed(2)
  );
}
