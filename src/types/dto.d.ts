export interface Partner {
  id: number
  name: string
  logoname: string
  description: string
}

export interface ProductCategory {
  id: string
  name: string
  description: string
}

export interface ProductTag {
  id: string
  name: string
  description: string
}

export interface ProductCountByCategory {
  category_id: string
  category_name: string
  count: number
}

export interface ProductPriceRange {
  min: number
  max: number
}

export interface Product {
  id: string
  title: string
  price: number
  unit: string
  discount?: number
  image: string
  description: string
  product_categories: Array<{
    id: string
    category_id: string
    category: ProductCategory
  }>
  product_tags: Array<ProductTag>
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Client {
  id: number
  organization_name?: string
  organization_image?: string
  client_name: string
  client_image?: string
  address: string
  created_at: string
}

export interface Testimony {
  id: number
  testimony: string
  client: Client
  created_at: string
}
