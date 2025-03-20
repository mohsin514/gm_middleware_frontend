import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [
    { id: 1, name: "Unavailable Codes", status: "Pending" },
    { id: 2, name: "Groups", status: "Pending" },
    { id: 3, name: "Teams", status: "Pending" },
    { id: 4, name: "Compaigns", status: "Pending" },
    { id: 5, name: "Dispositions", status: "Pending" },
    { id: 6, name: "Hours of Operation", status: "Pending" },
    { id: 7, name: "Users", status: "Pending" },
    { id: 8, name: "Routing Attributes", status: "Pending" },
    { id: 9, name: "Skills and Proficiency", status: "Pending" },
    { id: 10, name: "Workflow Data", status: "Pending" },
    { id: 11, name: "Address Books", status: "Pending" },
    { id: 12, name: "Scripts", status: "Pending" },
    { id: 13, name: "Point Of Contact", status: "Pending" },
  ],
  lastSyncTime: null,
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    startJob: (state, action) => {
      const job = state.jobs.find((job) => job.id === action.payload);
      if (job) job.status = "In Progress";
    },
    completeJob: (state, action) => {
      const job = state.jobs.find((job) => job.id === action.payload);
      if (job) job.status = "Completed";
      state.lastSyncTime = new Date().toLocaleString();
    },
  },
});

export const { startJob, completeJob } = syncSlice.actions;
export default syncSlice.reducer;
