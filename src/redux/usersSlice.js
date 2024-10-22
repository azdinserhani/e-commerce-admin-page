import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getUsersStart: (state) => {
      state.isFetching = true;
    },
    getUsersSuccuss: (state, action) => {
      console.log(state.users);

      (state.isFetching = false), (state.users = action.payload);
    },
    getUsersError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteUsersStart: (state) => {
      state.isFetching = true;
    },
    deleteUsersSuccuss: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },

    deleteUsersError: (state) => {
      (state.error = true), (state.isFetching = false);
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccuss,
  getUsersError,
  deleteUsersStart,
  deleteUsersSuccuss,
  deleteUsersError,
} = usersSlice.actions;
export default usersSlice.reducer;
