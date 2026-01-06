import { create } from 'zustand';
import { persist } from "zustand/middleware";
import type { Product, ProductCartItem } from '../types';

interface ShoppingState {
    cart: ProductCartItem[];
    setToCart: (product: Product[number]) => void;
    increasePiece: (id: ProductCartItem['_id']) => void;
    decreasePiece: (id: ProductCartItem['_id']) => void;
    removeItem: (id: ProductCartItem['_id']) => void;
    totalAmount: () => number;
    totalPieces: () => number;
    clearCart: () => void;
}

export const useShoppingStore = create<ShoppingState>()(
    persist(
        (set, get) => ({
            cart: [],
            setToCart: (product) => {
                const { description, brand, category, ...data } = product;

                const cart = get().cart.find(i => i._id === product._id)
                    ? get().cart.map(item =>
                        item._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    : [...get().cart, { ...data, quantity: 1 }];

                set({ cart });
            },

            increasePiece: (id) => {
                set({
                    cart: get().cart.map(i =>
                        i._id === id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                });
            },

            decreasePiece: (id) => {
                set({
                    cart: get()
                        .cart
                        .map(i =>
                            i._id === id ? { ...i, quantity: i.quantity - 1 } : i
                        )
                        .filter(i => i.quantity > 0),
                });
            },

            removeItem: (id) => {
                set({
                    cart: get().cart.filter(i => i._id !== id),
                });
            },

            totalAmount: () =>
                get().cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                ),

            totalPieces: () =>
                get().cart.reduce((acc, item) => acc + item.quantity, 0),
            clearCart: () => set({ cart: [] }),
        }),
        {
            name: "cart",
        }
    )
);

