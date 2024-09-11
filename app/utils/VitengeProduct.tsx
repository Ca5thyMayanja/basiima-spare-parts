export interface Product {
  id: string
  name: string
  description: string
  price: number
  brand: string
  category: 'Men' | 'Women' | 'Kids' | 'Accessories' | 'Shoes' | 'Bags' // Example categories
  subCategory: string // Specific category like "Men's Bags", "Women's Dresses"
  sizes: {
    size: string
    inStock: boolean
  }[] // Sizes available and their stock status
  inStock: boolean
  boughtStatus: boolean // Whether the product has been bought or not
  material: string // Material of the clothing
  careInstructions: string // Care instructions for the clothing
  discount: number // Discount on the product
  images: {
    color: string
    colorCode: string
    image: string
  }[]
  reviews: {
    id: string
    userId: string
    productId: string
    rating: number
    comment: string
    createdDate: string
    user: {
      id: string
      name: string
      email: string
      emailVerified: null
      image: string
      hashedPassword: null
      createdAt: string
      updatedAt: string
      role: string
    }
  }[]
  createdAt: string // Date the product was created
  updatedAt: string // Date the product was last updated
}

// Function to update size stock status
function updateSizeStockStatus(product: Product, sizeToTake: string): Product {
  const updatedSizes = product.sizes.map((size) => {
    if (size.size === sizeToTake) {
      return {
        ...size,
        inStock: false,
      }
    }
    return size
  })

  // Check if any sizes are still in stock
  const isInStock = updatedSizes.some((size) => size.inStock)

  // Return updated product
  return {
    ...product,
    sizes: updatedSizes,
    inStock: isInStock,
  }
}

// Sample product
let sampleProduct: Product = {
  id: '1',
  name: 'Sample T-Shirt',
  description: 'A cool T-shirt',
  price: 20,
  brand: 'Brand A',
  category: 'Men',
  subCategory: 'T-Shirts',
  sizes: [
    { size: 'S', inStock: true },
    { size: 'M', inStock: true },
    { size: 'L', inStock: true },
  ],
  inStock: true,
  boughtStatus: false,
  material: 'Cotton',
  careInstructions: 'Machine wash',
  discount: 0,
  images: [
    { color: 'Red', colorCode: '#FF0000', image: 'image1.jpg' },
    { color: 'Blue', colorCode: '#0000FF', image: 'image2.jpg' },
  ],
  reviews: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

// Take a size 'M'
sampleProduct = updateSizeStockStatus(sampleProduct, 'M')

console.log(sampleProduct)
