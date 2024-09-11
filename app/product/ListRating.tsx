import React from 'react'
import { Product } from '../utils/products'
import Heading from '../components/Heading'
import Image from 'next/image'
import moment from 'moment'
import Rating from '@mui/material/Rating'
import Avatar from '../components/Avatar'

type Props = {
  product: any
}

export default function ListRating({ product }: Props) {
  if (product.reviews.length === 0) {
    return null
  }

  return (
    <div>
      <Heading title={'Product reviews'} center={false} />
      {product.reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        product.reviews.map((review: any) => (
          <div key={review.id} className=" mt-5">
            <div className=" flex gap-3 mb-3">
              <Avatar src={review.user.image} />
              <div className=" font-bold">{review.user.name}</div>
              <div className=" ml-4">
                {moment(review.createdDate).fromNow()}
              </div>
            </div>
            <div>
              <Rating value={review.rating} readOnly />
            </div>
            <div className="">{review.comment}</div>
          </div>
        ))
      )}
    </div>
  )
}
