// require('dotenv').config({ path: __dirname+'/.env' });
import { io } from 'socket.io-client';

console.log(__dirname);

// export const socket = io(process.env.SOCKET_URL);
export const socket = io('http://localhost:4444');