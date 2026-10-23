import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/ProductCard.css";
function ProductCard({ product }) {
  const dispatch = useDispatch();
  const image = product.images?.[0];
  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-image-link"
      >
        <img
          src={image}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/400x400?text=No+Image";
          }}
        />
      </Link>
      <div className="product-info">
{product.category?.name?.toLowerCase() !==
  "updated category name" && (
  <p className="product-category">
    {product.category?.name || ""}
  </p>
)}
        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>
        <p className="product-price">
          ${Number(product.price).toFixed(2)}
        </p>

        <button
          type="button"
          className="add-to-cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
