import {
  getProductCountByCategories,
  getProductPriceRanges,
  getProducts,
  getProductTags,
} from '@hero/lib/products'
import ProductsClientPage from './client'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const pageSize = parseInt(params.pageSize || '10', 10)

  const productResponse = await getProducts({
    category: params.category,
    price: {
      min: params['price[min]'] ? parseInt(params['price[min]'] as string) : 0,
      max: params['price[max]']
        ? parseInt(params['price[max]'] as string)
        : Number.MAX_SAFE_INTEGER,
    },
    tag: params.tag
      ? Array.isArray(params.tag)
        ? params.tag
        : [params.tag]
      : [],
    sortBy: params.sort as 'latest' | 'price' | 'discount',
    page: currentPage,
    pageSize,
  })
  const tags = await getProductTags()
  const categories = await getProductCountByCategories()
  const productPriceRanges = await getProductPriceRanges()

  return (
    <ProductsClientPage
      products={productResponse.products}
      categories={categories}
      sortBy={params.sort!}
      tags={
        params.tag
          ? Array.isArray(params.tag)
            ? params.tag
            : [params.tag]
          : []
      }
      pagination={{
        total: productResponse.total,
        totalPages: productResponse.totalPages,
        currentPage: productResponse.currentPage,
        pageSize: productResponse.pageSize,
      }}
      filter={{
        category: params.category,
        price: productPriceRanges,
        tags,
      }}
    />
  )
}
