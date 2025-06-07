'use server'

import type {
  Product,
  ProductCountByCategory,
  ProductPriceRange,
} from '@hero/types/dto'
import { supabase } from './supabase'

interface ProductParams {
  category?: string
  price?: ProductPriceRange
}

export const getProducts = async ({
  category,
  price,
}: ProductParams = {}): Promise<Array<Product>> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        product_categories (
          id,
          category_id,
          category:category_id (
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
      .order('created_at', { ascending: false })

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

    return priceRangedProducts
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
