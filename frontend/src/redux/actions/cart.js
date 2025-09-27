// actions/cart.js
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart", // ✅ match with reducer
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
