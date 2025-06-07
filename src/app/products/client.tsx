'use client'

import { Footer } from '@hero/components/footer'
import { FilterPanelItem, ProductCard } from '@hero/components/product'
import { Button } from '@hero/components/ui/button'
import { Navbar } from '@hero/components/ui/navbar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@hero/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@hero/components/ui/sheet'
import { useCart } from '@hero/hooks/use-cart'
import { useProductFilter } from '@hero/hooks/use-product-filter'
import { Product, ProductCountByCategory, ProductTag } from '@hero/types/dto'
import { GitPullRequestDraft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, Suspense } from 'react'
import { Skeleton } from '@hero/components/ui/skeleton'

interface ProductsClientPageProps {
  products: Array<Product>
  categories: Array<ProductCountByCategory>
  sortBy: string
  tags: Array<string>
  filter?: {
    category?: string
    price?: {
      min: number
      max: number
    }
    tags: Array<ProductTag>
  }
}

export default function ProductsClientPage({
  products,
  categories = [],
  sortBy,
  tags = [],
  filter: initialFilter,
}: ProductsClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { price: currentPrice, setPrice: setCurrentPrice } = useProductFilter()
  const hydrateFilterStore = useProductFilter((s) => s.hydrate)
  const isFilterHydrated = useProductFilter((s) => s.hydrated)
  const addProductToCart = useCart((state) => state.addItem)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pendingPriceRef = useRef<{ min?: number; max?: number }>({})

  useEffect(() => {
    if (!isFilterHydrated && initialFilter?.price) {
      hydrateFilterStore({
        price: initialFilter.price,
        categories: initialFilter.category ? [initialFilter.category] : [],
        tags: [],
      })
    }
  }, [isFilterHydrated, hydrateFilterStore, initialFilter])

  if (!isFilterHydrated) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-40 overflow-hidden">
        <Navbar />
        <div className="flex w-full lg:max-w-3/4 gap-8 px-8">
          <div className="w-1/5 hidden lg:block">
            <aside>
              <Skeleton className="w-full h-40 rounded-md mb-4" />
              <Skeleton className="w-full h-80 rounded-md" />
            </aside>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex gap-4 items-center w-full mb-6">
              <div className="flex items-center gap-2 lg:hidden">
                <Skeleton className="w-32 h-12 rounded-md" />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Skeleton className="w-24 h-8 rounded-md" />
                <Skeleton className="w-32 h-8 rounded-md" />
              </div>
              <div className="hidden lg:flex items-center gap-4 text-neutral-400">
                <Skeleton className="w-24 h-8 rounded-md" />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-6 w-full">
              {[...Array(6)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full min-w-[15rem] h-64 rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
        <Footer className="mt-24" />
      </div>
    )
  }

  const handleCategoryChange = (categoryName: string) => {
    const currentCategory = searchParams.get('category')
    if (currentCategory === categoryName) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('category', categoryName)
    router?.push(`/products?${params.toString()}`)
  }

  const pushPriceFilterToRouter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (pendingPriceRef.current.min !== undefined) {
      params.set('price[min]', pendingPriceRef.current.min.toString())
    }
    if (pendingPriceRef.current.max !== undefined) {
      params.set('price[max]', pendingPriceRef.current.max.toString())
    }
    router?.push(`/products?${params.toString()}`)
  }

  const debouncedPushPriceFilter = () => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
    debounceTimeoutRef.current = setTimeout(() => {
      pushPriceFilterToRouter()
    }, 500)
  }

  const handleChangeMinPrice = (min: number) => {
    const currentMinPrice = initialFilter?.price?.min || 0
    if (currentMinPrice > min) return

    setCurrentPrice({ min })
    pendingPriceRef.current.min = min
    debouncedPushPriceFilter()
  }

  const handleChangeMaxPrice = (max: number) => {
    const currentMaxPrice = initialFilter?.price?.max || 0
    if (currentMaxPrice < max) return

    setCurrentPrice({ max })
    pendingPriceRef.current.max = max
    debouncedPushPriceFilter()
  }

  const handleAddProductToCart = (product: Product) => {
    addProductToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    })
  }

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentTags = params.getAll('tag')

    if (currentTags.includes(tag)) {
      const newTags = currentTags.filter((t) => t !== tag)
      params.delete('tag')
      newTags.forEach((t) => params.append('tag', t))
    } else {
      params.append('tag', tag)
    }

    router?.push(`/products?${params.toString()}`)
  }

  const handleSortByChange = (sortType: string) => {
    const currentSortType = searchParams.get('sort')
    if (currentSortType === sortType) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortType)
    router?.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 overflow-hidden">
      <Navbar />

      <div className="flex w-full lg:max-w-3/4 gap-8 px-8">
        <div className="w-1/5 hidden lg:block">
          <aside>
            <Button className="flex items-center px-8 py-4 bg-[#00B207] text-white rounded-full">
              Filter
              <GitPullRequestDraft />
            </Button>

            <FilterPanelItem
              category={{
                categories: categories,
                selectedCategory: initialFilter?.category,
                onCategoryChange: handleCategoryChange,
              }}
              price={{
                originalMinPrice: initialFilter?.price?.min || 0,
                originalMaxPrice: initialFilter?.price?.max || 0,
                minPrice: currentPrice.min,
                maxPrice: currentPrice.max,
                setMinPrice: handleChangeMinPrice,
                setMaxPrice: handleChangeMaxPrice,
              }}
              tag={{
                tags: initialFilter?.tags || [],
                selectedTags: tags,
                onSelectTag: handleTagChange,
              }}
            />
          </aside>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex gap-4 items-center w-full mb-6">
            <div className="flex items-center gap-2 lg:hidden">
              <Sheet defaultOpen={false}>
                <SheetTrigger asChild className="inline-flex">
                  <Button className="flex items-center px-8 py-4 bg-[#00B207] text-white rounded-full">
                    Filter
                    <GitPullRequestDraft />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-8 overflow-y-auto">
                  <FilterPanelItem
                    category={{
                      categories: categories,
                      selectedCategory: initialFilter?.category,
                      onCategoryChange: handleCategoryChange,
                    }}
                    price={{
                      originalMinPrice: initialFilter?.price?.min || 0,
                      originalMaxPrice: initialFilter?.price?.max || 0,
                      minPrice: currentPrice.min,
                      maxPrice: currentPrice.max,
                      setMinPrice: handleChangeMinPrice,
                      setMaxPrice: handleChangeMaxPrice,
                    }}
                    tag={{
                      tags: initialFilter?.tags || [],
                      selectedTags: tags,
                      onSelectTag: handleTagChange,
                    }}
                  />
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <p className="text-neutral-400 font-medium">Sort by: </p>
              <Select defaultValue={sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="min-w-[120px]">
                  <SelectValue placeholder="Select your veggie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-neutral-400">
              <h4 className="text-md">
                <span className="text-neutral-500 font-bold">
                  {products.length}
                </span>{' '}
                Results Found
              </h4>
            </div>
          </div>
          <Suspense
            fallback={
              <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-6 w-full">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full min-w-[15rem] h-64 rounded-md"
                  />
                ))}
              </div>
            }
          >
            <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-6 w-full">
              {products.map((product, index) => (
                <div key={index} className="w-full min-w-[15rem] max-w-[0rem]">
                  <ProductCard
                    product={{ ...product, unit: '500mg' }}
                    onStoreCart={handleAddProductToCart}
                    direction="column"
                  />
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </div>

      <Footer className="mt-24" />
    </div>
  )
}
