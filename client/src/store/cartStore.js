import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],

            // Set entire cart with persistence
            setCart: (cartItems) => {
                // Ensure cartItems is an array
                const normalizedCart = Array.isArray(cartItems) ? cartItems : [cartItems];

                set({
                    cart: normalizedCart.map(item => ({
                        ...item,
                        // seller:item.seller._id,
                        quantity: item.quantity || 1 // Ensure quantity exists
                    }))
                });
            },

            // Add item to cart
            addToCart: (item) => set((state) => {
                const existingItemIndex = state.cart.findIndex(
                    (cartItem) => cartItem._id === item._id
                );

                if (existingItemIndex > -1) {
                    // If item exists, increase quantity
                    const updatedCart = [...state.cart];
                    updatedCart[existingItemIndex] = {
                        ...updatedCart[existingItemIndex],
                        quantity: (updatedCart[existingItemIndex].quantity || 0) + 1
                    };
                    return { cart: updatedCart };
                }

                // If item doesn't exist, add new item
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }),

            // Remove item from cart
            removeFromCart: (itemId) => set((state) => ({
                cart: state.cart.filter((item) => item._id !== itemId)
            })),

            // Update item quantity
            updateQuantity: (itemId, quantity) => set((state) => ({
                cart: state.cart.map((item) =>
                    item._id === itemId
                        ? { ...item, quantity: Math.max(0, quantity) }
                        : item
                ).filter((item) => item.quantity > 0)
            })),

            // Clear cart
            clearCart: () => set({ cart: [] }),

            // Get total price
            getTotalPrice: () => {
                return get().cart.reduce(
                    (total, item) => total + (item.price * (item.quantity || 1)),
                    0
                );
            }
        }),
        {
            name: 'car-parts-cart-storage', // unique name
            getStorage: () => localStorage, // use localStorage for persistence
        }
    )
);