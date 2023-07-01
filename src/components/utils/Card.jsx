import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./cardStyle.scss";

export default function Card(props) {
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  return (
    <React.Fragment>
      <div className="card">
        <img src={props.image[0]} alt={props.name} />
        <div className="card__detail">
          <h3 className="card__title">{props.name}</h3>
          <p>$ {props.price}</p>
        </div>

        <div
          className="card__footer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovering ? (
            <div className="card__item__size">
              {props.size.map((item) => {
                return (
                  <button key={uuidv4()} onClick={props.addToCart}>
                    {item}
                  </button>
                );
              })}
            </div>
          ) : (
            <button className="btn">Add to Cart</button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
