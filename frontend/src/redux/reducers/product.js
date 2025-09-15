import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  product: null,
  success: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // 🔹 Get All Products
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔹 Get Product Details
    .addCase("getProductDetailsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getProductDetailsSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase("getProductDetailsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }) 

    // 🔹 Create Product
    .addCase("createProductRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("createProductSuccess", (state, action) => {
      state.isLoading = false;
      state.products = [action.payload, ...state.products];
      state.success = true; // ✅ yeh important hai
    })
    .addCase("createProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("productCreateReset", (state) => {
      state.success = false;
    })


    // 🔹 Get All Products (global)
.addCase("getAllProductsRequest", (state) => {
  state.isLoading = true;
})
.addCase("getAllProductsSuccess", (state, action) => {
  state.isLoading = false;
  state.products = action.payload;
})
.addCase("getAllProductsFailed", (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})


    // 🔹 Delete Product
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    })
    .addCase("deleteProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔹 Clear Errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
