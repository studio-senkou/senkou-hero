'use server'

import type {
  Product,
  ProductCountByCategory,
  ProductPriceRange,
  ProductTag,
} from '@hero/types/dto'
import { supabase } from './supabase'

interface ProductParams {
  category?: string
  price?: ProductPriceRange
  tag?: string | Array<string>
  sortBy?: 'latest' | 'price' | 'discount'
}

export const getProducts = async ({
  category,
  price,
  tag,
  sortBy = 'latest',
}: ProductParams = {}): Promise<Array<Product>> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(
        '*, product_categories(*, category:category_id(*)), product_tags(*, tags:tag_id(*))',
      )
      .order(sortBy === 'latest' ? 'created_at' : sortBy, {
        ascending: sortBy !== 'latest',
      })

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('No data found')
    }

    const categorizedProducts = (data as unknown as Array<Product>).filter(
      (product) => {
        return category
          ? product.product_categories.some((c) => c.category.name === category)
          : true
      },
    )

    const priceRangedProducts = categorizedProducts.filter((product) => {
      const productPrice = product.price || 0
      return price?.min
        ? productPrice >= price.min && productPrice <= price.max
        : true
    })

    if (priceRangedProducts.length === 0) {
      throw new Error('No products found in the specified price range')
    }

    const taggedProducts = priceRangedProducts.filter((product) => {
      if (!tag || !tag.length) return true

      if (typeof tag === 'string') {
        return product.product_tags.some(
          (productTag) => productTag.tags.name === tag,
        )
      }

      if (Array.isArray(tag)) {
        return product.product_tags.some((productTag) =>
          tag.includes(productTag.tags.name),
        )
      }

      return true
    })

    return taggedProducts
  } catch {
    return []
  }
}

export const getBestSellingProducts = async (): Promise<Array<Product>> => {
  try {
    const { data: tag, error: tagError } = await supabase
      .from('tags')
      .select('id')
      .eq('name', 'Best Seller')
      .single()

    if (tagError || !tag) {
      throw new Error('Tag not found')
    }

    const { data: taggedProductIds, error: productError } = await supabase
      .from('products')
      .select(
        `
        *,
        product_categories (
          id,
          category_id,
          categories:category_id (
            id,
            name,
            description
          )
        ),
        product_tags (
          id,
          tag_id,
          tags:tag_id (
            id,
            name
          )
        )
      `,
      )
      .eq('product_tags.tag_id', tag.id)

    if (productError) {
      throw productError
    }

    return taggedProductIds as unknown as Array<Product>
  } catch {
    return []
  }
}

export const getProductCountByCategories = async (): Promise<
  Array<ProductCountByCategory>
> => {
  try {
    const { data, error } = await supabase.rpc('get_product_count_per_category')
    if (error) {
      throw error
    }

    return data as unknown as Array<ProductCountByCategory>
  } catch {
    return []
  }
}

export const getProductPriceRanges = async (): Promise<ProductPriceRange> => {
  try {
    const { data, error } = await supabase.rpc('get_product_price_ranges')

    if (error) {
      throw error
    }

    return data?.[0] as ProductPriceRange
  } catch {
    return { min: 0, max: 0 }
  }
}

export const getProductTags = async (): Promise<Array<ProductTag>> => {
  try {
    const { data, error } = await supabase.from('tags').select('*')

    if (error) {
      throw error
    }

    return data
  } catch {
    return []
  }
}
