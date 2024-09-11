import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // console.log('--------request form', req)

    if (!req.url) {
      return NextResponse.json(
        {
          message: "Request URL is missing",
          error: true,
          success: false,
        },
        { status: 400 }
      )
    }

    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")

    console.log("-------- api search query: ", query)

    if (!query) {
      return NextResponse.json({
        message: "Query parameter q is required",
        error: true,
        success: false,
        status: 400,
      })
    }

    const product = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    })

    console.log(">>>>>>>>>> api part product gotten: ", product)

    return NextResponse.json({
      data: product,
      message: "Search Product list",
      error: false,
      success: true,
      status: 200,
    })
  } catch (err: any) {
    return NextResponse.json({
      message: err.message || err,
      error: true,
      success: false,
      status: 500,
    })
  } finally {
    await prisma.$disconnect()
  }
}
