import { useState } from "react";
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
    <div className="card">
      <img src={props.image[0]} alt={props.name} />
      <div className="card__detail">
        <h3 className="card__title">{props.name}</h3>
        <p>$ {props.price}</p>
        {/* <p>{props.size.join(", ")}</p> */}
      </div>

      <div
        className="card__footer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovering ? (
          <div className="card__item__size">
            {props.size.map((item) => {
              return <button onClick={props.addToCart}>{item}</button>;
            })}
          </div>
        ) : (
          <button className="btn">Add to Cart</button>
        )}
      </div>
    </div>
  );
}
