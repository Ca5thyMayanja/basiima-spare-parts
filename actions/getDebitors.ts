import prisma from "@/libs/prismadb"

export default async function getDebitorss() {
  const creditors = await prisma.debitor.findMany({
    include: {
      user: true,
    },
  })

  return creditors
}
