export interface Product {
  id: string
  title: string
  price: number
  unit: string
  discount?: number
  images: Array<string>
  description: string
  category: Array<string>
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}
