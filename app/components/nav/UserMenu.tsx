"use client"
import React, { useCallback, useState } from "react"
import Avatar from "../Avatar"
import { AiFillCaretDown } from "react-icons/ai"
import Link from "next/link"
import MenuItem from "./MenuItem"
import { signOut } from "next-auth/react"
import BackDrop from "./BackDrop"
import { SafeUser } from "@/types"
import { BetterUser } from "./NavBar"

type Props = {
  currentUser: BetterUser | null
}

export default function UserMenu({ currentUser }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // console.log('__________________ CurrentUser: ',currentUser);

  return (
    <>
      <div className=" relative z-30 text-sm">
        <div
          onClick={toggleOpen}
          className=" border-slate-400 border-2 md:p-2 p-2  flex items-center flex-row md:gap-3 gap-1 md:mr-4 text-sm rounded-full cursor-pointer hover:shadow-md"
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className=" absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-1/2 text-sm flex flex-col cursor-pointer mt-8">
            {currentUser ? (
              <div>
                <Link href={"/orders"}>
                  <MenuItem onClick={toggleOpen}>Your orders</MenuItem>
                </Link>
                <Link href={"/admin"}>
                  <MenuItem
                    onClick={() => {
                      toggleOpen()
                    }}
                  >
                    Admin DashBoard
                  </MenuItem>
                </Link>
                <hr className=" h-[px] font-bold bg-black" />
                <MenuItem
                  onClick={() => {
                    toggleOpen()
                    signOut()
                  }}
                >
                  Log Out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href={"/login"}>
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
                </Link>{" "}
                <Link href={"/register"}>
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onclick={toggleOpen} /> : null}
    </>
  )
}
