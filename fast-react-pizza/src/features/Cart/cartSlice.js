import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',

  initialState: { cart: [] },

  reducers: {
    addToCart(state, action) {
      const cartItem = state.cart.find(item => item.id === action.payload.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        const item = { ...action.payload, quantity: 1 };
        state.cart.push(item);
      }
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },

    incrementItemQuantity(state, action) {
      const item = state.cart.find(item => item.id === action.payload);
      item.quantity++;
    },

    decrementItemQuantity(state, action) {
      const item = state.cart.find(item => item.id === action.payload);
      if (item.quantity === 1) {
        cartSlice.caseReducers.removeFromCart(state, action);
      }
      item.quantity--;
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export function getCart(state) {
  return state.cart.cart;
}
