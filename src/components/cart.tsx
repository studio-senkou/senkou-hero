import { cn } from '@hero/lib/utils'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const CartSummary = ({ items = [] }: { items: unknown[] }) => {
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
          <span>$0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Shipping</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <p>Total</p>
          <span>$0.00</span>
        </div>
      </div>
      <Button className="mt-12 bg-[#00B207] p-5  rounded-full">
        Process to checkout
      </Button>
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
        <Button className="absolute top-1/2 right-0 -translate-y-1/2 text-white rounded-full px-8 py-5 font-regular transition">
          Apply Coupon
        </Button>
      </div>
    </div>
  )
}
