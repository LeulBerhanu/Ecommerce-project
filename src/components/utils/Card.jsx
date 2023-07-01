import "./cardStyle.scss";

export default function Card(props) {
  return (
    <div className="card">
      <img src={props.image[0]} alt={props.name} />
      <div className="card__detail">
        <h3 className="card__title">{props.name}</h3>
        <p>$ {props.price}</p>
        <p>{props.size.join(", ")}</p>
      </div>
      <button className="btn" onClick={props.addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
