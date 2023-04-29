import { createSlice } from "@reduxjs/toolkit";
import gameStatus from "./interface";

const initialState: gameStatus = {
  isGameover: false,
  isPlaying: false,
  isPaused: false,
  score: 0,
  missedShots: 0,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      return { ...state, ...action.payload };
    },
    increseScore: (state) => {
      state.score += 1;
    },
    increaseMissedShots: (state) => {
      state.missedShots += 1;
    },
    resetStatuses: () => {
      return {
        isGameover: false,
        isPlaying: false,
        isPaused: false,
        score: 0,
        missedShots: 0,
      };
    },
  },
});

export const {
  changeStatus,
  increseScore,
  increaseMissedShots,
  resetStatuses,
} = statusSlice.actions;
export default statusSlice.reducer;
