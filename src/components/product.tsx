'use client'

import Image from 'next/image'
import { CATEGORIES } from '@hero/constants/product'
import { ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { RangeSlider } from './ui/range-slider'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { cn } from '@hero/lib/utils'
import { Product } from '@hero/types/dto'
import { useMemo } from 'react'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  direction?: 'row' | 'column'
  onStoreCart?: (product: Product) => void
}

export const ProductCard = ({
  product,
  direction = 'column',
  onStoreCart,
  className,
  ...props
}: ProductCardProps) => {
  const priceWithDiscount = useMemo(() => {
    if (product.discount) {
      return product.price - (product.price * product.discount) / 100
    }
    return product.price
  }, [product.price, product.discount])
  return (
    <div
      className={cn(
        'flex border border-neutral-200 rounded-md p-4 gap-4',
        direction === 'row' ? 'flex-row' : 'flex-col',
        className,
      )}
      id={product.id}
      {...props}
    >
      <Image
        src={product.images[0]}
        alt="Product Image"
        width={direction === 'column' ? 200 : 75}
        height={direction === 'column' ? 200 : 75}
        className="rounded-md"
        loading="lazy"
      />
      <div className="flex justify-between items-center gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-neutral-500 line-clamp-1">{product.title}</h3>
          <p className="text-neutral-400">{product.unit}</p>
          <div className="flex items-end gap-2">
            <span
              className={cn(
                product.discount && 'line-through',
                'text-sm text-neutral-400',
              )}
            >
              {product.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
            {product.discount && (
              <span>
                {priceWithDiscount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
            )}
          </div>
        </div>
        {direction === 'column' && (
          <Button
            variant="ghost"
            className="bg-neutral-100 rounded-full p-2 cursor-pointer hover:bg-neutral-200 relative overflow-visible"
            onClick={(e) => {
              onStoreCart?.(product)
              const img = e.currentTarget.closest('div')?.querySelector('img')
              const cartIcon = e.currentTarget
              if (img && cartIcon) {
                const imgRect = img.getBoundingClientRect()
                const cartRect = cartIcon.getBoundingClientRect()
                const clone = img.cloneNode(true) as HTMLElement
                clone.style.position = 'fixed'
                clone.style.left = `${imgRect.left}px`
                clone.style.top = `${imgRect.top}px`
                clone.style.width = `${imgRect.width}px`
                clone.style.height = `${imgRect.height}px`
                clone.style.transition = 'all 0.7s cubic-bezier(.4,2,.6,1)'
                clone.style.zIndex = '9999'
                document.body.appendChild(clone)
                setTimeout(() => {
                  clone.style.left = `${cartRect.left}px`
                  clone.style.top = `${cartRect.top}px`
                  clone.style.width = '32px'
                  clone.style.height = '32px'
                  clone.style.opacity = '0.5'
                }, 10)
                setTimeout(() => {
                  document.body.removeChild(clone)
                }, 800)
              }
            }}
          >
            <ShoppingBag />
          </Button>
        )}
      </div>
    </div>
  )
}

interface FilterPanelItemProps {
  minPrice: number
  maxPrice: number
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
}

export const FilterPanelItem = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}: FilterPanelItemProps) => {
  return (
    <>
      <div className="mt-4">
        <h2 className="text-xl">All Categories</h2>

        <RadioGroup defaultValue={CATEGORIES[0].value} className="mt-4">
          {CATEGORIES.map((category, idx) => (
            <div className="flex items-center space-x-2" key={category.value}>
              <RadioGroupItem value={category.value} id={`r${idx + 1}`} />
              <Label htmlFor={`r${idx + 1}`} className="text-md font-light">
                {category.label}
                <span className="text-neutral-400">({idx + 1})</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <hr className="my-4 border-b border-neutral-100" />

      <div>
        <h2 className="text-xl">Price</h2>

        <RangeSlider
          min={0}
          max={100}
          step={1}
          values={[minPrice, maxPrice]}
          onChange={(values) => {
            setMinPrice(values[0])
            setMaxPrice(values[1])
          }}
          className="w-full mt-4"
        />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-neutral-400">Price: </span>
          <span className="text-sm text-neutral-600">
            ${minPrice}.00 - ${maxPrice}.00
          </span>
        </div>
      </div>

      <hr className="my-4 border-b border-neutral-100" />

      <div>
        <h2 className="text-xl">Popular Tag</h2>

        <div className="flex flex-wrap gap-2 mt-4">
          {['Fresh', 'Fruit', 'Vegetables', 'Cooking', 'Snacks'].map((tag) => (
            <Button
              key={tag}
              variant="outline"
              className="rounded-full px-4 py-2 text-sm font-light cursor-pointer hover:bg-neutral-100"
            >
              {tag}
            </Button>
          ))}
          <Button
            variant="outline"
            className="rounded-full px-4 py-2 text-sm font-light"
          >
            Show More
          </Button>
        </div>
      </div>
    </>
  )
}
