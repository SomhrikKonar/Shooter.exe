import { io } from "../index.js";
import {
  create_random_six_digit_code,
  generateSingleTarget,
  getInitialTargets,
  getTargetDimension,
} from "../utils.js";

export class customEvents {
  constructor(prop) {
    this.socket = prop;
    this.socketId = prop.id;
    this.timerInstance = undefined;
  }
  disconnecting = () => {
    const roomId = this.socket.data.roomId;
    if (roomId && this.socket.data.status !== "gameover") {
      this.socket.to(roomId).emit("playerLeft", { id: this.socket.id });
    }
    if (this.timerInstance) clearInterval(this.timerInstance);
  };
  disconnect = () => {
    console.log("SOCKET DISCONNECTED");
  };
  connectionFailed = () => {
    io.to(this.socket.id).emit("networkError");
  };
  createLobby = ({ deviceWidth, deviceHeight }) => {
    const roomId = create_random_six_digit_code(this.socket.rooms);
    this.socket.join(roomId);
    this.socket.data = {
      roomId,
      targets: {},
      status: "inLobby",
      scores: {},
      deviceWidth,
      deviceHeight,
    };
    // for the player who created the lobby
    this.socket.emit("createdLobby", {
      roomId,
    });
  };
  joinLobby = ({ roomId, deviceWidth, deviceHeight }) => {
    const existingRoomIds = this.socket.adapter.rooms;
    if (!existingRoomIds.has(roomId)) {
      this.socket.emit("error", "Invalid Room Id.");
      return;
    }
    const playersInRoom = existingRoomIds.get(roomId);
    if (playersInRoom.size === 2) {
      this.socket.emit("error", "Room is already full.");
      return;
    }
    if (playersInRoom.has(this.socket.id)) {
      this.socket.emit("error", "You are already in room");
      return;
    }
    const opponentIds = [...playersInRoom];
    this.socket.join(roomId);
    this.socket.data = {
      roomId,
      targets: {},
      status: "inLobby",
      scores: {},
      deviceWidth,
      deviceHeight,
    };
    console.log("JOINED LOBBY", roomId);
    // for the existing players
    this.socket.in(roomId).emit("newPlayerJoinedLobby", { id: this.socketId });
    // for the new player
    this.socket.emit("joinedLobby", { roomId, opponentIds });
  };
  leaveLobby = (informOthers = true) => {
    const roomId = this.socket.data.roomId;
    if (roomId) {
      if (informOthers && this.socket.data.status !== "gameover")
        this.socket.to(roomId).emit("playerLeft", { id: this.socket.id });
      this.socket.leave(roomId);
      this.socket.data = {};
      console.log("LEFT LOBBY");
    }
    if (this.timerInstance) {
      clearInterval(this.timerInstance);
      this.timerInstance = undefined;
    }
  };
  startGame = ({ targetSize, duration }) => {
    if (this.socket.data?.status === "inGame") {
      this.socket.emit("error", "Game already in progess");
      return;
    }
    const rooms = this.socket.adapter.rooms;
    const roomId = this.socket.data.roomId;
    let socketIds = [];
    // getting socket Ids of clients in room
    if (rooms.has(roomId)) {
      socketIds = [...rooms.get(roomId)];
    }
    if (socketIds.length !== 2) {
      this.socket.emit("error", "Cannot start game");
      return;
    }
    // updatedSocketDatas - will have the updated socket data for all the socket instances
    let newSocketDatas = [];
    let socketInstances = [];
    // setting initial scores
    let scores = {};
    // storing the updated socket data
    for (const socketId of socketIds) {
      scores[socketId] = 0;
      const socketInstance = io.sockets.sockets.get(socketId);
      socketInstances.push(socketInstance);
      newSocketDatas.push({
        targetDimension: getTargetDimension(
          targetSize,
          socketInstance.data.deviceWidth
        ),
        deviceWidth: socketInstance.data.deviceWidth,
        deviceHeight: socketInstance.data.deviceHeight,
        targets: {},
      });
    }
    // getting targets and updating the target property (advantage of pass by reference)
    getInitialTargets(newSocketDatas);
    for (const i in socketIds) {
      const socketId = socketIds[i];
      const newSocketData = newSocketDatas[i];
      const socketInstance = socketInstances[i];
      socketInstance.data = {
        ...socketInstance.data,
        ...newSocketData,
        status: "inGame",
        scores,
      };
      io.to(socketId).emit("gameStarted", {
        targetDimension: socketInstance.data.targetDimension,
        timeRemaining: duration,
        targets: Object.values(socketInstance.data.targets),
        roomId,
        gameStarter: socketId === this.socketId,
      });
    }
    // timer
    let timeRemaining = duration;
    this.timerInstance = setInterval(() => {
      timeRemaining -= 1;
      io.in(roomId).emit("timeRemainingUpdated", { timeRemaining });
      if (timeRemaining === 0) {
        io.in(roomId).emit("gameover");
        for (const i in socketIds) {
          const socketInstance = socketInstances[i];
          socketInstance.data = {
            ...socketInstance.data,
            status: "gameover",
          };
        }
        clearInterval(this.timerInstance);
      }
    }, 1000);
  };
  removeTarget = ({ id }) => {
    // checking if socketID exists
    if (!this.socket?.data?.targets?.[id]) {
      console.log("TARGET DOESN'T EXIST");
      return;
    }
    const rooms = this.socket.adapter.rooms;
    const roomId = this.socket.data.roomId;
    let socketIds = [];
    // getting socket Ids of clients in room
    if (rooms.has(roomId)) {
      socketIds = [...rooms.get(roomId)];
    }
    let socketInstances = [];
    let newSocketDatas = [];
    for (const socketId of socketIds) {
      const socketInstance = io.sockets.sockets.get(socketId);
      socketInstances.push(socketInstance);
      newSocketDatas.push({
        targetDimension: socketInstance.data.targetDimension,
        deviceWidth: socketInstance.data.deviceWidth,
        deviceHeight: socketInstance.data.deviceHeight,
        targets: socketInstance.data.targets,
      });
    }
    generateSingleTarget(newSocketDatas, id);
    for (const i in socketIds) {
      const socketId = socketIds[i];
      const newSocketData = newSocketDatas[i];
      const socketInstance = socketInstances[i];
      socketInstance.data = {
        ...socketInstance.data,
        targets: newSocketData["targets"],
        scores: {
          ...socketInstance.data.scores,
          [this.socketId]: socketInstance.data.scores[this.socketId] + 1,
        },
      };
      io.to(socketId).emit("updatedTargets", {
        newTargets: Object.values(socketInstance.data.targets),
        updatedScores: socketInstance.data.scores,
      });
    }
  };
  stopTimer = () => {
    if (this.timerInstance) {
      clearInterval(this.timerInstance);
    }
  };
}
