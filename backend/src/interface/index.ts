import { NotificationsType } from "../utils/notificationsType";

export interface NotificationPayload {
    type: NotificationsType;
    title: string;
    message: string;
    orderId: string;
    user: string;
    createdAt?: Date;
}