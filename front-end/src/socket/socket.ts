import { socketEvents } from "@/utils/socketEvents";
import { io, Socket } from "socket.io-client";
import type { Message, Notification } from "../types";

const URL = import.meta.env.VITE_SOCKET_URL as string || "http://localhost:4000";

class SocketClient {
    private socket: Socket | null = null;

    connect(userId: string) {
        if (!this.socket) {
            this.socket = io(URL, { withCredentials: true });

            this.socket.on("connect", () => {
                this.socket?.emit("user-online", { userId });
                this.socket?.emit(socketEvents.JOIN_ROOM, userId);
            });
        }
    }

    // 🔔 NOTIFICATIONS
    onNotification(callback: (payload: Notification) => void) {
        this.socket?.on(socketEvents.NOTIFICATION_RECEIVE, callback);
    }

    offNotification() {
        this.socket?.off(socketEvents.NOTIFICATION_RECEIVE);
    }

    // 💬 MESSAGES
    onNewMessage(callback: (message: Message) => void) {
        this.socket?.on(socketEvents.NEW_MESSAGE, callback);
    }

    offNewMessage() {
        this.socket?.off(socketEvents.NEW_MESSAGE);
    }

    emitReadMessage(payload: { chatId: string }) {
        this.socket?.emit(socketEvents.MESSAGE_READ, payload);
    }

    getSocket() {
        return this.socket;
    }
}

export const socketClient = new SocketClient();
