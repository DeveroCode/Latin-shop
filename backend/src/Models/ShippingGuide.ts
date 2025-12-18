import mongoose,  {Schema, Document, PopulatedDoc} from "mongoose";
import { IUser } from "./User";

/** TS */
export interface IShippingGuide extends Document {
    guideNumber: string;
    owner: PopulatedDoc<IUser>;
    buyer: PopulatedDoc<IUser>;
    comments: string;
    references: string;
    totalAmount: number;
}

/** Mongoose  */
const ShippingGuideSchema: Schema = new Schema({
    guideNumber: { type: String, required: true },
    buyer: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    comments: { type: String, required: false },
    references: { type: String, required: false },
    totalAmount: { type: Number, required: true },
}, {
    timestamps: true

})

const ShippingGuide = mongoose.model<IShippingGuide>('ShippingGuide', ShippingGuideSchema);
export default ShippingGuide;