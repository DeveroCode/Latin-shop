import { socketEvents } from "@/utils/socketEvents";
import { io, Socket } from "socket.io-client";
import type { Notification } from "../types";

const URL = import.meta.env.VITE_SOCKET_URL as string || "http://localhost:4000";

class SocketClient {
    private socket: Socket | null = null;

    connect(userId: string) {
        if (!this.socket) {
            this.socket = io(URL, {
                withCredentials: true
            })

            this.socket.on("connect", () => {
                this.socket?.emit("join", this.socket?.id);
                this.socket?.emit("user-online", { userId });

                // Is Online
                this.socket?.emit(socketEvents.JOIN_ROOM, userId);
            })
        }
    }

    onNotification(callback: (payload: Notification) => void) {
        this.socket?.on(socketEvents.NOTIFICATION_RECEIVE, callback);
    }

    offNotification() {
        this.socket?.off(socketEvents.NOTIFICATION_RECEIVE);
    }

    getSocket() {
        return this.socket
    }
}

export const socketClient = new SocketClient();