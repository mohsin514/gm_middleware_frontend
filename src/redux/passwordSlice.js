// src/redux/passwordSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setCurrentPassword: (state, action) => {
      state.currentPassword = action.payload;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
  },
});

export const { setCurrentPassword, setNewPassword, setConfirmPassword } = passwordSlice.actions;
export default passwordSlice.reducer;