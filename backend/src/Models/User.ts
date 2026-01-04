import mongoose, { Document, Schema } from "mongoose";

/** Roles */
export const roles = {
    BUYER: "buyer",
    SELLER: "seller"
} as const;

export type userRoles = typeof roles[keyof typeof roles];

/** TS */
export interface IUser extends Document {
    name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    image: string;
    phone_number: string;
    address: string;
    cp: number;
    city: string;
    country: string;
    stripeCustomerId?: string;
}

/** Mongoose */
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, trim: true, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(roles), default: roles.BUYER },
    image: { type: String, default: "" },
    phone_number: { type: String, default: "" },
    address: { type: String, default: "" },
    cp: { type: Number, default: 0 },
    city: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "" },
    stripeCustomerId: { type: String, default: "" },
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;