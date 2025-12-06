import mongoose, { Schema, Document } from "mongoose";

/** TS */
export interface ICategory extends Document {
    name: string;
}


/** Mongoose */
const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, lowercase: true, trim: true },
}, {
    timestamps: true
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;