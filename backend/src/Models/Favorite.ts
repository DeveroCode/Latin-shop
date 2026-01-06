import mongoose, { Document, Schema, PopulatedDoc } from "mongoose";
import { IUser } from "./User";
import { IProduct } from "./Product";

/** TS */
export interface IFavorite extends Document {
    user: PopulatedDoc<IUser>;
    product: PopulatedDoc<IProduct>;
}

/** Mongoose */
const FavortieSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }
})

const Favorite = mongoose.model<IFavorite>('Favorite', FavortieSchema);
export default Favorite;