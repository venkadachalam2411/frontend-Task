import { Link } from "react-router-dom";
import "../styles/Footer.css";
function Footer() {
  return (
    <footer className="shopkart-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Relo<span>Kart</span>
            </Link>
            <p>
              Discover products you'll love. Enjoy a simple,
              convenient shopping experience with ShopKart.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">FB</a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">YT</a>
            </div>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Shopping Cart</Link>
          </div>
          <div className="footer-links">
            <h3>Customer Service</h3>
            <a href="mailto:support@shopkart.example">Contact Us</a>
            <Link to="/products">Browse Products</Link>
            <Link to="/cart">Your Cart</Link>
          </div>
          <div className="footer-newsletter">
            <h3>Stay in the Loop</h3>
            <p>Explore our latest products and collections.</p>
            <Link to="/products" className="footer-shop-button">
              Start Shopping →
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ReloKart. All rights reserved.</p>
          <p>
            Made for a better shopping experience <span>♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
