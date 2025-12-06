import { create } from 'zustand';
import type { Product, ProductCartItem } from '../types';

interface ShoppingState {
    cart: ProductCartItem[];
    setToCart: (product: Product[number]) => void;
    increasePiece: (id: ProductCartItem['_id']) => void;
    decreasePiece: (id: ProductCartItem['_id']) => void;
    removeItem: (id: ProductCartItem['_id']) => void;
    totalAmount: () => number;
    totalPieces: () => number;
}

export const useShoppingStore = create<ShoppingState>((set, get) => ({
    cart: [],
    setToCart: (product) => {
        const { description, brand, category, ...data } = product;
        let cart: ProductCartItem[] = [];

        if (get().cart.find(i => i._id === product._id)) {
            cart = get().cart.map(item => item._id === product._id ? {
                ...item,
                quantity: item.quantity + 1,
            } : item);
        } else {
            cart = [...get().cart, {
                ...data,
                quantity: 1,
            }];
        }

        set({ cart });
    },
    totalAmount: () => {
        return get().cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    },
    totalPieces: () => {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
    },
    increasePiece: (id) => {
        set((state) => ({
            cart: state.cart.map(i => i._id === id ? {
                ...i,
                quantity: i.quantity + 1,
            } : i)
        }));
    },
    decreasePiece: (id) => {
        set((state) => ({
            cart: state.cart.map(i => i._id === id ? {
                ...i,
                quantity: i.quantity - 1,
            } : i)
        }));
    },
    removeItem: (id) => {
        set((state) => ({
            cart: state.cart.filter(i => i._id !== id)
        }));
    }
}));

