import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

/** Type targets */
export const type_targets = {
  DEBIT_CARD: "debit card",
  CREDIT_CARD: "credit card",
  LATIN_CARD: "latin card",
} as const;

export type TypeTarget = typeof type_targets[keyof typeof type_targets];

/** TS Interface */
export interface ICard extends Document {
  user: PopulatedDoc<IUser>;
  payment_method_id: string;   // 🔑 Stripe ID
  lastNumbers: string;         // last4
  expirationDate: string;      // MM/YYYY
  type_target: TypeTarget;
  default: boolean;
}

/** Mongoose Schema */
const CardSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    payment_method_id: {
      type: String,
      required: true,
      unique: true,
    },

    lastNumbers: {
      type: String,
      required: true,
    },

    expirationDate: {
      type: String,
      required: true,
    },

    type_target: {
      type: String,
      required: true,
      enum: Object.values(type_targets),
    },

    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model<ICard>("Card", CardSchema);
export default Card;
