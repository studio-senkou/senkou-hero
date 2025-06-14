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
  SelectTrigger,
  SelectValue,
} from '@hero/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@hero/components/ui/sheet'
import { useProductFilter } from '@hero/hooks/use-product-filter'
import { Product, ProductCountByCategory, ProductTag } from '@hero/types/dto'
import { ChevronLeft, ChevronRight, GitPullRequestDraft, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState, Suspense, useMemo } from 'react'
import { Skeleton } from '@hero/components/ui/skeleton'

interface ProductsClientPageProps {
  products: Array<Product>
  categories: Array<ProductCountByCategory>
  sortBy: string
  tags: Array<string>
  pagination: {
    total: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
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
  pagination,
  filter: initialFilter,
}: ProductsClientPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProductLoading, setIsProductLoading] = useState(false)
  const { price: currentPrice, setPrice: setCurrentPrice } = useProductFilter()
  const hydrateFilterStore = useProductFilter((s) => s.hydrate)
  const isFilterHydrated = useProductFilter((s) => s.hydrated)
  const clearFilterStore = useProductFilter((s) => s.clear)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pendingPriceRef = useRef<{ min?: number; max?: number }>({})

  const hasFilter = useMemo(() => {
    const category = searchParams.get('category')
    const minPrice = searchParams.get('price[min]')
    const maxPrice = searchParams.get('price[max]')
    const tags = searchParams.getAll('tag')
    const hasCategory = !!category
    const hasMinPrice = !!minPrice
    const hasMaxPrice = !!maxPrice
    const hasTags = tags && tags.length > 0

    return hasCategory || hasMinPrice || hasMaxPrice || hasTags
  }, [searchParams])

  useEffect(() => {
    if (!isFilterHydrated && initialFilter?.price) {
      hydrateFilterStore({
        price: initialFilter.price,
        categories: initialFilter.category ? [initialFilter.category] : [],
        tags: [],
      })
    }
  }, [isFilterHydrated, hydrateFilterStore, initialFilter])

  const handleCategoryChange = (categoryName: string) => {
    const currentCategory = searchParams.get('category')
    if (currentCategory === categoryName) return

    setIsProductLoading(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', categoryName)

    params.set('page', '1')
    router?.push(`/products?${params.toString()}`)
  }

  const pushPriceFilterToRouter = () => {
    setIsProductLoading(true)
    const params = new URLSearchParams(searchParams.toString())
    if (pendingPriceRef.current.min !== undefined) {
      params.set('price[min]', pendingPriceRef.current.min.toString())
    }
    if (pendingPriceRef.current.max !== undefined) {
      params.set('price[max]', pendingPriceRef.current.max.toString())
    }

    params.set('page', '1')
    router?.push(`/products?${params.toString()}`)
  }

  const debouncedPushPriceFilter = () => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
    debounceTimeoutRef.current = setTimeout(() => {
      pushPriceFilterToRouter()
    }, 500)
  }
  const handleChangeMinPrice = (min: number) => {
    setCurrentPrice({ min })
    pendingPriceRef.current.min = min
    debouncedPushPriceFilter()
  }
  const handleChangeMaxPrice = (max: number) => {
    setCurrentPrice({ max })
    pendingPriceRef.current.max = max
    debouncedPushPriceFilter()
  }

  const handleTagChange = (tag: string) => {
    setIsProductLoading(true)
    const params = new URLSearchParams(searchParams.toString())
    const currentTags = params.getAll('tag')

    if (currentTags.includes(tag)) {
      const newTags = currentTags.filter((t) => t !== tag)
      params.delete('tag')
      newTags.forEach((t) => params.append('tag', t))
    } else {
      params.append('tag', tag)
    }

    params.set('page', '1')
    router?.push(`/products?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    if (newPage === pagination.currentPage) return

    setIsProductLoading(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router?.push(`/products?${params.toString()}`)
  }

  const handleSortByChange = (sortType: string) => {
    const currentSortType = searchParams.get('sort')
    if (currentSortType === sortType) return

    setIsProductLoading(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortType)

    params.set('page', '1')
    router?.push(`/products?${params.toString()}`)
  }

  useEffect(() => {
    setIsProductLoading(false)
  }, [products])

  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 overflow-hidden">
      <Navbar />{' '}
      <div className="flex w-full lg:max-w-3/4 gap-8 px-8">
        <div className="w-1/5 hidden lg:block">
          <aside>
            <Button
              className="flex items-center gap-2 px-8 py-4 cursor-pointer bg-[#00B207] text-white rounded-full"
              onClick={() => {
                if (hasFilter) {
                  clearFilterStore()
                  setCurrentPrice({
                    min: initialFilter?.price?.min || 0,
                    max: initialFilter?.price?.max || 100,
                  })
                  router.push('/products')
                  setTimeout(() => {
                    router.refresh()
                  }, 500)
                }
              }}
            >
              Filter
              {hasFilter ? <X size={16} /> : <GitPullRequestDraft size={16} />}
            </Button>
            {!isFilterHydrated ? (
              <div className="flex flex-col gap-4 mt-5">
                <Skeleton className="w-32 h-10 rounded-md" />
                <Skeleton className="w-full h-32 rounded-md" />
                <Skeleton className="w-full h-16 rounded-md" />
                <Skeleton className="w-full h-10 rounded-md" />
              </div>
            ) : (
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
            )}
          </aside>
        </div>
        <div className="flex-1 flex flex-col">
          {' '}
          <div className="flex gap-4 items-center w-full mb-6">
            <div className="flex items-center gap-2 lg:hidden">
              <Sheet defaultOpen={false}>
                <SheetTrigger asChild className="inline-flex">
                  <Button className="flex items-center gap-2 px-8 py-4 bg-[#00B207] text-white rounded-full">
                    Filter
                    <GitPullRequestDraft size={16} />
                  </Button>
                </SheetTrigger>{' '}
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
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 px-8 py-4 cursor-pointer border-[#00B207] text-[#00B207] hover:bg-[#00B207] hover:text-white rounded-full w-full justify-center"
                      onClick={() => {
                        if (hasFilter) {
                          clearFilterStore()
                          setCurrentPrice({
                            min: initialFilter?.price?.min || 0,
                            max: initialFilter?.price?.max || 100,
                          })
                          router.push('/products')
                          setTimeout(() => {
                            router.refresh()
                          }, 500)
                        }
                      }}
                      disabled={!hasFilter}
                    >
                      Clear Filter
                      {hasFilter && <X size={16} />}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <p className="text-neutral-400 font-medium">Sort by: </p>
              <Select defaultValue={sortBy} onValueChange={handleSortByChange}>
                <SelectTrigger className="min-w-[120px]">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="price">Cheapest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* <p className="text-neutral-400 font-medium ml-4">Show: </p>
              <Select
                defaultValue={pagination.pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="min-w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            </div>
            <div className="flex items-center gap-4 text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="text-app-primary-base">
                  {products.length > 0 ? pagination.currentPage : 0}
                </span>
                <span>/</span>
                <span>{pagination.totalPages}</span>
                <div className="flex items-center gap-2">
                  <Button
                    className="border border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-200 rounded-full w-8 h-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage <= 1}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    className="border border-neutral-200 bg-white text-neutral-400 hover:bg-neutral-200 rounded-full w-8 h-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {!isFilterHydrated || isProductLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-start">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="w-full h-64 rounded-md" />
              ))}
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-start">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-64 rounded-md" />
                  ))}
                </div>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full items-start">
                {products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={{ ...product }}
                    direction="column"
                    className="w-full"
                  />
                ))}
              </div>
            </Suspense>
          )}
          {pagination.totalPages > 1 && (
            <div className="flex flex-col gap-4 mt-8 items-center">
              <div className="flex items-center gap-4 text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="text-app-primary-base text-sm">
                    {pagination.currentPage}
                  </span>
                  <span className="text-sm">/</span>
                  <span className="text-sm">{pagination.totalPages}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer className="mt-24" />
    </div>
  )
}
