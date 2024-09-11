import prisma from "@/libs/prismadb"

interface params {
  id?: string
}

export default async function getProductById(params: params) {
  try {
    const { id } = params
    const product = await prisma?.product.findUnique({
      where: { id: id },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    })

    if (!product) {
      return null
    }
    return product
  } catch (error) {}
}
