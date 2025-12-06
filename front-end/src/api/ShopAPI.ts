import api from "@/lib/axios";
import type { Product, ShoppingCart, Notifications } from "../types";
import { notificationsSchema, productSchema } from "../types";
import type { ResponseMessage } from "../types";
import { isAxiosError } from "axios";

export async function searchProducts(word: string) {
    try {
        const { data } = await api.get<Product[]>(`/shop/search/${word}`);
        const response = productSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        return [];
    }
}

export async function getProductById(id: Product[number]["_id"]) {
    try {
        const { data } = await api(`/shop/product/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        return [];
    }
}

export async function shopCart(formData: ShoppingCart) {
    try {
        const { data } = await api.post<ResponseMessage>('/orders/create', formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        return [];
    }
}

export async function getNotifications() {
    try {
        const { data } = await api.get<Notifications>('/shop/notifications');
        const response = notificationsSchema.safeParse(data);
        if (response.success) {
            return response.data.notifications;
        }

        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
        return [];
    }
}