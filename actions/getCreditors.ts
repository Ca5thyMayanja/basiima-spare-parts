import prisma from "@/libs/prismadb"

export default async function getCreditors() {
  const creditors = await prisma.creditor.findMany({
    include: {
      user: true,
    },
  })

  return creditors
}
