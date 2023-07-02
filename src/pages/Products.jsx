import { useState, useEffect, useContext } from "react";
import { data } from "../../data";
import Cart from "../components/utils/Cart";
import Cards from "../components/utils/Cards";
import "../components/componentsStyles.scss";

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [selectedFilters, setSelectedFilter] = useState([]);
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

  return (
    <>
      <div className="layout">
        <div className="side-bar">
          <Cart />
        </div>
        <main>
          <Cards filteredProducts={filteredProducts} />
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
