'use client'
import Button from '@/app/components/Button'
import Heading from '@/app/components/Heading'
import Input from '@/app/components/inputs/Input'
import { SafeUser } from '@/types'
import { Rating } from '@mui/material'
import { Order, Product, Review } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  product: Product & {
    reviews: Review[]
  }
  user:
    | (SafeUser & {
        orders: Order[]
      })
    | null
}

export default function AddRating({ product, user }: Props) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    },
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('>>>>>>>>>>>>.. Ratings data', data)

    setLoading(true)
    if (data.rating === 0) {
      setLoading(false)
      return toast.error('No rating selected', { id: 'raitng0error' })
    }

    const ratingData = { ...data, userId: user?.id, product: product }

    axios
      .post('/api/rating', ratingData)
      .then(() => {
        toast.success('Rating submitted')
        router.refresh()
        reset()
      })
      .catch((error) => {
        toast.error('Something went wrong', {
          id: 'errorsendingratingtoapi',
        })
        console.log('Error sending rating to api' + error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (!user || !product) return null

  const deliveredOrder = user?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === 'Delivered',
  )

  const userReview = product.reviews.find((review: Review) => {
    return review.userId === user.id
  })

  if (userReview || !deliveredOrder) return null

  return (
    <div className=" flex flex-col gap-2 max-w-[500px]">
      <Heading title={'Rate this product'} center={false} />
      <Rating
        onChange={(e, newValue) => {
          setCustomValue('rating', newValue)
        }}
      />
      <Input
        id={'comment'}
        label={'Comment'}
        type={''}
        required={false}
        register={register}
        errors={errors}
      />
      <Button
        label={loading ? 'Loading...' : 'Rate Product'}
        custom={''}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}
