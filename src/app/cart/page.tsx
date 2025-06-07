'use client'

import { Footer } from '@hero/components/footer'
import { Navbar } from '@hero/components/ui/navbar'
import { useCart } from '@hero/hooks/use-cart'
import { cartColumns } from './column'
import { DataTable } from '@hero/components/ui/data-table'
import { CartCoupon, CartSummary } from '@hero/components/cart'
import { Button } from '@hero/components/ui/button'
import { Trash } from 'lucide-react'
import { Suspense } from 'react'
import { Skeleton } from '@hero/components/ui/skeleton'

export default function Cart() {
  const {
    items,
    selectedItems,
    selectItem,
    disselectItem,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()

  const isItemSelected = (id: string) =>
    selectedItems.some((item) => item.id === id)

  const columns = cartColumns({
    onSelect: (id) => selectItem(id),
    onDeselect: (id) => disselectItem(id),
    increaseQuantity: (id) => updateQuantity(id, 'increase'),
    decreaseQuantity: (id) => updateQuantity(id, 'decrease'),
    deleteProduct: removeItem,
    isItemSelected,
  })

  const handleCheckoutProduct = (ids: Array<string>) => {
    ids.forEach((id) => removeItem(id))
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 overflow-hidden">
      <Navbar />

      <div className="w-full lg:w-3/4 px-8">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center gap-4 w-full max-w-none lg:max-w-4/6">
          <h1 className="text-3xl font-semibold">Shopping Bag</h1>
          <div className="flex items-center gap-4 text-neutral-400 self-end">
            <h4 className="text-md uppercase">{items.length} items selected</h4>
            <span>|</span>
            <Button
              className="text-md p-0 cursor-pointer transition hover:bg-transparent hover:text-inherit"
              variant="ghost"
              onClick={clearCart}
            >
              <Trash />
              Delete All
            </Button>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex flex-col lg:flex-row w-full gap-4 mt-8">
              <div className="flex flex-col gap-4 w-full h-full max-w-none lg:max-w-4/6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-16 rounded-md mb-2" />
                ))}
                <Skeleton className="w-full h-24 rounded-md mt-4" />
              </div>
              <Skeleton className="w-full lg:w-1/4 h-64 rounded-md" />
            </div>
          }
        >
          <div className="flex flex-col lg:flex-row w-full gap-4 mt-8">
            <div className="flex flex-col gap-4 w-full h-full max-w-none lg:max-w-4/6">
              <DataTable columns={columns} data={items} />
              <CartCoupon className="w-full" />
            </div>
            <CartSummary
              items={selectedItems}
              onCheckout={handleCheckoutProduct}
            />
          </div>
        </Suspense>
      </div>
      <Footer className="mt-12" />
    </div>
  )
}
