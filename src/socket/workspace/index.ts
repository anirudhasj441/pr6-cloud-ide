import { io } from "socket.io-client";

const workspaceSocket = io("http://127.0.0.1:8000");

export default workspaceSocket;
