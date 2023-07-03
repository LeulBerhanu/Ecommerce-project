export default function addToCart(cardsItem, cart, setCart) {
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
