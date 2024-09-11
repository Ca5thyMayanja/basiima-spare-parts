'use client'
import React, { useEffect, useRef, useState } from 'react'
import useCart from '../hooks/useCart'
import formatPrice from '../utils/formatPrice'
import { CartProductType, Product, Review } from '@prisma/client'
import Link from 'next/link'
import fetchCategoryWiseProduct from '@/actions/fetchCategoryWiseProduct'
import { Rating } from '@mui/material'
import toast from 'react-hot-toast'
import LoadingCardComponent from './LoadingCardComponent'

interface Props {
  category: string
  heading: string
}

interface BetterProduct {
  product: Product & {
    reviews: Review[]
  }
}

export default function CategoryWiseProductsComponent({
  category,
  heading,
}: Props) {
  const [data, setData] = useState<BetterProduct[]>([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const { handleAddProductToCart, cartProducts } = useCart()

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(`/api/specificproduct`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
    if (!response.ok) {
      toast.error('Error occurred while fetching product from database')
      return
    }
    const pdt: Product = await response.json()

    if (!pdt) {
      return null
    }

    let ctpdt: CartProductType = {
      id: pdt.id,
      name: pdt.name,
      description: pdt.description,
      category: pdt.category,
      brand: pdt.brand,
      quantity: 1,
      price: pdt.price,
      selectedImg:
        pdt.images && pdt.images.length > 0
          ? {
              color: pdt.images[0].color,
              colorCode: pdt.images[0].colorCode,
              image: pdt.images[0].image,
            }
          : {
              color: '',
              colorCode: '',
              image: '',
            },
    }

    const existingid = cartProducts?.findIndex((pdt) => {
      pdt.id === ctpdt.id
    })

    if (existingid && existingid > -1) {
      toast('Product already exists in the cart!', {
        id: 'alt67',
      })
      return cartProducts //because product already exists
    }

    // toast.success('Product added to cart from actions function!', {
    //   duration: 6000,
    //   id: '456',
    // })
    handleAddProductToCart(ctpdt)
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)

    // console.log('>>>>>>>>> horizontal data', categoryProduct)
    setData(categoryProduct.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  //fisner yetes shuffle algorithm

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const shuffledPdts = shuffleArray(data)

  return (
    <div className="container mx-auto  my-6 relative">
      <h2 className="md:text-2xl text-lg font-bold py-4 text-center md:text-start">
        {heading}
      </h2>

      <div className="grid grid-cols-2 gap-2 justify-between md:justify-between md:grid-cols-6 md:gap-2 overflow-x-scroll scrollbar-none transition-all  py-4 ">
        {loading
          ? loadingList.map((product, index) => {
              return <LoadingCardComponent key={index} />
            })
          : shuffledPdts.map((product: any, index: number) => {
              return (
                <ModifiedCardComponent
                  key={index}
                  product={product}
                  index={index}
                  handler={(e) => handleAddToCart(e, product.product.id)}
                />
              )
            })}
      </div>
    </div>
  )
}

function ModifiedCardComponent({
  product,
  index,
  handler,
}: {
  product: any
  index: number
  handler: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Link
      href={'/product/' + product.product.id}
      className=" min-w-[100px] rounded-lg max-w-[200px] border border-gray-300 shadow-2xl  text-[10px] relative"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <div className="flex justify-center items-center min-w-[100px] h-32 p-3 bg-slate-200">
        <img
          src={product.product.images[0].image}
          className=" h-full transition-all mix-blend-multiply object-contain hover:scale-100"
        />
      </div>
      {/* <div className="p-4 grid gap-3"> */}
      <div className="flex flex-col gap-2 p-2">
        <h2 className=" text-[10px] font-medium md:text-lg text-ellipsis line-clamp-1 text-black">
          {product.product.name}
        </h2>
        <div>
          <Rating
            size="small"
            value={
              product.product.reviews?.reduce(
                (acc: number, item: any) => item.rating + acc,
                0,
              ) / product.product.reviews.length
            }
            readOnly
          />
        </div>
        <p className="capitalize text-black">{product.product.category}</p>
        <div className="flex gap-3 items-center">
          <p className="text-red-600 font-bold text-sm">
            {formatPrice(product.product.price)}
          </p>
          <p className="text-slate-500 line-through text-ellipsis line-clamp-1 ">
            {formatPrice(product?.product.previousprice)}
          </p>
        </div>
        {product.product.instock ? (
          <div></div>
        ) : (
          <div className=" md:text-sm font-bold rounded-full bg-yellow-600 p-3 z-40  w-fit h-fit absolute right-3 top-1/3">
            Sold
          </div>
        )}
        <button
          className=" bg-slate-400 transition md:text-sm duration-200 hover:bg-slate-700 text-white px-3 py-0.5 md:p-2 rounded-full"
          onClick={handler}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}
