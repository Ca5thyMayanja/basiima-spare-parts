"use client"

import React, { useEffect, useState } from "react"
import Heading from "../components/Heading"
import Input from "../components/inputs/Input"
import {
  RegisterOptions,
  FieldValues,
  UseFormRegisterReturn,
  useForm,
  SubmitHandler,
} from "react-hook-form"
import Button from "../components/Button"
import { AiOutlineGoogle } from "react-icons/ai"
import Link from "next/link"
import axios from "axios"
import { toast } from "react-hot-toast"
import { signIn } from "next-auth/react"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { SafeUser } from "@/types"

type Props = {
  currentUser: SafeUser | null
}

interface Gooduser {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export default function RegisterForm({ currentUser }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.push("/cart")
      router.refresh()
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    // console.log('____________ My data', data);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created", {
          id: "11",
        })
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart")
            router.refresh()
            toast.success("Logged in", {
              id: "12",
            })
          }
          if (callback?.error) {
            toast.error(callback.error, {
              id: "13",
            })
          }
        })
      })
      .catch(() =>
        toast.error("Something went wrong!", {
          id: "14",
        })
      )
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (currentUser) {
    return <p className="">Already Logged in. Redirecting ....</p>
  }

  return (
    <>
      <Heading title="Sign Up for Basiima Spare Parts" center={true} />
      <Button
        onClick={() => {
          signIn("google")
        }}
        custom="text-sm w-[300px]"
        label="Continue with Google"
        outline
        icon={AiOutlineGoogle}
      />
      <hr className=" bg-slate-300 w-full h-px" />
      <Input
        id={"name"}
        label={"Name"}
        disabled={isLoading}
        type={""}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={"email"}
        label={"Email"}
        disabled={isLoading}
        type={""}
        required
        register={register}
        errors={errors}
      />
      <Input
        id={"password"}
        label={"Password"}
        disabled={isLoading}
        type={"password"}
        required
        register={register}
        errors={errors}
      />
      <Button
        custom=""
        label={isLoading ? "Loading" : "Submit"}
        onClick={handleSubmit(onSubmit)}
      />
      <div className=" flex gap-4 ">
        <p>Already have an account?</p>
        <Link href={"/login"} className=" underline">
          Login
        </Link>
      </div>
    </>
  )
}
