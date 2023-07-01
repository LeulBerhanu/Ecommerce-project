import "./cartStyle.scss";

export default function Cart(props) {
  return (
    <div className="cart">
      <div className="cart__header">
        <h2>Cart</h2>
      </div>
      <div className="cart__body">
        <div className="cart__item"></div>
      </div>
      <div className="cart__footer">
        <h2>sub total</h2>
        <p>{props.price}</p>
      </div>
    </div>
  );
}
