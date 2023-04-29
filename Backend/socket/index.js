import { customEvents } from "./events.js";

export const onConnection = (socket) => {
  const CE = new customEvents(socket);
  // listening to  events
  socket.on("disconnect", CE.disconnect.bind(CE));
  socket.on("connect_timeout", CE.connectionFailed.bind(CE));
  socket.on("disconnecting", CE.disconnecting.bind(CE));
  socket.on("createLobby", CE.createLobby.bind(CE));
  socket.on("joinLobby", CE.joinLobby.bind(CE));
  socket.on("leaveLobby", CE.leaveLobby.bind(CE));
  socket.on("startGame", CE.startGame.bind(CE));
  socket.on("removeTarget", CE.removeTarget.bind(CE));
  socket.on("stopTimer", CE.stopTimer.bind(CE));
};
