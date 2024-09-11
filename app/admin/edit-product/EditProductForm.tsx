'use client'

import Button from '@/app/components/Button'
import Heading from '@/app/components/Heading'
import CustomCheckBox from '@/app/components/inputs/CustomCheckBox'
import Input from '@/app/components/inputs/Input'
import TextArea from '@/app/components/inputs/TextArea'
import { categories } from '@/utils/Categories'
import CategoryInput from '@/utils/CategoryInput'
import { colors } from '@/utils/Colors'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import toast from 'react-hot-toast'
import firebaseapp from '@/libs/firebase'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import SelectColor, { uploadedimageType } from '@/app/components/SelectColor'
import { IoCloseCircle } from 'react-icons/io5'

type ImageType = {
  color: string
  colorCode: string
  image: string | File | null
}

interface pdt_type_sent {
  id: string
  name: string
  description: string
  price: number
  previousprice: number
  brand: string
  category: string
  instock: boolean
  images: {
    color: string
    colorCode: string
    image: string
  }[]
}

export default function EditProductForm({
  product,
}: {
  product: pdt_type_sent
}) {
  const [isLoading, setIsLoading] = useState(false)

  const imageurls = product.images.map((im) => {
    return {
      color: im.color,
      image: im.image,
    }
  })

  const imagesgotten = product.images.map((im) => {
    return {
      color: im.color,
      colorCode: im.colorCode,
      image: im.image,
    }
  })

  const [availableImages, setAvailableImages] = useState<ImageType[]>([])
  const [selectedavailableImages, setselectedAvailableImages] = useState<
    ImageType[]
  >([])

  useEffect(() => {
    // setImages(availableImages)
    setAvailableImages(imagesgotten)
    console.log(
      '>>>>>>>>>>>>>>> already available images in state: ',
      availableImages,
    )
    console.log('>>>>>>>>>>>>>>> all images in state: ', images)
  }, [])

  // setimagesgotten(imagesgotten)

  // const [images, setImages] = useState<ImageType[]>(imagesgotten)
  const [images, setImages] = useState<ImageType[]>([])
  const [isProductUpdated, setisProductUpdated] = useState(false)
  const router = useRouter()
  const [progress, setProgress] = useState<number>()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      instock: product.instock,
      images: product.images,
      price: product.price,
      previousprice: product.previousprice,
    },
  })

  useEffect(() => {
    setCustomValue('images', images)
  }, [images])

  useEffect(() => {
    if (isProductUpdated) {
      reset()
      setImages([])
      setisProductUpdated(false)
    }
  }, [])

  const removeavailableimages = useCallback((image: ImageType) => {
    setAvailableImages((prev) => {
      if (prev) {
        const newimages = prev.filter((im) => im.image !== image.image)

        return newimages
      } else {
        return prev
      }
    })
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    toast.loading('Updating product, Please wait..', {
      id: 'waitingtocreatpdtid',
      duration: 2000,
    })

    let uploadedImages: uploadedimageType[] = []

    if (!data.category) {
      setIsLoading(false)
      return toast.error('No Category is selected', {
        id: 'nocategoryid',
      })
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false)
      return toast.error('No Imagees selected', {
        id: 'nocategoryid',
      })
    }

    async function handleImageUploads() {
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name
            const storage = getStorage(firebaseapp)
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  setProgress(progress)
                  console.log('Upload is ' + progress + '% done')
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused')
                      break
                    case 'running':
                      console.log('Upload is running')
                      break
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log('Error while uploading image', error)

                  reject(error)
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      })
                      console.log('File available at', downloadURL)
                      resolve()
                    })
                    .catch((error) => {
                      console.log('Error getting the download URL', error)
                      reject(error)
                    })
                },
              )
            })
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log('Error handling image uploads', error)
        toast.error('Error handling image uploads')
      }
    }

    await handleImageUploads()

    const allimagesarray = [...uploadedImages, ...availableImages]

    console.log('----------- Images at this point ', allimagesarray)

    const productData = {
      ...data,
      images: allimagesarray,
      price: parseFloat(data.price),
      previousprice: parseFloat(data.previousprice),
    }

    console.log('>>>>>>>>>>>>> Updated Product Data', productData)

    axios
      .put('/api/product/' + product.id, productData)
      .then(() => {
        toast.success('Product updated Successfully', {
          id: 'successfullyupdatedid',
        })
        setisProductUpdated(true)

        router.refresh()
      })
      .catch((err) => {
        toast.error('Something went wrong ' + err, {
          id: 'somethingwentwrongid',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const category = watch('category')

  // console.log('>>>>> Watched category', category)

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })
  }

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value]
      }
      return [...prev, value]
    })
  }, [])

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const newlist = prev?.filter((item) => item.color !== value.color)
        console.log('>>>>>> new list ', newlist)
        return newlist
      }
      console.log('>>>>>> prev', prev)

      return prev
    })
  }, [])

  return (
    <>
      <Heading title="Add a product" center />
      <Input
        id={'name'}
        label={'Name'}
        disabled={isLoading}
        type={'string'}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={'price'}
        label={'Price'}
        disabled={isLoading}
        type={'number'}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={'previousprice'}
        label={'Previous-Price'}
        disabled={isLoading}
        type={'number'}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={'brand'}
        label={'Brand'}
        disabled={isLoading}
        type={'string'}
        required
        register={register}
        errors={errors}
      />
      <TextArea
        id={'description'}
        label={'Description'}
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />

      <CustomCheckBox
        id={'instock'}
        label={'This product is in stock'}
        register={register}
      />

      <div className=" w-full font-medium ">
        <div className=" mb-2 font-bold">Select Category</div>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === 'All') {
              return null
            }
            return (
              <div
                key={item.label}
                className={`${category === item.label ? ' bg-pink-300 border-slate-400' : 'bg-white'} hover:border-slate-400 border rounded-xl`}
              >
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  image={item.image}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className=" w-full flex flex-col flex-wrap gap-4">
        <div>
          <div>Select the available product colors and upload their images</div>
          <div className=" text-sm">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                removeImageFromState={removeImageFromState}
                addImageToState={addImageToState}
                isProductCreated={isProductUpdated}
              />
            )
          })}
        </div>
      </div>
      <div>Already available Images</div>
      <AvailableImagesComponent
        availableImages={availableImages}
        imagesgotten={imagesgotten}
        imagesurls={imageurls}
        removeImageFromState={removeavailableimages}
      />
      <Button
        label={`${isLoading ? `Uploading... ${progress?.toFixed(0)} % ` : 'Update Product'}`}
        onClick={handleSubmit(onSubmit)}
        custom=""
      />
    </>
  )
}

