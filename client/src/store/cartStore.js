import { create } from 'zustand';

export const useCartStore = create((set) => ({
    cart: [],
    setCart: (cartItems) => set({ cart: cartItems }),
    clearCart: () => set({ cart: [] }),
}));
