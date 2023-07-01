import { useState, useEffect } from "react";
import { data } from "../../data";
import { v4 as uuidv4 } from "uuid";
import Card from "../components/utils/Card";
import Cart from "../components/utils/Cart";

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [selectedFilters, setSelectedFilter] = useState([]);
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(true);

  const totalQuantity = cart.reduce((acc, item) => (acc += item.quantity), 0);
  const totalPrice = parseFloat(
    cart
      .reduce((acc, item) => (acc += item.price * item.quantity), 0)
      .toFixed(2)
  );

  const filters = ["xs", "s", "m", "l", "xl", "xxl"];

  function handleFilterButtonClick(selectedSize) {
    if (selectedFilters.includes(selectedSize)) {
      const filters = selectedFilters.filter(
        (element) => element !== selectedSize
      );
      setSelectedFilter(filters);
    } else {
      setSelectedFilter([...selectedFilters, selectedSize]);
    }
  }

  useEffect(() => {
    filterProducts();
  }, [selectedFilters]);

  function filterProducts() {
    if (selectedFilters.length > 0) {
      const tempItems = selectedFilters.map((sizeFromFilters) => {
        const temp = data.filter((item) => item.size.includes(sizeFromFilters));
        return temp;
      });
      const duplicatesRemoved = tempItems
        .flat()
        .filter((value, index, self) => self.indexOf(value) === index);
      setFilteredProducts(duplicatesRemoved);
    } else {
      setFilteredProducts([...data]);
    }
  }

  function handleSlide() {
    setShow(!show);
  }

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
    <body>
      <aside>
        <div className="cart__bar">
          <div className="cart__bar--header">
            <p>Cart</p>
          </div>
          <div className="cart__bar--body">
            {cart.length > 0 ? (
              cart.map((item, index) => {
                return (
                  <div className="cart" key={Math.random()}>
                    <div className="cart__image__container">
                      <img src={item.image[0]} alt="" />
                    </div>
                    <div className="cart__details">
                      <div className="cart__item__name">{item.name}</div>
                      <div className="cart__item__size">{item.size.xl}</div>
                      <div className="cart__item__quantity">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="cart__nav">
                      <button
                        className="cart__item__delete"
                        onClick={() => handleRemoveItem(index)}
                      >
                        X
                      </button>
                      <div className="cart__item__price">
                        ${Math.floor(item.price * item.quantity * 100) / 100}
                      </div>
                      <div className="cart__item__counter">
                        <button
                          className="cart__increaseQty"
                          onClick={() => increaseQuantity(index)}
                        >
                          +
                        </button>
                        <button
                          className="cart__decreaseQty"
                          onClick={() => decreaseQuantity(index)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>No item</h2>
            )}
          </div>
          <div className="cart__bar--footer">
            <p>Subtotal</p>
            <p className="total__price">$ {totalPrice}</p>
          </div>
        </div>
      </aside>
      <main>
        <div className="cards">
          {filteredProducts.map((item, index) => {
            return (
              <Card
                addToCart={() => addToCart(item)}
                {...item}
                index={index}
                key={uuidv4()}
              />
            );
          })}
        </div>
      </main>
      <div className="size__filter">
        <p>Filter size</p>
        {filters.map((size, index) => (
          <button
            key={`filter-${index}`}
            className={`${selectedFilters?.includes(size) ? "selected" : ""}`}
            onClick={() => handleFilterButtonClick(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </body>
  );
}
