import { createSlice } from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
  name: "propertyDetails",
  initialState: {
    propertyDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    getListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getpropertyDetails: (state, action) => {
      state.loading = false;
      state.propertyDetails = action.payload;
    },
    getErrors: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const propertyDetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;
