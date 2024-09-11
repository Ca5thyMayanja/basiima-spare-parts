import React from 'react'
import { Product, CartProductType } from '@prisma/client'
import toast from 'react-hot-toast'
import useCart from '../hooks/useCart'
import formatPrice from '../utils/formatPrice'
import Link from 'next/link'
import LoadingCardcomponent from './LoadingCardComponent'
interface VerticalCardProps {
  loading: boolean
  data: Product[]
}

export default function VerticalCard({
  loading,
  data,
}: {
  loading: boolean
  data: Product[]
}) {
  const loadingList = new Array(13).fill(null)

  const { cartProducts, handleAddProductToCart } = useCart()

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

    handleAddProductToCart(ctpdt)
  }

  return (
    // <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
    <div className="grid grid-cols-2 gap-2 justify-between md:justify-between md:grid-cols-6 md:gap-3 overflow-x-scroll scrollbar-none transition-all p-4 ">
      {loading
        ? loadingList.map((product, index) => {
            return <LoadingCardcomponent key={index} />
          })
        : data.map((product, index) => {
            return (
              <ModifiedCardComponent
                key={index}
                product={product}
                index={index}
                handler={(e) => handleAddToCart(e, product.id)}
              />
            )
          })}
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
      href={'product/' + product.id}
      className=" min-w-[100px] rounded-lg max-w-[200px] border border-gray-300 shadow-2xl  text-[10px] relative"
    >
      <div className="flex justify-center items-center min-w-[100px] h-32 p-3 bg-slate-200">
        <img
          src={product.images[0].image}
          className=" h-full transition-all mix-blend-multiply object-contain hover:scale-100"
        />
      </div>
      {/* <div className="p-4 grid gap-3"> */}
      <div className="flex flex-col gap-2 p-2">
        <h2 className=" text-[10px] font-medium md:text-lg text-ellipsis line-clamp-1 text-black">
          {product.name}
        </h2>

        <p className="capitalize text-black">{product.category}</p>
        <div className="flex gap-3 items-center">
          <p className="text-red-600 font-bold text-sm">
            {formatPrice(product.price)}
          </p>
          <p className=" line-through text-ellipsis line-clamp-1 ">
            {formatPrice(product?.previousprice)}
          </p>
        </div>
        {product.instock ? (
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
