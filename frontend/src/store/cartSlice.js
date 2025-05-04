import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    selectedAll: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = state.items.find((item) => item._id === action.payload._id);
      if (product) {
        product.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1, selected: false }); // Thêm selected
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item._id === action.payload);
      if (itemIndex !== -1) {
        state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item._id === action.payload);
      if (product) product.quantity += 1;
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    toggleSelectItem: (state, action) => {
      const product = state.items.find((item) => item._id === action.payload);
      if (product) {
        product.selected = !product.selected;
      }
      state.selectedAll = state.items.every((item) => item.selected);
    },
    toggleSelectAll: (state) => {
      state.selectedAll = !state.selectedAll;
      state.items = state.items.map((item) => ({ ...item, selected: state.selectedAll }));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity,toggleSelectItem, toggleSelectAll } = cartSlice.actions;
export default cartSlice.reducer;
