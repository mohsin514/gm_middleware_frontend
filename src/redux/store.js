// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import syncReducer from "./syncSlice.js"; // Add this line
import loginReducer from "./loginSlice.js"; // Example slice
import usersReducer from "./usersSlice.js";
import userSettingsReducer from "./userSettingsSlice.js"; // ✅ Import the reducer
import niceXconesettingsReducer from "./niceXconeSettingSlice.js"; // ✅ Import the reducer

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    sync: syncReducer, // Add this line
    userSettings: userSettingsReducer, // ✅ Add it to the store
    settings: niceXconesettingsReducer,
    // Other reducers...
  },
});
