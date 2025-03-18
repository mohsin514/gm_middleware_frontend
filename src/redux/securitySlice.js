// src/redux/securitySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  twoStepVerification: true,
  passkeys: 2,
  devices: [
    { id: 1, name: 'Mac OS', location: 'Mill Valley, CA, USA', browser: 'Google Chrome', current: true },
    { id: 2, name: 'Mac OS', location: 'California, USA', browser: 'Safari', current: false },
  ],
};

const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    toggleTwoStepVerification: (state) => {
      state.twoStepVerification = !state.twoStepVerification;
    },
  },
});

export const { toggleTwoStepVerification } = securitySlice.actions;
export default securitySlice.reducer;