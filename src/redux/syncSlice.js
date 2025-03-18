// src/redux/syncSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  steps: [
    { id: 1, type: 'Unavailable Codes', status: 'Complete', date: '03/11/2025', time: '00:08:53' },
    { id: 2, type: 'Groups', status: 'Complete', date: '03/11/2025', time: '00:08:54' },
    { id: 3, type: 'Teams', status: 'Complete', date: '03/11/2025', time: '00:08:55' },
    { id: 4, type: 'Campaigns', status: 'Complete', date: '03/11/2025', time: '00:08:56' },
    { id: 5, type: 'Dispositions', status: 'Complete', date: '03/11/2025', time: '00:08:57' },
    { id: 6, type: 'Hours of Operation', status: 'Complete', date: '03/11/2025', time: '00:08:58' },
    { id: 7, type: 'Users', status: 'Complete', date: '03/11/2025', time: '00:08:59' },
    { id: 8, type: 'Routing', status: 'Complete', date: '03/11/2025', time: '00:09:01' },
    { id: 9, type: 'Skills and Proficiency', status: 'Complete', date: '03/11/2025', time: '00:09:02' },
    { id: 10, type: 'Workflow Data', status: 'Complete', date: '03/11/2025', time: '00:09:03' },
    { id: 11, type: 'Address Books', status: 'Executing', date: '03/11/2025', time: '00:09:04' },
    { id: 12, type: 'Scripts', status: 'Queued', date: '03/11/2025', time: '00:09:05' },
    { id: 13, type: 'Points of Contact', status: 'Failed', date: '03/11/2025', time: '00:09:06' },
  ],
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    updateStepStatus: (state, action) => {
      const { id, status } = action.payload;
      const step = state.steps.find((step) => step.id === id);
      if (step) {
        step.status = status;
      }
    },
  },
});

export const { updateStepStatus } = syncSlice.actions;
export default syncSlice.reducer;