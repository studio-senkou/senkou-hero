export const getProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
