import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  darkMode: false,
  notifications: true,
};

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    changePassword: (state, action) => {
      console.log("Password changed:", action.payload.newPassword);
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleAccessNotifications: (state) => {
      state.accessNotifications = !state.accessNotifications;
    },
    toggleSyncFailureNotifications: (state) => {
      state.syncFailureNotifications = !state.syncFailureNotifications;
    },
  },
});

export const {
  updateProfile,
  changePassword,
  toggleDarkMode,
  toggleAccessNotifications,
  toggleSyncFailureNotifications,
} = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
