import { createSlice } from "@reduxjs/toolkit";
import { crosshairInterface } from "./interface";

const initialState: crosshairInterface = {
  showCrosshair: true,
  offset: 3,
  length: 6,
  color: "#000000",
  thickness: 3,
};

const crosshairSlice = createSlice({
  name: "crosshair",
  initialState,
  reducers: {
    updateCrosshair: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateCrosshair } = crosshairSlice.actions;
export default crosshairSlice.reducer;
