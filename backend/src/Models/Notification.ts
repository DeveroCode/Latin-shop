import mongoose, { Document, PopulatedDoc, Schema } from "mongoose";
import { NotificationsType } from "../utils/notificationsType";
import { IUser } from "./User";

export interface INotification extends Document {
    type: NotificationsType;
    title: string;
    message: string;
    orderId: string;
    createdAt: Date;
    user: PopulatedDoc<IUser>;
}

const NotificationSchema: Schema = new Schema({
    type: { type: String, required: true, enum: Object.values(NotificationsType) },
    title: { type: String, required: true },
    message: { type: String, required: true },
    orderId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: false });

const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);
export default NotificationModel;