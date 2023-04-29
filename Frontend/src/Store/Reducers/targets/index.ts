import { createSlice, current } from "@reduxjs/toolkit";
import { generateTargetCoordinate } from "../../../Components/Target/util";
import { targetDetails } from "./interface";

const initialValues: targetDetails = {
  dimensions: 50,
  coordinates: [],
  color: "#ff0000",
};

export const targetsSlice = createSlice({
  name: "targets",
  initialState: initialValues,
  reducers: {
    resetCoordinates: (state) => {
      state.coordinates = [];
    },
    addCoordinates: (state, action) => {
      state.coordinates.push(...action.payload);
    },
    removeCoordinate: (state, action) => {
      let { coordinates } = current(state);
      state.coordinates = coordinates.filter((cd) => cd.id !== action.payload);
      state.coordinates.push(
        generateTargetCoordinate(state.coordinates, state.dimensions)
      );
    },
    updateTarget: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
export const {
  addCoordinates,
  removeCoordinate,
  updateTarget,
  resetCoordinates,
} = targetsSlice.actions;
export default targetsSlice.reducer;
