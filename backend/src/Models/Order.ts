import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";
import { IProduct } from "./Product";


/** Payments methods */
export const methods = {
    CASH: "cash",
    DEBIT_CARD: "debit card",
    CREDIT_CARD: "credit card",
    LATIN_CARD: "latin card"
} as const;

export type PaymentMethods = typeof methods[keyof typeof methods];

/** TS */
export interface IOrder extends Document {
    user: PopulatedDoc<IUser>,
    products: {
        product: PopulatedDoc<IProduct>,
        sellerId: string,
        quantity: number,
        price: number
    }[],
    total_amount: number,
    is_payment: boolean,
    payment_method: PaymentMethods
}

/** Mongoose */
const OrderSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        sellerId: { type: String, required: false },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total_amount: { type: Number, required: true },
    is_payment: { type: Boolean, required: true },
    payment_method: { type: String, required: true, enum: Object.values(methods) }
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;