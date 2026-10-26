import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchProductsAPI } from "../services/productAPI";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsAPI();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    {
      name: "Laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    },
    {
      name: "Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
    {
      name: "Tablets",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    },
    {
      name: "Smartwatches",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
  ];

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-content">
          <span className="hero-label">
            YOUR EVERYDAY SHOPPING DESTINATION
          </span>

          <h1>
            Find Your
            <br />
            <span>Next Favourite.</span>
          </h1>

          <p>
            Discover great products, explore new styles, and
            find everything you need in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="hero-primary-btn">
              Shop Now <span>→</span>
            </Link>

            <a href="#categories" className="hero-secondary-btn">
              Explore Categories
            </a>
          </div>

          <div className="hero-benefits">
            <span>✓ Easy Shopping</span>
            <span>✓ Great Selection</span>
            <span>✓ Secure Checkout</span>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
            alt="A modern shopping store"
          />

          <div className="hero-image-tag">
            <span>YOUR STYLE</span>
            <strong>Your Way.</strong>
          </div>
        </div>
      </section>

      <section className="home-benefits">
        <div className="benefit-item">
          <span className="benefit-icon">↗</span>
          <div>
            <h3>Easy to Explore</h3>
            <p>Find products with ease</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">◇</span>
          <div>
            <h3>Quality Choices</h3>
            <p>Products for everyday life</p>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">♡</span>
          <div>
            <h3>Made for You</h3>
            <p>A simple shopping experience</p>
          </div>
        </div>
      </section>

      <section className="home-section" id="categories">
        <div className="home-section-heading">
          <div>
            <span className="section-eyebrow">
              EXPLORE OUR COLLECTION
            </span>
            <h2>Shop by Category</h2>
            <p>Discover something you will love.</p>
          </div>

          <Link to="/products" className="section-link">
            View all products →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <Link
              to={`/products?category=${encodeURIComponent(item.name)}`}
              className="category-card"
              key={item.name}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
              />

              <div className="category-overlay">
                <h3>{item.name}</h3>
                <span>Explore collection →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section featured-section">
        <div className="home-section-heading">
          <div>
            <span className="section-eyebrow">
              HANDPICKED FOR YOU
            </span>
            <h2>Featured Products</h2>
            <p>Explore some of our available products.</p>
          </div>

          <Link to="/products" className="section-link">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="home-loading">
            Loading products...
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="home-product-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="home-loading">
            Products are unavailable right now. Please try again later.
          </p>
        )}

        <div className="featured-bottom">
          <Link to="/products" className="hero-primary-btn">
            Browse All Products →
          </Link>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span>YOUR NEXT GREAT FIND IS WAITING</span>
          <h2>Ready to find something you love?</h2>
          <p>Explore our collection and make shopping simple.</p>
        </div>

        <Link to="/products" className="cta-button">
          Start Shopping →
        </Link>
      </section>
    </main>
  );
}

export default Home;
