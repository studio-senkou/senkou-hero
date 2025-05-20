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
import { Product } from '@hero/types/dto'
import { GitPullRequestDraft } from 'lucide-react'

interface ProductsClientPageProps {
  products: Product[]
}

export default function ProductsClientPage({
  products,
}: ProductsClientPageProps) {
  const { price, setPrice } = useProductFilter()
  const addIntoCart = useCart((state) => state.addItem)

  const handleStoreProductIntoCart = (product: Product) => {
    addIntoCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
    })
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
              minPrice={price.min}
              maxPrice={price.max}
              setMinPrice={(price) => setPrice({ min: price })}
              setMaxPrice={(price) => setPrice({ max: price })}
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
                    minPrice={price.min}
                    maxPrice={price.max}
                    setMinPrice={(price) => setPrice({ min: price })}
                    setMaxPrice={(price) => setPrice({ max: price })}
                  />
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <p className="text-neutral-400 font-medium">Sort by: </p>
              <Select defaultValue="latest">
                <SelectTrigger className="min-w-[120px]">
                  <SelectValue placeholder="Select your veggie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Latest</SelectLabel>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-neutral-400">
              <h4 className="text-md">
                <span className="text-neutral-500 font-bold">10</span> Results
                Found
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-6 w-full">
            {products.map((product, index) => (
              <div key={index} className="w-full min-w-[15rem] max-w-[0rem]">
                <ProductCard
                  product={{ ...product, unit: '500mg' }}
                  onStoreCart={handleStoreProductIntoCart}
                  direction="column"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer className="mt-24" />
    </div>
  )
}
