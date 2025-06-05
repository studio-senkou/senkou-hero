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

export interface Product {
  id: string
  title: string
  price: number
  unit: string
  discount?: number
  images: Array<string>
  description: string
  category: Array<string>
  product_categories: Array<ProductCategory>
  product_tags: Array<ProductTag>
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}
