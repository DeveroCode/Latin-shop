import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { orderSchema, statsSchema } from "../types";
import type { ResponseMessage, Order, ShippingGuideFormData } from "../types";

export async function getOrders() {
    try {
        const { data } = await api.get('/orders');
        const response = orderSchema.safeParse(data);
        console.log(response);
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
export async function ordersManyDelete(ordersId: Order["_id"][]) {
    try {
        const { data } = await api.delete<ResponseMessage>('/orders/delete/orders', {
            data: {
                ordersId: ordersId
            }
        });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}
export async function generateShippingGuide(formData: ShippingGuideFormData) {
    const orderId = formData.guideNumber;
    try {
        const { data } = await api.post<ResponseMessage>(`/orders/generate/shipping/${orderId}`, formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}
export async function getStats() {
    try {
        const { data } = await api.get('/orders/stats');
        const response = statsSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.errors);
        }

        return [];
    }
}