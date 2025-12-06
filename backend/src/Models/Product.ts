import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";
import { ICategory } from "./Category";
import { IUser } from "./User";

/** TS */
export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    brand: string;
    category: PopulatedDoc<ICategory>;
    countInStock: number;
    user: PopulatedDoc<IUser>;
    images: string[];
}

/** Mongoose */
const ProductSchema: Schema = new Schema({
    name: { type: String, required: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true, lowercase: true },
    price: { type: Number, required: true, },
    brand: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    countInStock: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    images: [{type: String, required: true}],
}, {
    timestamps: true
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;