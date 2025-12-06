import { SocketManager } from "../config/socketManager";
import { NotificationPayload } from "../interface";
import NotificationModel, { INotification } from "../Models/Notification";
import { getIO } from "../socket/io";

export class NotificationService {
    static async createAndSend(toUserId: string, payload: NotificationPayload): Promise<INotification> {
        const not = await NotificationModel.create({
            ...payload,
            user: toUserId
        });

        //  Send notification if the user is online
        try {
            const io = getIO();
            const socketId = SocketManager.getSocketId(toUserId);

            const outgoing = {
                id: not._id,
                type: payload.type,
                title: payload.title,
                message: payload.message,
                orderId: payload.orderId,
                user: payload.user,
                createdAt: payload.createdAt
            }

            if (socketId) {
                io.to(socketId).emit("notification", outgoing);
            } else {
                io.to(`user-${toUserId}`).emit("notification", outgoing);
            }

        } catch (error) {
            console.error("Socket emission failed:", error);
        }

        return not;
    }

    static async markAsRead(notificationId: string) {
        return NotificationModel.findByIdAndUpdate(notificationId, { read: true }, { new: true }).exec();
    }

    static async listForUser(userId: string, limit = 50) {
        return NotificationModel.find({ toUserId: userId }).sort({ createdAt: -1 }).limit(limit).exec();
    }
}