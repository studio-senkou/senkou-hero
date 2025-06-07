import {
  getProductCountByCategories,
  getProductPriceRanges,
  getProducts,
} from '@hero/lib/products'
import ProductsClientPage from './client'

export const dynamic = 'force-dynamic'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams

  const products = await getProducts({
    category: params.category,
    price: {
      min: params['price[min]'] ? parseInt(params['price[min]'] as string) : 0,
      max: params['price[max]']
        ? parseInt(params['price[max]'] as string)
        : Number.MAX_SAFE_INTEGER,
    },
  })
  const categories = await getProductCountByCategories()
  const productPriceRanges = await getProductPriceRanges()

  return (
    <ProductsClientPage
      products={products}
      categories={categories}
      filter={{
        category: params.category,
        price: productPriceRanges,
      }}
    />
  )
}
