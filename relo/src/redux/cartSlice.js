
import { createSlice } from "@reduxjs/toolkit";

// Load cart items saved in localStorage
const getSavedCart = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// Save cart items to localStorage
const saveCart = (items) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.error("Unable to save cart:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: getSavedCart(),
  },

  reducers: {
    // Add a product to the cart
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      saveCart(state.items);
    },

    // Increase product quantity
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => String(item.id) === String(action.payload)
      );

      if (item) {
        item.quantity += 1;
      }

      saveCart(state.items);
    },

    // Decrease quantity; remove item when it reaches zero
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => String(item.id) === String(action.payload)
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (product) =>
              String(product.id) !== String(action.payload)
          );
        }
      }

      saveCart(state.items);
    },

    // Remove one product completely
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload)
      );

      saveCart(state.items);
    },

    // Empty the entire cart
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
