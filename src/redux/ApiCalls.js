import { publicRequest, userRequest } from "../axios";
import {
  deleteOrderError,
  deleteOrderStart,
  deleteOrderSuccuss,
  getOrderError,
  getOrderStart,
  getOrderSuccuss,
  updateOrderError,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderSlice";

import {
  addProductError,
  addProductStart,
  addProductSuccuss,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccuss,
  getProductError,
  getProductStart,
  getProductSuccuss,
  updateProductError,
  updateProductStart,
  updateProductSuccuss,
} from "./productSlice";
import { loginError, loginStart, loginSuccuss } from "./userSlice";
import {
  deleteUsersError,
  deleteUsersStart,
  deleteUsersSuccuss,
  getUsersError,
  getUsersStart,
  getUsersSuccuss,
} from "./usersSlice";

//Auth calls
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  console.log(user);

  try {
    const res = await publicRequest.post("/api/auth/login", user);
    console.log(res.data);

    dispatch(loginSuccuss(res.data));
  } catch (error) {
    console.log();

    dispatch(loginError(error.response.data.message));
  }
};

//products calls
export const getAllProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/api/products/");
    console.log(res.data.data.products);

    dispatch(getProductSuccuss(res.data.data.products));
  } catch (error) {
    dispatch(getProductError());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete("/api/products/" + id);

    dispatch(deleteProductSuccuss(id));
  } catch (error) {
    console.log(error);

    dispatch(deleteProductError());
  }
};
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/api/products", product);

    dispatch(addProductSuccuss(res.data.data));
  } catch (error) {
    console.log(error);

    dispatch(addProductError());
  }
};
export const updateProduct = async (dispatch, product, id) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put("/api/products/" + id, product);

    dispatch(updateProductSuccuss({ id, product }));
  } catch (error) {
    console.log(error);

    dispatch(updateProductError());
  }
};

//users calls
export const getAllUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/api/user/");
    console.log(res.data);
    dispatch(getUsersSuccuss(res.data));
  } catch (error) {
    console.log(error);

    dispatch(getUsersError());
  }
};
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUsersStart());
  try {
    // const res = await userRequest.delete("/api/user/" + id);

    dispatch(deleteUsersSuccuss(id));
  } catch (error) {
    console.log(error);

    dispatch(deleteUsersError());
  }
};

export const getAllOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/api/order/");
    console.log(res.data.data);

    dispatch(getOrderSuccuss(res.data.data));
  } catch (error) {
    dispatch(getOrderError());
  }
};

export const deleteOrder = async (dispatch, id) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete("/api/order/" + id);

    dispatch(deleteOrderSuccuss(id));
  } catch (error) {
    console.log(error);

    dispatch(deleteOrderError());
  }
};
export const updateOrder = async (dispatch, order, id) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put("/api/order/" + id, order);
    console.log(res.data.data);
    order = res.data.data;
    dispatch(updateOrderSuccess({ id, order }));
  } catch (error) {
    console.log(error);

    dispatch(updateOrderError());
  }
};
