'use client'

import { useState, useMemo, useEffect, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CategoryFilter, ProductCard } from '@hero/components/product'
import type { Product, ProductCountByCategory } from '@hero/types/dto'
import { Loader2 } from 'lucide-react'

interface HomeClientProps {
  products: Product[]
  categories?: Array<ProductCountByCategory>
  initialCategory?: string
}

export function ProductClient({
  products,
  initialCategory,
  categories,
}: HomeClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialCategory || searchParams.get('category') || undefined,
  )
  const [isPending, startTransition] = useTransition()

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products

    return products.filter((product) =>
      product.product_categories?.some(
        (pc) => pc.category?.name === selectedCategory,
      ),
    )
  }, [products, selectedCategory])

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category === selectedCategory ? undefined : category)

      const params = new URLSearchParams(searchParams.toString())
      if (category === selectedCategory) {
        params.delete('category')
      } else {
        params.set('category', category)
      }

      const newUrl = params.toString() ? `/?${params.toString()}` : '/'
      router.replace(newUrl, { scroll: false })
    })
  }

  useEffect(() => {
    const category = searchParams.get('category')
    setSelectedCategory(category || undefined)
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center mt-20 w-full">
      <h2 className="text-3xl font-semibold text-center mb-5">
        Featured Products
      </h2>

      <CategoryFilter
        categories={[categories?.map((cat) => cat.category_name)]
          .flat()
          .filter((name): name is string => typeof name === 'string')}
        selectedCategory={selectedCategory || 'All'}
        onCategoryChange={(category) =>
          handleCategoryChange(category === 'All' ? '' : category)
        }
        className="mb-8"
      />

      <div className="relative w-full">
        {isPending && (
          <div className="absolute inset-0 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full lg:max-w-3/4 mx-auto px-4 transition-opacity duration-200">
          {filteredProducts.map((product: Product, index: number) => (
            <div
              key={product.id}
              className="animate-in fade-in-0 slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both',
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
