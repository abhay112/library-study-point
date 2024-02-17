import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminReducerInitialState } from "../../types/reducer-types";
import { Admin } from "../../types/types";

const initialState: AdminReducerInitialState = {
  admin: null,
  loading: true,
};

export const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    adminExist: (state, action: PayloadAction<Admin>) => {
      state.loading = false;
      state.admin = action.payload;
    },
    adminNotExist: (state) => {
      state.loading = false;
      state.admin = null;
    },
  },
});

export const { adminExist, adminNotExist } = adminReducer.actions;
