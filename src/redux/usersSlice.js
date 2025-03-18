// src/redux/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      firstName: "Giacomo",
      lastName: "Guilizzoni",
      email: "G.Guilizzoni@gm.com",
      viewOnly: true,
      edit: false,
      admin: false,
    },
    {
      id: 2,
      firstName: "Marco",
      lastName: "Botton",
      email: "M.Botton@gm.com",
      viewOnly: false,
      edit: false,
      admin: true,
    },
    {
      id: 3,
      firstName: "Mariah",
      lastName: "Medaetian",
      email: "M.Medaetian@gm.com",
      viewOnly: false,
      edit: true,
      admin: false,
    },
    {
      id: 4,
      firstName: "Valerie",
      lastName: "Liberty",
      email: "V.Liberty@gm.com",
      viewOnly: true,
      edit: false,
      admin: false,
    },
  ],
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
