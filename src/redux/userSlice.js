import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: "",
    isAuthenticated: false,
  },
  reducers: {
    loginStart: (stats) => {
      stats.isFetching = true;
    },
    loginSuccuss: (stats, action) => {
      (stats.isFetching = false),
        (stats.currentUser = action.payload),
        (stats.error = null),
        (stats.isAuthenticated = true);
    },
    loginError: (stats, action) => {
      (stats.error = action.payload), (stats.isFetching = false);
    },
    logOut: (stats) => {
      (stats.isAuthenticated = false),
        (stats.error = null),
        (stats.currentUser = null);
    },
  },
});

export const { loginStart, loginError, loginSuccuss, logOut } =
  userSlice.actions;
export default userSlice.reducer;
