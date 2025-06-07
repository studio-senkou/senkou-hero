'use client'

import { cn } from '@hero/lib/utils'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { CartItem } from '@hero/types/dto'
import { useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import Image from 'next/image'
import { toast } from 'sonner'

interface CartSummaryProps {
  items: Array<CartItem>
  onCheckout?: (ids: Array<string>) => void
}

export const CartSummary = ({ items = [], onCheckout }: CartSummaryProps) => {
  const [sheetOpen, setSheetOpen] = useState(false)

  const subTotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [items])

  const total = useMemo(() => subTotal + 0, [subTotal])

  const sendToCheckout = () => {
    const message = encodeURIComponent(
      `Hello, I would like to place an order:\n\n` +
        items
          .map(
            (item, idx) =>
              `${idx + 1}. ${item.name}\n   Qty: ${item.quantity} x $${item.price.toFixed(2)} = $${(
                item.price * item.quantity
              ).toFixed(2)}`,
          )
          .join('\n') +
        `\n\n-----------------------------\n` +
        `Subtotal: $${subTotal.toFixed(2)}\n` +
        `Shipping: Free\n` +
        `Total: $${total.toFixed(2)}\n\n` +
        `Could you please confirm my order? Thank you!`,
    )
    const whatsappUrl = `https://wa.me/?text=${message}`
    onCheckout?.(items.map((item) => item.id))
    setSheetOpen(false)
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="flex flex-col w-full max-w-none lg:max-w-2/6 p-4 border rounded-md">
      <h2 className="text-lg font-medium">Order</h2>
      <div className="flex flex-col gap-4 mt-4 text-sm text-neutral-600">
        <div className="flex justify-between items-center">
          <p>Total Item</p>
          <span>{`(${items.length})`}</span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <span>${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <p>Total</p>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            disabled={items.length === 0}
            className="mt-12 bg-[#00B207] p-5 rounded-full cursor-pointer hover:bg-[#00b206bb] text-white font-regular transition"
            onClick={() => {
              if (items.length === 0) {
                toast('Your cart is empty', {
                  description:
                    'Please add items to your cart before proceeding.',
                })
                return
              }
              setSheetOpen(true)
            }}
          >
            Process to checkout
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="w-full mx-auto rounded-t-2xl pb-8 pt-4 px-4 shadow-2xl flex flex-col items-center"
        >
          <div className="w-12 h-1.5 bg-neutral-300 rounded-full mb-4" />
          <div className="!max-w-md w-full">
            <div className="p-2 w-full">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center">
                    <Image
                      src={
                        item.image
                          ? `${process.env.NEXT_PUBLIC_SUPABASE_S3}/products/${item.image}`
                          : 'https://placehold.in/200.webp'
                      }
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md mr-4 mb-4"
                      loading="lazy"
                      unoptimized
                    />
                    <div>
                      <h3 className="text-md font-medium">{item.name}</h3>
                      <p className="text-sm text-neutral-500">
                        Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium ml-4">
                    x {item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full mt-4 text-sm text-neutral-700">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="mt-8 w-full bg-[#00B207] p-5 rounded-full cursor-pointer hover:bg-[#00b206bb] text-white font-regular transition"
              onClick={sendToCheckout}
            >
              Checkout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export const CartCoupon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-md',
        className,
      )}
      {...props}
    >
      <h2 className="text-lg font-medium">Coupon Code</h2>
      <div className="relative w-full max-w-none lg:max-w-xl p-5 lg:p-0">
        <Input
          className="bg-white rounded-full p-5 placeholder:text-neutral-400 w-full"
          placeholder="Enter code"
        />
        <Button className="absolute top-1/2 right-0 -translate-y-1/2 text-white rounded-full px-8 py-5 font-regular transition cursor-pointer">
          Apply Coupon
        </Button>
      </div>
    </div>
  )
}
