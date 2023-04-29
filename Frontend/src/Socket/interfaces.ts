import { targets } from "../Components/Target/interface";
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  joinedLobby: ({
    roomId,
    opponentIds,
  }: {
    roomId: string;
    opponentIds: string[];
  }) => void;
  networkError: () => void;
  newPlayerJoinedLobby: ({ id }: { id: string }) => void;
  playerLeft: ({ id }: { id: string }) => void;
  createdLobby: ({ roomId }: { roomId: string }) => void;
  gameStarted: ({
    roomId,
    targetDimension,
    timeRemaining,
    targets,
    gameStarter,
  }: {
    roomId: string;
    targetDimension: number;
    timeRemaining: number;
    targets: targets[];
    gameStarter: boolean;
  }) => void;
  timeRemainingUpdated: ({ timeRemaining }: { timeRemaining: number }) => void;
  gameover: () => void;
  updatedTargets: ({
    newTargets,
    updatedScores,
  }: {
    newTargets: targets[];
    updatedScores: { [key: string]: number };
  }) => void;
  error: (err: string) => void;
}

export interface ClientToServerEvents {
  disconnect: () => void;
  createLobby: ({
    deviceWidth,
    deviceHeight,
  }: {
    deviceWidth: number;
    deviceHeight: number;
  }) => void;
  joinLobby: ({
    roomId,
    deviceWidth,
    deviceHeight,
  }: {
    roomId: string;
    deviceWidth: number;
    deviceHeight: number;
  }) => void;
  startGame: ({
    targetSize,
    duration,
  }: {
    targetSize: "level1" | "level2" | "level3";
    duration: number;
  }) => void;
  leaveLobby: (informOthers?: boolean) => void;
  removeTarget: ({ id }: { id: string }) => void;
  stopTimer: () => void;
}
