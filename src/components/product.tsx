'use client'

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { RangeSlider } from './ui/range-slider'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { cn } from '@hero/lib/utils'
import { Product, ProductCountByCategory } from '@hero/types/dto'
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
      <div
        className={cn(
          'relative overflow-hidden rounded-md',
          direction === 'column' && 'w-[200px] h-[200px]',
          direction === 'row' && 'w-[75px] h-[75px]',
        )}
      >
        <Image
          src={
            product.image && process.env.NEXT_PUBLIC_SUPABASE_S3
              ? `${process.env.NEXT_PUBLIC_SUPABASE_S3}/products/${product.image}`
              : 'https://placehold.in/200.webp'
          }
          alt="Product Image"
          sizes={direction === 'column' ? '200px' : '75px'}
          className="rounded-md object-cover"
          loading="lazy"
          fill
        />
      </div>
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
              const img = e.currentTarget.closest('div')
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

interface CategoryFilterProps {
  categories: Array<ProductCountByCategory>
  selectedCategory?: string
  onCategoryChange: (categoryName: string) => void
}

interface PriceFilterProps {
  originalMinPrice: number
  originalMaxPrice: number
  minPrice: number
  maxPrice: number
  setMinPrice: (value: number) => void
  setMaxPrice: (value: number) => void
}

interface FilterPanelItemProps {
  category?: CategoryFilterProps
  price?: PriceFilterProps
}

export const FilterPanelItem = ({ category, price }: FilterPanelItemProps) => {
  return (
    <>
      <div className="mt-4">
        <h2 className="text-xl">All Categories</h2>

        <RadioGroup
          defaultValue={category?.selectedCategory}
          className="mt-4"
          onValueChange={category?.onCategoryChange}
        >
          {category?.categories.map((category, idx) => (
            <div
              className="flex items-center space-x-2"
              key={category.category_id}
            >
              <RadioGroupItem
                value={category.category_name}
                id={`category-${category.category_id}`}
              />
              <Label
                htmlFor={`category-${category.category_id}`}
                className="text-md font-light capitalize"
              >
                {category.category_name}
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
          min={price?.originalMinPrice ?? price?.minPrice ?? 0}
          max={price?.originalMaxPrice ?? price?.maxPrice ?? 100}
          step={1}
          values={[
            price?.minPrice ?? price?.originalMinPrice ?? 0,
            price?.maxPrice ?? price?.originalMaxPrice ?? 0,
          ]}
          onChange={(values) => {
            price?.setMinPrice(values[0])
            price?.setMaxPrice(values[1])
          }}
          className="w-full mt-4"
        />
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-neutral-400">Price: </span>
          <span className="text-sm text-neutral-600">
            ${price?.minPrice ?? 0}.00 - ${price?.maxPrice ?? 0}.00
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
