import { useParams, Link } from "react-router-dom";
import data from "../../data";

export default function ProductDetails() {
  const { productId } = useParams();
  const product = data.find((item) => item.id === productId);

  return (
    <>
      <Link to="/products">back to products</Link>
    </>
  );
}
