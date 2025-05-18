'use client'

import Image from 'next/image'
import { CATEGORIES } from '@hero/constants/product'
import { GitPullRequestDraft, ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { RangeSlider } from './ui/range-slider'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useState } from 'react'

export const ProductCard = () => {
  return (
    <div className="flex flex-col border border-neutral-200 rounded-md p-4 gap-4">
      <Image
        src="/products/apple-p1.png"
        alt="Product Image"
        width={200}
        height={200}
        className="rounded-md"
        loading="lazy"
      />
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-neutral-500">Product name</h3>
          <span className="text-xl font-semibold">$0.00</span>
        </div>
        <Button
          variant="ghost"
          className="bg-neutral-100 rounded-full p-2 cursor-pointer hover:bg-neutral-200"
        >
          <ShoppingBag />
        </Button>
      </div>
    </div>
  )
}

export const ProductFilter = () => {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100)

  return (
    <aside>
      <Button className="flex items-center px-8 py-4 bg-[#00B207] text-white rounded-full">
        Filter
        <GitPullRequestDraft />
      </Button>

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
    </aside>
  )
}
