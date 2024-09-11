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
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { SafeUser } from "@/types"
// import {toast} from 'react-hot-toast'

type Props = {
  currentUser: SafeUser | null
}

interface Gooduser {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export default function LoginForm({ currentUser }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (currentUser) {
      router.push("/cart")
      router.refresh()
    }
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      console.log("+++++++++++ signin response callback ", callback)

      setIsLoading(false)
      if (callback?.ok) {
        router.push("/cart")
        router.refresh()
        toast("Logged in", {
          id: "9",
          // toastId: "loggedinloginformsuccess",
        })
      }
      if (callback?.error) {
        toast.error(callback.error, {
          id: "10",
          // toastId: 'loginerrorloginform'
        })
      }
    })
    // console.log('____________ My data', data);
  }

  if (currentUser) {
    return <p className="">Already Logged in. Redirecting ....</p>
  }

  return (
    <>
      <Heading title="Sign In to Basiima Spare Parts" center={true} />
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
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <div className=" flex gap-4">
        <p>Do not have an Account?</p>
        <Link href={"/register"} className=" underline">
          Register
        </Link>
      </div>
    </>
  )
}
