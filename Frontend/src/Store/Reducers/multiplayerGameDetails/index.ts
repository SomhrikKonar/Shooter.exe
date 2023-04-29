import { createSlice } from "@reduxjs/toolkit";
import { multiplayerGameDetails } from "./interface";
import { IO } from "../../../Socket";

const initialValues: multiplayerGameDetails = {
  playerId: "",
  scores: {},
  status: "inLobby",
  gameoverReason: "",
  timeRemaining: 0,
  roomId: "",
  gameStarter: false,
};

export const multiplayerGameDetailsSlice = createSlice({
  name: "targets",
  initialState: initialValues,
  reducers: {
    resetMultiplayerGameDetails: (state) => {
      return (state = {
        playerId: "",
        scores: {},
        gameoverReason: "",
        status: "inLobby",
        timeRemaining: 0,
        roomId: "",
        gameStarter: false,
      });
    },
    handlePlayerLeft: (state, action) => {
      const scores = { ...state.scores };
      if (
        action.payload !== state.playerId &&
        scores[action.payload] !== undefined
      ) {
        if (state.status === "inGame") {
          state["status"] = "gameover";
          state["gameoverReason"] = "playerQuit";
          if (state.gameStarter) IO.emit("stopTimer");
        } else {
          delete scores[action.payload];
          state.scores = scores;
        }
      }
    },
    updateMultiplayerGameDetails: (state, action) => {
      return (state = { ...state, ...action.payload });
    },
  },
});

export const {
  resetMultiplayerGameDetails,
  updateMultiplayerGameDetails,
  handlePlayerLeft,
} = multiplayerGameDetailsSlice.actions;

export default multiplayerGameDetailsSlice.reducer;
