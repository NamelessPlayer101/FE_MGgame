import { io } from "socket.io-client";

export const socket = io(
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_SOCKET_URL_DEV
    : process.env.REACT_APP_SOCKET_URL, {
      autoConnect: false,
    }
);
