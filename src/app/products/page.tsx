import { Footer } from '@hero/components/footer'
import { ProductCard, ProductFilter } from '@hero/components/product'
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

export default function Products() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 overflow-hidden">
      <Navbar />

      <div className="flex w-full lg:max-w-3/4 gap-8 px-8">
        <div className="w-1/5 hidden lg:block">
          <ProductFilter />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center w-full mb-6">
            <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-4 text-neutral-400">
              <h4 className="text-md">
                <span className="text-neutral-500 font-bold">10</span> Results
                Found
              </h4>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-6 w-full">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="w-full min-w-[15rem] max-w-[0rem]">
                <ProductCard />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer className="mt-24" />
    </div>
  )
}
