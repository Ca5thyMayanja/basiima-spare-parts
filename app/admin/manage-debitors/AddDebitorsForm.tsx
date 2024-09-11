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

export default function AddDebitorsForm({ userId }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const [isDebitCreated, setisDebitCreated] = useState(false)
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
    if (isDebitCreated) {
      reset()
      setisDebitCreated(false)
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    toast.loading("Creating Debit, Please wait..", {
      id: "waitingtocreatpdtid",
      duration: 2000,
    })

    if (!data.name) {
      setIsLoading(false)
      return toast.error("Debitor Name not filled", {
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

    const debitdata = { ...data, userId }

    console.log(">>>>>>>>>>>>> Debit Data", debitdata)

    axios
      .post("/api/debit", debitdata)
      .then(() => {
        toast.success("Debit created Successfully", {
          id: "successfullyucreatedid",
        })
        setisDebitCreated(true)

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
      <Heading title="Add a Debit" center />
      <Input
        id={"name"}
        label={"Debitor Name"}
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
      <Button label="Add Debit" onClick={handleSubmit(onSubmit)} custom="" />
    </>
  )
}
