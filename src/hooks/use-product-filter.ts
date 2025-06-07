import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type StoreStateOnly<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}

interface ProductFilterStore {
  hydrated: boolean
  hydrate: (
    payload: Partial<
      StoreStateOnly<Omit<ProductFilterStore, 'hydrated' | 'hydrate'>>
    >,
  ) => void
  categories: Array<string>
  price: {
    min: number
    max: number
  }
  tags: Array<string>
  setCategories: (categories: Array<string>) => void
  setPrice: (price: { min?: number; max?: number }) => void
  setTags: (tags: Array<string>) => void
}

export const useProductFilter = create<ProductFilterStore>()(
  persist(
    (set, get) => ({
      // Hydration state
      hydrated: false,
      hydrate: (
        payload: Partial<
          StoreStateOnly<Omit<ProductFilterStore, 'hydrated' | 'hydrate'>>
        >,
      ) => {
        if (!get().hydrated) {
          set({ ...payload, hydrated: true })
        }
      },

      categories: [],
      price: {
        min: 0,
        max: 100,
      },
      tags: [],
      setCategories: (categories: Array<string>) => set({ categories }),
      setPrice: (price: { min?: number; max?: number }) => {
        const { min, max } = price
        const currentPrice = get().price
        set({
          price: { min: min ?? currentPrice.min, max: max ?? currentPrice.max },
        })
      },
      setTags: (tags: Array<string>) => set({ tags }),
    }),
    {
      name: 'product-filter-storag',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
