"use client"

import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading"
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox"
import Input from "@/app/components/inputs/Input"
import TextArea from "@/app/components/inputs/TextArea"
import SelectColor, {
  ImageType,
  uploadedimageType,
} from "@/app/components/SelectColor"
import { categories } from "@/utils/Categories"
import CategoryInput from "@/utils/CategoryInput"
import { colors } from "@/utils/Colors"
import React, { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import toast from "react-hot-toast"
import firebaseapp from "@/libs/firebase"
import axios from "axios"
import { useRouter } from "next/navigation"

type Props = {}

export default function AddProductForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setisProductCreated] = useState(false)
  const router = useRouter()
  const [progress, setProgress] = useState<number>()

  // console.log('>>>>>>> Product Images selected', images)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      instock: false,
      images: [],
      price: "",
      previousprice: "",
    },
  })

  useEffect(() => {
    setCustomValue("images", images)
  }, [images])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setisProductCreated(false)
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    toast.loading("Creating product, Please wait..", {
      id: "waitingtocreatpdtid",
      duration: 2000,
    })

    let uploadedImages: uploadedimageType[] = []

    if (!data.category) {
      setIsLoading(false)
      return toast.error("Categories is not selected", {
        id: "nocategoryid",
      })
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false)
      return toast.error("No Imagees selected", {
        id: "nocategoryid",
      })
    }

    async function handleImageUploads() {
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name
            const storage = getStorage(firebaseapp)
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, item.image)
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  setProgress(progress)
                  console.log("Upload is " + progress + "% done")
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused")
                      break
                    case "running":
                      console.log("Upload is running")
                      break
                  }
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log("Error while uploading image", error)

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
                      console.log("File available at", downloadURL)
                      resolve()
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error)
                      reject(error)
                    })
                }
              )
            })
          }
        }
      } catch (error) {
        setIsLoading(false)
        console.log("Error handling image uploads", error)
        toast.error("Error handling image uploads")
      }
    }

    // toast.promise(handleImageUploads(), {
    //   loading: 'Creating product, Please wait..',
    //   success: 'Product created',
    //   error: 'Error when fetching',
    // })

    await handleImageUploads()

    const productData = { ...data, images: uploadedImages }

    // console.log('>>>>>>>>>>>>> Product Data', productData)

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created Successfully", {
          id: "successfullyucreatedid",
        })
        setisProductCreated(true)

        router.refresh()
        reset()
      })
      .catch((err) => {
        toast.error("Something went wrong " + err, {
          id: "somethingwentwrongid",
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const category = watch("category")

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
        return newlist
      }
      return prev
    })
  }, [])

  return (
    <>
      <Heading title="Add a product" center />
      <Input
        id={"name"}
        label={"Name"}
        disabled={isLoading}
        type={"string"}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={"price"}
        label={"Price"}
        disabled={isLoading}
        type={"number"}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={"previousprice"}
        label={"Previous-Price"}
        disabled={isLoading}
        type={"number"}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={"brand"}
        label={"Brand"}
        disabled={isLoading}
        type={"string"}
        required
        register={register}
        errors={errors}
      />
      <TextArea
        id={"description"}
        label={"Description"}
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />

      <CustomCheckBox
        id={"instock"}
        label={"This product is in stock"}
        register={register}
      />

      <div className=" w-full font-medium ">
        <div className=" mb-2 font-bold">Select Category</div>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null
            }
            return (
              <div
                key={item.label}
                className={`${category === item.label ? " bg-pink-300 border-slate-400" : "bg-white"} hover:border-slate-400 border rounded-xl`}
              >
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
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
                isProductCreated={isProductCreated}
              />
            )
          })}
        </div>
      </div>
      <Button
        label={`${isLoading ? `Uploading... ${progress?.toFixed(0)} % ` : "Add Product"}`}
        onClick={handleSubmit(onSubmit)}
        custom=""
      />
    </>
  )
}
