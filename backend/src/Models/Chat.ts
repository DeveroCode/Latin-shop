import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IUser, roles, userRoles } from "./User";
import { IOrder } from "./Order";

/** TS */
export interface IChat extends Document {
  seller: PopulatedDoc<IUser>;
  buyer: PopulatedDoc<IUser>;
  order: PopulatedDoc<IOrder>;
  lastMessage: string;
  lastMessageAt: Date;
  unreadBy: userRoles | null;
  isActive: boolean;
}

/** Mongoose Schema */
const chatSchema = new Schema<IChat>(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true, unique: true },

    lastMessage: { type: String, default: "" },
    lastMessageAt: { type: Date, default: Date.now },
    unreadBy: { type: String, enum: Object.values(roles), default: roles.BUYER },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Chat = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;
