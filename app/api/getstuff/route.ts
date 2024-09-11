import { NextResponse } from 'next/server'

export async function GET() {
  // const body = await req.json()

  const comments = [
    {
      id: 1,
      message: 'some mess 1',
    },
    {
      id: 2,
      message: 'some mess 2',
    },
    {
      id: 3,
      message: 'some mess 3',
    },
  ]

  // const { email, password } = body

  // const result = JSON.parse(body)

  return NextResponse.json(comments)
}
