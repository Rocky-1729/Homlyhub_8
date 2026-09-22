//state management for property data
//all list of properties will be stored in this slice
import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
name: "property",
initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {},
    loading: false,
    error: null
},
reducers: {
    getPropertiesStart: (state) => {
    state.loading = true;
    },
    getProperties: (state, action) => {
        state.properties = action.payload.properties;
        state.totalProperties = action.payload.all_Properties; 
        state.loading = false;
  },
  updateSearchParams: (state, action) => {
    state.searchParams = Object.keys(action.payload).length === 0 ? {} : { ...state.searchParams, ...action.payload };
  },
  getErrors: (state, action) => {
    state.error = action.payload;
    state.loading = false;
  }
}
});

export const propertyActions = propertySlice.actions;
export default propertySlice;