function AvailableImagesComponent({
  availableImages,
  imagesgotten,
  removeImageFromState,
}: {
  availableImages: ImageType[]
  imagesgotten: ImageType[]
  imagesurls: { image: string; color: string }[]
  removeImageFromState: (item: ImageType) => void
}) {
  console.log('----------------------images in state: ', availableImages)

  function removeImage(urlToRemove: any) {
    const imagetoberemovedindex = imagesgotten.findIndex(
      (im) => im.image === urlToRemove,
    )

    if (imagetoberemovedindex !== -1) {
      removeImageFromState(imagesgotten[imagetoberemovedindex])
    } else {
      console.log('does not exist in state index', imagetoberemovedindex)
      console.log('image', imagesgotten[imagetoberemovedindex])

      return null
    }
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-3 ">
        {
          <div className="mt-4 max-h-48 overflow-y-auto no-scrollbar">
            <div className="flex flex-wrap gap-2">
              {availableImages.map(({ image, color }, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 md:w-36 md:h-44  bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                >
                  <img
                    src={typeof image === 'string' ? image : ''}
                    alt={`Uploaded file ${index + 1}`}
                    className="rounded-lg h-24 object-cover w-screen"
                  />
                  <div className=" absolute bottom-2">{color}</div>
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="absolute top-1 right-1 bg-white rounded-full "
                  >
                    <IoCloseCircle className=" h-8 w-8" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
