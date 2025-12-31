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
export const deliveryStatus = {
    PENDING_CONFIRMATION: "pending confirmation",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    OUT_FOR_DELIVERY: "out for delivery",
    ARRIVED_AT_HUB: "arrived at local hub",
    DELIVERED: "delivered",
    CANCELED: "canceled",
    RETURNED: "returned",
    DELIVERY_ATTEMPT_FAILED: "delivery attempt failed",
} as const;

export type DeliveryStatus = typeof deliveryStatus[keyof typeof deliveryStatus];


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
    payment_method: PaymentMethods,
    delivered: DeliveryStatus
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
    payment_method: { type: String, required: true, enum: Object.values(methods) },
    delivered: { type: String, required: true, enum: Object.values(deliveryStatus), default: deliveryStatus.PENDING_CONFIRMATION }
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;