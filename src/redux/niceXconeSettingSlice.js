import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primarySettings: {
    BuNumber: "123456",
    AuthUrl: "https://na1.nice-incontact.com",
    ApiUrl: "https://api-na1.niceincontact.com",
    ClientId: "aGVsbG9Gcm9tQ29uZGFkbw==",
    ClientSecret: "**************************",
    UserKeyId: "aGVsbG9BbmRHb29kYnllRnJvbVRyaWNlbnNpb24=",
    UserKeySecret: "**************************",
  },
  backupSettings: {
    BuNumber: "456789",
    AuthUrl: "https://na1.nice-incontact.com",
    ApiUrl: "https://api-na1.niceincontact.com",
    ClientId: "aGVsbG9Gcm9tQ29uZGFwbw==",
    ClientSecret: "**************************",
    UserKeyId: "aGVsbG9BbmRHb29kYnllRnJvbVRyaWNlbnNpb24=",
    UserKeySecret: "**************************",
  },
};

const niceXconeSettingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      const { key, value, section } = action.payload;
      state[section][key] = value;
    },
    resetSettings: () => initialState,
  },
});

export const { updateSettings, resetSettings } = niceXconeSettingSlice.actions;
export default niceXconeSettingSlice.reducer;
