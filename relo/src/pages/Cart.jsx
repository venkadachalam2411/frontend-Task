import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Cart.css";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);
  const freeShippingLimit = 100;
  const shipping =
    subtotal === 0 || subtotal >= freeShippingLimit ? 0 : 5.99;
  const total = subtotal + shipping;
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h1>Your cart is empty</h1>
          <p>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="cart-page">
      <h1 className="cart-heading">Shopping Cart</h1>
      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => {
            const image =
              item.images?.[0] ||
              item.image ||
              item.thumbnail ||
              "";
            const name = item.title || item.name || "Product";
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            return (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img
                    src={
                      image ||
                      "https://placehold.co/200x200?text=No+Image"
                    }
                    alt={name}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://placehold.co/200x200?text=No+Image";
                    }}
                  />
                </div>
                <div className="cart-item-info">
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-title"
                  >
                    {name}
                  </Link>

                  <p className="cart-item-price">
                    ${price.toFixed(2)}
                  </p>
                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      aria-label={`Decrease ${name} quantity`}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                      aria-label={`Increase ${name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <strong>
                    ${(price * quantity).toFixed(2)}
                  </strong>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
          <div className="cart-bottom-actions">
            <Link to="/" className="continue-link">
              ← Continue Shopping
            </Link>
            <button
              type="button"
              className="clear-cart-button"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </section>
        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <p className="shipping-note">
            {subtotal >= freeShippingLimit
              ? "You've qualified for free shipping!"
              : `Spend $${(
                  freeShippingLimit - subtotal
                ).toFixed(2)} more for free shipping.`}
          </p>
          <div className="summary-total">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button
            type="button"
            className="checkout-button"
            onClick={() =>
              alert("Checkout functionality will be added later.")
            }
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
}
export default Cart;
