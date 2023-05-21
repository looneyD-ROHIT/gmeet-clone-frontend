import { io } from "socket.io-client";

const socket = io('http://localhost:9000', {
    withCredentials: true,
    reconnection: true,
    autoConnect: true,
    timeout: 60000
})


export default socket;