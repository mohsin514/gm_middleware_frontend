// src/redux/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  rememberMe: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
});

export const { setUsername, setPassword, setRememberMe } = loginSlice.actions;
export default loginSlice.reducer;