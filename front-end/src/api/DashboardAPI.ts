import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { chartsMainSchema, statsSchema, type ChartsMain } from "../types";

export async function KPIDashboard() {
    try {
        const { data } = await api.get('/dashboard');
        const response = statsSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }

        return [];
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }

        return [];
    }
}
export async function getMainData(days: string): Promise<ChartsMain> {
    try {
        const { data } = await api.get(`/dashboard/main/${days}`);
        const response = chartsMainSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }

    return Promise.resolve({
        labels: [],
        series: {
            revenue: [],
            orders: []
        }
    });
}