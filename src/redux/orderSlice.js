import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getOrderStart: (stats) => {
      stats.isFetching = true;
    },
    getOrderSuccuss: (stats, action) => {
      (stats.isFetching = false), (stats.order = action.payload);
    },
    getOrderError: (stats) => {
      (stats.error = true), (stats.isFetching = false);
    },
    deleteOrderStart: (stats) => {
      stats.isFetching = true;
    },
    deleteOrderSuccuss: (stats, action) => {
      (stats.isFetching = false),
        stats.order.splice(
          stats.order.findIndex((item) => item._id === action.payload),
          1
        );
    },
    deleteOrderError: (stats) => {
      (stats.error = true), (stats.isFetching = false);
    },
    updateOrderStart: (state) => {
      state.isFetching = true;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      console.log(action.payload.order);

      const index = state.order.findIndex(
        (order) => order._id === action.payload.id
      );
      console.log("index :" + index);

      if (index !== -1) {
        state.order[index] = action.payload.order;
      } else {
        state.order.push(action.payload);
      }
    },

    updateOrderError: (state) => {
      (state.error = true), (state.isFetching = false);
    },
  },
});

export const {
  getOrderStart,
  getOrderError,
  getOrderSuccuss,
  deleteOrderStart,
  deleteOrderError,
  deleteOrderSuccuss,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderError,
} = orderSlice.actions;
export default orderSlice.reducer;
