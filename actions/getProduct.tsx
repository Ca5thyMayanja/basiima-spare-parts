import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface IProductParams {
  category?: string | null
  searchTerm?: string | null
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params

    let searchString = searchTerm

    // console.log('>>>>>>>>>>>> Search string from get products:', searchString)

    if (!searchTerm) {
      searchString = ''
    }

    let query: any = {}

    if (category) {
      query.category = category
    }

    if (searchString) {
      query.OR = [
        {
          name: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
        {
          category: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
      ]
    }

    const products = await prisma.product.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: 'desc',
          },
        },
      },
    })

    if (!products) {
      console.log('No products got ')
    }

    // console.log('>>>>> products fetched after search', products)

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
