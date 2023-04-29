import { Socket, io } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from "./interfaces";
import { appDispatch } from "../Store/store";
import {
  handlePlayerLeft,
  // resetMultiplayerGameDetails,
  updateMultiplayerGameDetails,
} from "../Store/Reducers/multiplayerGameDetails";
import { NavigateFunction } from "react-router-dom";
import { updateTarget } from "../Store/Reducers/targets";
import { notify } from "../Toast/toast";

export const IO: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:5001",
  { secure: true, reconnection: false }
);

// temporarily disable;
IO.disconnect();

export const addSocketListners = (navigate: NavigateFunction) => {
  IO.on("connect", () => {
    appDispatch(updateMultiplayerGameDetails({ playerId: IO.id }));
  });
  IO.on("disconnect", () => {
    navigate("/");
  });
  IO.on("connect_error", () => {
    notify("Failed to connect");
    navigate("/");
  });
  IO.on("networkError", () => {
    notify("Network Error");
    navigate("/");
  });
  IO.on("createdLobby", ({ roomId }) => {
    appDispatch(
      updateMultiplayerGameDetails({
        scores: { [IO.id]: 0 },
        roomId,
        playerId: IO.id,
      })
    );
    navigate(`/multi-player/lobby`);
  });
  IO.on("newPlayerJoinedLobby", ({ id }) => {
    appDispatch(
      updateMultiplayerGameDetails({ scores: { [IO.id]: 0, [id]: 0 } })
    );
  });
  IO.on("joinedLobby", ({ roomId, opponentIds = [] }) => {
    const scores = { [IO.id]: 0 };
    opponentIds.forEach((id) => (scores[id] = 0));
    appDispatch(
      updateMultiplayerGameDetails({
        scores,
        roomId,
        playerId: IO.id,
      })
    );
    navigate(`/multi-player/lobby`);
  });
  IO.on("playerLeft", ({ id }) => {
    appDispatch(handlePlayerLeft(id));
  });
  IO.on(
    "gameStarted",
    ({ roomId, targetDimension, targets, timeRemaining, gameStarter }) => {
      appDispatch(
        updateMultiplayerGameDetails({
          roomId,
          status: "inGame",
          timeRemaining,
          gameStarter,
        })
      );
      appDispatch(
        updateTarget({ dimensions: targetDimension, coordinates: targets })
      );
      navigate(`/multi-player/game`);
    }
  );
  IO.on("timeRemainingUpdated", ({ timeRemaining }) => {
    if (timeRemaining >= 0)
      appDispatch(updateMultiplayerGameDetails({ timeRemaining }));
  });
  IO.on("gameover", () => {
    appDispatch(
      updateMultiplayerGameDetails({
        status: "gameover",
        gameoverReason: "timerOut",
      })
    );
  });
  IO.on("updatedTargets", ({ newTargets, updatedScores }) => {
    appDispatch(updateTarget({ coordinates: newTargets }));
    appDispatch(updateMultiplayerGameDetails({ scores: updatedScores }));
  });
  IO.on("error", (err) => {
    notify(err);
  });
};
