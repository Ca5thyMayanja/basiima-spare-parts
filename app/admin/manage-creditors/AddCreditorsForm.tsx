"use client"

import Button from "@/app/components/Button"
import Heading from "@/app/components/Heading"
import Input from "@/app/components/inputs/Input"
import TextArea from "@/app/components/inputs/TextArea"
import React, { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

type Props = {
  userId: string
}

export default function AddCreditorsForm({ userId }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const [isCreditCreated, setisCreditCreated] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      amount: "",
      items: "",
    },
  })

  useEffect(() => {
    if (isCreditCreated) {
      reset()
      setisCreditCreated(false)
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    toast.loading("Creating Credit, Please wait..", {
      id: "waitingtocreatpdtid",
      duration: 2000,
    })

    if (!data.name) {
      setIsLoading(false)
      return toast.error("Creditor Name not filled", {
        id: "nocategoryid",
      })
    }

    if (!data.amount) {
      setIsLoading(false)
      return toast.error("Amount not filled", {
        id: "nocategoryid",
      })
    }
    if (!data.items || data.items.length === 0) {
      setIsLoading(false)
      return toast.error("No Items filled", {
        id: "nocategoryid",
      })
    }

    const creditdata = { ...data, userId }

    console.log(">>>>>>>>>>>>> Cedit Data", creditdata)

    axios
      .post("/api/credit", creditdata)
      .then(() => {
        toast.success("Credit created Successfully", {
          id: "successfullyucreatedid",
        })
        setisCreditCreated(true)

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

  return (
    <>
      <Heading title="Add a Credit" center />
      <Input
        id={"name"}
        label={"Creditor Name"}
        disabled={isLoading}
        type={"string"}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={"amount"}
        label={"Amount"}
        disabled={isLoading}
        type={"number"}
        required
        register={register}
        errors={errors}
      />
      <TextArea
        id={"items"}
        label={"Items & Description"}
        disabled={isLoading}
        required
        register={register}
        errors={errors}
      />
      <Button label="Add Credit" onClick={handleSubmit(onSubmit)} custom="" />
    </>
  )
}
