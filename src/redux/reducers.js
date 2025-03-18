import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = usersSlice.actions;
export default usersSlice.reducer;
