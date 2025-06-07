import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem } from '@hero/types/dto'

interface CartStore {
  items: CartItem[]
  selectedItems: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  updateQuantity: (id: string, direction: 'increase' | 'decrease') => void
  removeItem: (id: string) => void
  selectItem: (id: string) => void
  disselectItem: (id: string) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      selectedItems: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            }
          }

          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      selectItem: (id) =>
        set((state) => {
          const selectedItem = state.items.find((item) => item.id === id)
          if (selectedItem) {
            return {
              selectedItems: [...state.selectedItems, selectedItem],
            }
          }
          return { selectedItems: [] }
        }),
      disselectItem: (id) =>
        set((state) => ({
          selectedItems: state.selectedItems.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, direction) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id)
          if (item) {
            if (direction === 'increase') {
              return {
                items: state.items.map((i) =>
                  i.id === id ? { ...i, quantity: item.quantity + 1 } : i,
                ),
                selectedItems: state.selectedItems.map((i) =>
                  i.id === id ? { ...i, quantity: item.quantity + 1 } : i,
                ),
              }
            } else if (direction === 'decrease' && item.quantity > 1) {
              return {
                items: state.items.map((i) =>
                  i.id === id ? { ...i, quantity: item.quantity - 1 } : i,
                ),
                selectedItems: state.selectedItems.map((i) =>
                  i.id === id ? { ...i, quantity: item.quantity - 1 } : i,
                ),
              }
            }
          }
          return { items: state.items }
        })
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          selectedItems: state.selectedItems.filter((item) => item.id !== id),
        }))
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
