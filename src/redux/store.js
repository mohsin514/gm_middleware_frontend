// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import syncReducer from './syncSlice.js'; // Add this line
import loginReducer from './loginSlice.js'; // Example slice
import usersReducer from './usersSlice.js'; 

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    sync: syncReducer, // Add this line
    // Other reducers...
  },
});