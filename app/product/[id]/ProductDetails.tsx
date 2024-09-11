'use client'

import Button from '@/app/components/Button'
import ProductImage from '@/app/components/products/ProductImage'
import SetColor from '@/app/components/products/SetColor'
import SetQuantity from '@/app/components/products/SetQuantity'
import useCart from '@/app/hooks/useCart'
import formatPrice from '@/app/utils/formatPrice'
import { Product } from '@/app/utils/products'
import Rating from '@mui/material/Rating'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheckCircle } from 'react-icons/fa'

type Props = {
  product: any
}

export type CartProductType = {
  id: string
  name: string
  description: string
  category: string
  brand: string
  selectedImg: SelectedImgType
  quantity: number
  price: number
}

export interface SelectedImgType {
  color: string
  colorCode: string
  image: string
}

export default function ProductDetails({ product }: Props) {
  const { handleAddProductToCart, cartTotalQty, cartProducts } = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false)
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  })

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id,
      )
      if (existingIndex > -1) {
        setIsProductInCart(true)
      }
    }
  }, [cartProducts])

  const router = useRouter()

  // console.log('+++++++cart products', cartProducts)
  // console.log('cart quantity', cartTotalQty)

  const pdtrating =
    product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length

  function Horizontal() {
    return <hr className=" w-[60%] my-3 "></hr>
  }

  const handleColorSelect = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImg: value }
      })
    },
    [cartProduct.selectedImg],
  )
  // console.log(cartProduct);

  function handleQtyIncrease() {
    if (cartProduct.quantity === 80) {
      return toast('Maxium quantity reached', {
        id: 'cartmaxreached',
        icon: '😬',
      })
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 }
    })
  }

  function handleQtyDecrease() {
    if (cartProduct.quantity < 2) {
      return toast("Products can't be less than 1", {
        id: 'cartminreached',
        icon: '😛',
      })
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity > 1 ? prev.quantity - 1 : 1 }
    })
  }

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div>
        <div className=" md:text-3xl text-xl font-bold mt-3">
          {product.name}
        </div>
        <div className=" text-xl my-3 flex gap-4  items-center">
          {formatPrice(product.price)}
          <p className="text-slate-500 line-through text-sm md:text-lg">
            {formatPrice(product?.previousprice)}
          </p>
        </div>
        <div>
          <div className="flex flex-row gap-5 my-3">
            <Rating value={pdtrating} readOnly />
            <div className="text-slate-500">
              {product.reviews.length}{' '}
              {product.reviews.length == 1 ? (
                <span>Review</span>
              ) : (
                <span>Reviews</span>
              )}
            </div>
          </div>
        </div>
        <Horizontal />
        <div className="text-justify flex flex-col">
          <div className=" text-sm">Description: </div>
          <div className=" font-medium md:text-lg">{product.description}</div>
        </div>
        <Horizontal />
        <div>
          <span className="font-semibold ">Category:</span>
          <span className="ml-2 md:text-lg">{product.category}</span>
        </div>
        <div>
          <span className="font-semibold ">Brand:</span>
          <span className="ml-2">{product.brand}</span>
        </div>
        <div
          className={
            product.instock
              ? ' text-green-500 font-bold text-[20px]'
              : ' text-red-500 font-bold text-xl'
          }
        >
          {product.instock ? 'In stock' : 'Out of Stock'}
        </div>
        <Horizontal />

        {isProductInCart ? (
          <>
            <div className="flex flex-row mt-4 items-center text-slate-500">
              <FaCheckCircle className=" text-teal-400 text-1xl" />
              <span className=" ml-5">Product added to cart</span>
            </div>
            <div className="mt-5 w-[300px] flex justify-center">
              <Button
                label={'View Cart'}
                outline
                custom={' text-sm'}
                onClick={function () {
                  router.push('/cart')
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuantity
              cartCounter={false}
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className=" max-w-[300px] flex justify-center">
              <Button
                label={'ADD TO CART'}
                onClick={() => handleAddProductToCart(cartProduct)}
                custom={'text-sm'}
              />
            </div>
            <Horizontal />
          </>
        )}
      </div>
    </div>
  )
}
