import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketManager } from '../config/socketManager';

let io: Server | null = null;

export const initSocket = (server: HttpServer) => {
    if (io) return io;

    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
            methods: ["GET", "POST"],
            credentials: true
        }
    })

    io.on("connection", (socket: Socket) => {
        console.log("Socket connected", socket.id);

        socket.on("user-online", (payload: { userId: string }) => {
            const { userId } = payload;
            SocketManager.addUser(userId, socket.id);
            console.log(`User ${userId} is online`);
        })

        socket.on("join-room", (rom: string) => {
            socket.join(rom);
            console.log(`User ${socket.id} joined room ${rom}`);
        })

        socket.on("disconnect", () => {
            const removed = SocketManager.removeBySocketId(socket.id);
            if (removed) console.log(`User ${removed} is offline`);
        })

        return io;
    })
}


export const getIO = (): Server => {
    if (!io) throw new Error("Socket is not initialized");
    return io;
}