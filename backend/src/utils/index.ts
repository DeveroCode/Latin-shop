import bcrypt from "bcrypt";
import { methods, PaymentMethods } from "../Models/Order";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
export const checkPassword = async (enteredPassword: string, storeHash: string) => {
    return await bcrypt.compare(enteredPassword, storeHash);
}

export function isValidPaymentMethod(method: any) : method is PaymentMethods {
    return Object.values(methods).includes(method);
}

export const validMethods = Object.values(methods);