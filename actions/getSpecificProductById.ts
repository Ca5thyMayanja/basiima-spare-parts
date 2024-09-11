import prisma from "@/libs/prismadb"

interface params {
  id?: string
}

export default async function getSpecificProductById(params: params) {
  try {
    const { id } = params
    const product = await prisma?.product.findMany({
      where: { id: id },
    })

    if (!product) {
      return null
    }
    return product[0]
  } catch (error) {}
}
