// src/redux/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: 'Tom Cook',
  email: 'tom.cook@example.com',
  title: 'Product Manager',
  language: 'English',
  dateFormat: 'DD-MM-YYYY',
  automaticTimestore: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateFullName: (state, action) => {
      state.fullName = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateDateFormat: (state, action) => {
      state.dateFormat = action.payload;
    },
    toggleAutomaticTimestore: (state) => {
      state.automaticTimestore = !state.automaticTimestore;
    },
  },
});

export const {
  updateFullName,
  updateEmail,
  updateTitle,
  updateLanguage,
  updateDateFormat,
  toggleAutomaticTimestore,
} = profileSlice.actions;
export default profileSlice.reducer;