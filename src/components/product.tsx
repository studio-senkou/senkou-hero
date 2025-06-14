'use client'

import { useMemo, useState, Suspense } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { RangeSlider } from './ui/range-slider'
import { Skeleton } from './ui/skeleton'
import { cn } from '@hero/lib/utils'
import { Product, ProductCountByCategory, ProductTag } from '@hero/types/dto'
import { useCart } from '@hero/hooks/use-cart'
import { toast } from 'sonner'
import { currencyFormatter } from '@hero/utils/currency'
import { getSupabaseAsset } from '@hero/utils/asset'

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  direction?: 'row' | 'column'
}

export const ProductCard = ({
  product,
  direction = 'column',
  className,
  ...props
}: ProductCardProps) => {
  const router = useRouter()
  const addProductToCart = useCart((state) => state.addItem)

  const priceWithDiscount = useMemo(() => {
    if (product.discount) {
      return product.price - (product.price * product.discount) / 100
    }
    return product.price
  }, [product.price, product.discount])

  const handleAddToCart = () => {
    addProductToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    })

    toast.success(`${product.title} added to cart`, {
      icon: null,
      duration: 5000,
      description: 'You can view your cart to proceed with checkout.',
      action: {
        label: 'View Cart',
        onClick: () => router.push('/cart'),
      },
    })
  }

  return (
    <div
      className={cn(
        'group product-card',
        'flex border border-neutral-200 rounded-md p-4 gap-4 overflow-hidden',
        'hover:border-neutral-300 transition-all duration-200',
        direction === 'row' ? 'flex-row h-full' : 'flex-col',
        className,
      )}
      id={product.id}
      {...props}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-md flex-shrink-0',
          direction === 'column' && 'w-full aspect-square',
          direction === 'row' && 'w-[75px] h-[75px]',
        )}
      >
        <Suspense
          fallback={
            <Skeleton
              className={
                direction === 'column'
                  ? 'w-full aspect-square'
                  : 'w-[75px] h-[75px]'
              }
            />
          }
        >
          <Image
            src={
              product.image
                ? getSupabaseAsset(`/products/${product.image}`)
                : '/vegetable-placeholder.webp'
            }
            alt={product.title}
            sizes={
              direction === 'column'
                ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                : '75px'
            }
            className="rounded-md object-cover"
            loading="lazy"
            fill
          />
        </Suspense>
      </div>

      {/* Product Info */}
      <div className="flex flex-col w-full min-h-0 flex-1">
        <div className="flex-1">
          <h3 className="text-neutral-800 line-clamp-1 mb-2">
            {product.title}
          </h3>
          <div className="flex items-end gap-1">
            {product.discount ? (
              <>
                <span className="line-through text-base font-normal text-neutral-800">
                  {currencyFormatter(product.price)}
                </span>
                <span className="text-lg font-semibold text-neutral-600">
                  {currencyFormatter(priceWithDiscount)}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-neutral-600">
                {currencyFormatter(product.price)}
              </span>
            )}
            <span className="text-sm text-neutral-500">/ {product.unit}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        {direction === 'column' && (
          <div className="mt-3 cursor-pointer">
            <Button
              className={cn(
                'bg-app-primary-base/10 hover:bg-app-primary-base text-app-primary-base hover:text-white',
                'w-full rounded-md py-2 px-4 flex items-center justify-center gap-2',
                'transition-all duration-300 ease-in-out transform',
                'border border-app-primary-base/30',
                'hover:scale-[1.02] active:scale-[0.98]',
              )}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                handleAddToCart()
              }}
            >
              <Plus size={16} />
              Add to Cart
            </Button>
          </div>
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

interface TagFilterProps {
  tags: Array<ProductTag>
  selectedTags?: Array<string>
  onSelectTag: (tag: string) => void
}

interface FilterPanelItemProps {
  category?: CategoryFilterProps
  price?: PriceFilterProps
  tag?: TagFilterProps
  disabled?: boolean
}

