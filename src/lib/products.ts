'use server'

import type { Product } from '@hero/types/dto'
import { supabase } from './supabase'

export const getProducts = async (): Promise<Array<Product>> => {
  try {
    const { data, error } = await supabase.from('products').select(`
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
      `)

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('No data found')
    }

    return data as unknown as Array<Product>
  } catch {
    return []
  }
}

export const getBestSellingProducts = async (): Promise<Array<Product>> => {
  try {
    const { data: taggedProductIds, error: tagError } = await supabase
      .from('product_tags')
      .select(
        `
        product_id,
        tags:tag_id (
          name
        )
      `,
      )
      .eq('tags.name', 'Best Seller')

    if (tagError) {
      throw tagError
    }

    const productIds = taggedProductIds?.map((item) => item.product_id) || []

    if (productIds.length === 0) {
      return []
    }

    // Then get the products with those IDs
    const { data, error } = await supabase
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
      .in('id', productIds)

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('No data found')
    }

    return data as unknown as Array<Product>
  } catch {
    return []
  }
}
