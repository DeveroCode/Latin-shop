import { create } from "zustand";
import type { Orders, OrdersPFD } from "../types";
import { toOrdersPDF } from "@/utils/functions";

interface OrderState {
    order: OrdersPFD[],
    setToOrders: (order: Orders) => void,
    selectedIds: string[]
    selecteAll: (ids: string[]) => void,
    toggleOne: (id: string) => void,
    getSelectedOrdersPDF: () => OrdersPFD[],
}

export const useOrderStore = create<OrderState>((set, get) => ({
    order: [],
    selectedIds: [],
    setToOrders: (orders) => {
        const orderPDF = toOrdersPDF(orders);

        set({ order: orderPDF });
    },
    selecteAll: (ids) => {
        if (get().selectedIds.length === ids.length) {
            set({ selectedIds: [] });
        } else {
            set({ selectedIds: ids });
        }
    },
    toggleOne: (id) => {
        const selected = get().selectedIds.includes(id);

        if (selected) {
            set({ selectedIds: get().selectedIds.filter(i => i !== id) });
        } else {
            set({ selectedIds: [...get().selectedIds, id] });
        }
    },
    getSelectedOrdersPDF: () => {
        const { order, selectedIds } = get();
        return order.filter(order => selectedIds.includes(order._id));
    }
}))