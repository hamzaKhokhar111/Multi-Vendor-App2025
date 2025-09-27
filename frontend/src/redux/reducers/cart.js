// reducers/cartReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => { // ✅ same name
      state.cart.push(action.payload);
    })
    .addCase("removeFromCart", (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});
