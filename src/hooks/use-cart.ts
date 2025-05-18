import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem } from '@hero/types/dto'

interface CartStore {
  items: CartItem[]
  selectedItems: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  selectItem: (id: string) => void
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
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, item] }
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
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
