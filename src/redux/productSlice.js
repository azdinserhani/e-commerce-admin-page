import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccuss: (state, action) => {
      (state.isFetching = false), (state.products = action.payload);
    },
    getProductError: (state) => {
      (state.error = true), (state.isFetching = false);
    },
    deleteProductStart: (state) => {
      state.isFetching = true;
    },
    deleteProductSuccuss: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },

    deleteProductError: (state) => {
      (state.error = true), (state.isFetching = false);
    },
    addProductStart: (state) => {
      state.isFetching = true;
    },
    addProductSuccuss: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },

    addProductError: (state) => {
      (state.error = true), (state.isFetching = false);
    },
    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload.id
      );

      // Replace the product if it exists, otherwise push a new product
      if (index !== -1) {
        state.products[index] = action.payload; // Update the existing product
      } else {
        state.products.push(action.payload); // Add new product if it's not already in the array
      }
    },

    updateProductError: (state) => {
      (state.error = true), (state.isFetching = false);
    },
  },
});

export const {
  getProductStart,
  getProductError,
  getProductSuccuss,
  deleteProductStart,
  deleteProductError,
  deleteProductSuccuss,
  addProductStart,
  addProductError,
  addProductSuccuss,
  updateProductStart,
  updateProductError,
  updateProductSuccuss,
} = productSlice.actions;
export default productSlice.reducer;
