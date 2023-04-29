export interface multiplayerGameDetails {
  playerId: string;
  scores: {
    [id: string]: number;
  };
  status: "inLobby" | "inGame" | "gameover";
  gameoverReason: "" | "timerOut" | "playerQuit";
  roomId: string;
  timeRemaining: number;
  gameStarter: boolean;
}
