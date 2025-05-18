import { getProducts } from '@hero/lib/products'
import ProductsClientPage from './client'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getProducts()

  return <ProductsClientPage products={products} />
}
