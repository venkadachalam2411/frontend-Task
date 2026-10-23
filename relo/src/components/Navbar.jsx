import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";
function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/");
    }
  };
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/Relo-logo.png" alt="ReloKart" />
      </Link>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button" aria-label="Search">
          ⌕
        </button>
      </form>
      <div className="nav-links">
        <Link to="/" className="products-link">
          Home
        </Link>
        <Link to="/products" className="products-link">
          Products
        </Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-badge">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
