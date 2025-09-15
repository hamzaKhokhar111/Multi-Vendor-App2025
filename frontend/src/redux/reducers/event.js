import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  events: [],
  event: null,
  allEvents: [],
  message: null,
  success: false,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // 🔹 Create Event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // 🔹 Reset Event Create
     .addCase("eventCreateReset", (state) => {
  state.success = false;
  state.event = null;
})


    // 🔹 Get All Events of Shop
    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase("getAlleventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔹 Delete Event of Shop
    .addCase("deleteeventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteeventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteeventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔹 Get All Events
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase("getAlleventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // 🔹 Clear Errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
