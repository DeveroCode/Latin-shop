import mongoose from "mongoose";
import colors  from "colors";
import {exit} from "process";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(colors.bgGreen.black(`MongoDB connected successfully at ${url}`));
    } catch (error) {
        console.log(colors.bgRed.black(`Error: ${(error as Error).message}`));
        exit(1);
    }
}