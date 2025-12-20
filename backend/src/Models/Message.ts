import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IUser, roles, userRoles } from "./User";
import { IChat } from "./Chat";

/** TS */
export interface IMessage extends Document {
  chat: PopulatedDoc<IChat>;
  sender: PopulatedDoc<IUser>;
  senderRole: userRoles;
  content: string;
  isRead: boolean;
}

/** Mongoose Schema */
const messageSchema = new Schema<IMessage>(
  {
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderRole: {
      type: String,
      enum: Object.values(roles),
      required: true,
    },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ chat: 1, createdAt: 1 });

export default mongoose.model<IMessage>("Message", messageSchema);
