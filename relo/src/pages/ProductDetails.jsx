
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import { fetchProductByIdAPI } from "../services/productAPI";
import Loader from "../components/Loader";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProductByIdAPI(id);

        setProduct(data);

        const images = data.images || [];

        setSelectedImage(
          images[0] || data.thumbnail || ""
        );
      } catch (err) {
        setError(err.message || "Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <Loader message="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <div className="status-message">
        <h2>Product unavailable</h2>
        <p>{error || "Product not found"}</p>
      </div>
    );
  }

  const images = product.images || [];
  const categoryName =
    product.categoryName || product.category || "General";

  const mainImage =
    selectedImage || product.thumbnail || "";

  return (
    <main className="product-details">
      <div className="details-images">
        <img
          className="main-product-image"
          src={mainImage}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/500x500?text=No+Image";
          }}
        />

        <div className="thumbnail-list">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={
                mainImage === image
                  ? "thumbnail active"
                  : "thumbnail"
              }
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`${product.title} ${index + 1}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="details-info">
        <p className="product-category">
          {categoryName}
        </p>

        <h1>{product.title}</h1>

        <p className="details-price">
          ${Number(product.price).toFixed(2)}
        </p>

        <p className="details-description">
          {product.description}
        </p>

        <button
          type="button"
          className="add-to-cart-btn"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;