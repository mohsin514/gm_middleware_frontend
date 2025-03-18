// src/redux/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    { id: 1, label: 'When my success has changed (added, updated, deleted)', enabled: false },
    { id: 2, label: 'When a step in the synchronization job fails', enabled: true },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotification: (state, action) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.enabled = !notification.enabled;
      }
    },
  },
});

export const { toggleNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;