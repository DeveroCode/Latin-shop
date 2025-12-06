import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { orderSchema } from "../types";

export async function getOrders() {
    try {
        const { data } = await api.get('/orders');
        const response = orderSchema.safeParse(data);
        if (response.success) {
            return response.data.orders;
        }

        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}