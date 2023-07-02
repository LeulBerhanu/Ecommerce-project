import { useState, useEffect, useContext } from "react";
import { data } from "../../data";
import { v4 as uuidv4 } from "uuid";
import Card from "../components/utils/Card";
import Cart from "../components/utils/Cart";
import { CartContext } from "../App";

import "../components/componentsStyles.scss";

export default function Home() {
  const [cart, setCart] = useContext(CartContext);

  const [filteredProducts, setFilteredProducts] = useState(data);
  const [selectedFilters, setSelectedFilter] = useState([]);
  // const [cart, setCart] = useState([]);
  const [show, setShow] = useState(true);

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
    <>
      {/* <aside>
      </aside> */}
      <div className="layout">
        <div>
          <Cart />
        </div>
        <main>
          <div className="cards">
            {filteredProducts.map((item, index) => {
              return (
                <Card
                  className="cards__item"
                  addToCart={() => addToCart(item)}
                  {...item}
                  index={index}
                  key={uuidv4()}
                />
              );
            })}
          </div>
        </main>
        <div>
          <div className="size__filter">
            <p>Filter size</p>
            {filters.map((size, index) => (
              <button
                key={`filter-${index}`}
                className={`${
                  selectedFilters?.includes(size) ? "selected" : ""
                }`}
                onClick={() => handleFilterButtonClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
