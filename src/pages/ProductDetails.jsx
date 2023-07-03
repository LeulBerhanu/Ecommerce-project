import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../App";
import { data } from "../../data";

import addToCart from "../components/utils/addToCart";
import { v4 as uuidv4 } from "uuid";
import "./pagesStyle.scss";

export default function ProductDetails() {
  const [cart, setCart] = useContext(CartContext);

  const { productId } = useParams();
  const product = data.find((item) => item.id === productId);

  const [selectedImage, setSelectedImage] = useState(product.image[0]);

  function handleHover(selectedImage) {
    setSelectedImage(selectedImage);
  }

  function handleAddToCart() {
    addToCart(product, cart, setCart);
  }

  return (
    <div className="product__detail__page">
      <Link to="/products">back to products</Link>
      <div className="product__detail__layout">
        <div id="leftColumn">
          <div className="product__detail__imageBar">
            {product.image.map((image, index) => {
              return (
                <img
                  key={uuidv4 + index}
                  onMouseEnter={() => handleHover(image)}
                  src={image}
                  alt="list of image"
                />
              );
            })}
          </div>
          <img className="selected__image" src={selectedImage} alt="" />
        </div>
        <div id="centerColumn">
          <div className="product__detail__box">
            <div className="product__details">
              <h2>{product.name}</h2>
              <p>{product.details}</p>
              <hr />
              <span>${product.price}</span>
            </div>
          </div>
        </div>
        <div id="rightColumn">
          <button onClick={() => handleAddToCart()} className="addToCart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