export const FilterPanelItem = ({
  category,
  price,
  tag,
  disabled,
}: FilterPanelItemProps) => {
  return (
    <>
      <div className="mt-4">
        <h2 className="text-xl">All Categories</h2>

        <RadioGroup
          defaultValue={category?.selectedCategory}
          className="mt-4"
          onValueChange={category?.onCategoryChange}
          disabled={disabled}
        >
          {category?.categories.map((category, idx) => (
            <div
              className="flex items-center space-x-2"
              key={category.category_id}
            >
              <RadioGroupItem
                value={category.category_name}
                id={`category-${category.category_id}`}
                disabled={disabled}
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
      <hr className="my-4 border-b border-neutral-100" />{' '}
      <div>
        <h2 className="text-xl">Price</h2>
        <RangeSlider
          min={price?.originalMinPrice ?? 0}
          max={price?.originalMaxPrice ?? 100}
          step={1}
          values={[
            price?.minPrice ?? price?.originalMinPrice ?? 0,
            price?.maxPrice ?? price?.originalMaxPrice ?? 100,
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
          {tag?.tags.map((t) => {
            const isSelected = tag.selectedTags?.includes(t.name)
            return (
              <Button
                key={t.id}
                variant={isSelected ? 'secondary' : 'outline'}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-light cursor-pointer capitalize flex items-center gap-1',
                  isSelected
                    ? 'bg-green-100 text-green-700 border-green-400 hover:bg-green-200'
                    : 'hover:bg-neutral-100',
                )}
                onClick={() => tag.onSelectTag(t.name)}
                disabled={disabled}
              >
                {t.name}
                {isSelected && <X className="ml-2" />}
              </Button>
            )
          })}
          {tag?.tags.length === 0 && (
            <span className="text-sm text-neutral-400">No tags available</span>
          )}
        </div>
      </div>
    </>
  )
}

interface CategoryFilterComponentProps {
  categories: Array<string>
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  className?: string
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
  ...props
}: CategoryFilterComponentProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleCategoryClick = async (category: string) => {
    setIsLoading(category)

    try {
      if (onCategoryChange) {
        // Allow clearing filter by clicking the same category
        onCategoryChange(category)
      } else {
        // Handle router navigation
        if (category === selectedCategory) {
          // Clear the category filter
          await router.push('/')
        } else {
          await router.push('/?category=' + encodeURIComponent(category))
        }
      }
    } catch (error) {
      console.error('Navigation error:', error)
    } finally {
      setTimeout(() => setIsLoading(null), 200)
    }
  }

  return (
    <div className={cn('flex items-center gap-2 p-1', className)} {...props}>
      {categories.map((category, index) => {
        const isSelected = category === selectedCategory
        const isLoadingThis = isLoading === category

        return (
          <button
            key={`category-${index}`}
            className={cn(
              'group border rounded-sm px-4 py-1.5 text-sm font-medium capitalize transition-all duration-200',
              'hover:scale-[1.02] active:scale-[0.98]',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-app-primary-base/30',
              isSelected
                ? 'bg-app-primary-base border-app-primary-base text-white shadow-md hover:bg-app-primary-base/90'
                : 'border-neutral-200 text-neutral-700 bg-white hover:border-app-primary-base/40 hover:bg-app-primary-base/5 hover:text-app-primary-base',
              isLoadingThis && 'pointer-events-none opacity-60',
            )}
            onClick={() => handleCategoryClick(category)}
            disabled={isLoading !== null}
            title={
              isSelected ? `Clear ${category} filter` : `Filter by ${category}`
            }
          >
            {isLoadingThis ? (
              <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-1.5">
                {category}
                {isSelected && (
                  <X
                    size={14}
                    className="opacity-75 group-hover:opacity-100 transition-opacity duration-200"
                  />
                )}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
