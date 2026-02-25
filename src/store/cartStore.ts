import { Product } from '@/payload-types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ICartItem extends Product {
  quantity: number
}

interface CartStore {
  cart: ICartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string | number) => void
  incrementQuantity: (productId: string | number) => void
  decrementQuantity: (productId: string | number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // Add product to cart or increment quantity if already exists
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id)

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }

          return {
            cart: [...state.cart, { ...product, quantity }],
          }
        })
      },

      // Remove product from cart completely
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }))
      },

      // Increment product quantity
      incrementQuantity: (productId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }))
      },

      // Decrement product quantity (removes if quantity reaches 0)
      decrementQuantity: (productId) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === productId)

          if (existingItem?.quantity === 1) {
            return {
              cart: state.cart.filter((item) => item.id !== productId),
            }
          }

          return {
            cart: state.cart.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
            ),
          }
        })
      },

      // Clear the entire cart
      clearCart: () => {
        set({ cart: [] })
      },

      // Calculate total number of items in cart
      totalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0)
      },

      // Calculate total price of all items in cart
      totalPrice: () => {
        return get().cart.reduce((total, item) => total + item.basePrice * item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage', // unique name for the local storage key
      storage: createJSONStorage(() => localStorage), // use localStorage
    },
  ),
)
