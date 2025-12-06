import mongoose, {Schema, Document, PopulatedDoc} from "mongoose";
import {IUser} from "./User";

/** Type targets */
export const type_targets = {
    DEBIT_CARD: "debit card",
    CREDIT_CARD: "credit card",
    LATIN_CARD: "latin card"
} as const;

export type TypeTarget = typeof type_targets[keyof typeof type_targets];

/** TS */
export interface ICard extends Document {
    user: PopulatedDoc<IUser>;
    lastNumbers: string;
    cvv: string;
    expirationDate: string;
    type_target: TypeTarget;
    default: boolean
}

/** Mongoose */
const CardSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    lastNumbers: { type: String, required: true },
    cvv: { type: String, required: true },
    expirationDate: { type: String, required: true },
    type_target: { type: String, required: true, enum: Object.values(type_targets) },
    default: { type: Boolean, required: false, default: false }
}, { timestamps: true });

const Card = mongoose.model<ICard>('Card', CardSchema);
export default Card;