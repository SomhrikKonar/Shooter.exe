import { Server } from "socket.io";
import { onConnection } from "./socket/index.js";

// create socket server
export const io = new Server({ cors: { origin: "*" } });

// listen to port
const PORT = process.env.PORT || 5001;
io.listen(PORT);

// setup connection
io.on("connection", onConnection);
