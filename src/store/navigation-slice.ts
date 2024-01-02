import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: { isCollapsed: false },
  reducers: {
    toggleNavigation: (state) => {
      if (state.isCollapsed) {
        state.isCollapsed = false;
      } else {
        state.isCollapsed = true;
      }
    },
  },
});

export default navigationSlice;
export const { toggleNavigation } = navigationSlice.actions;
