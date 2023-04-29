import { createSlice } from "@reduxjs/toolkit";

const initialState: { height: string; width: string } = {
  height: window.innerHeight + "px",
  width: window.innerWidth + "px",
};

const browserSlice = createSlice({
  name: "browser",
  initialState,
  reducers: {
    updateBrowser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBrowser } = browserSlice.actions;
export default browserSlice.reducer;
