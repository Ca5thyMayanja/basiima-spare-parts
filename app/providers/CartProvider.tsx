'use client'
import React from 'react'
import { CartContextProvider } from '../hooks/useCart'

type CartProviderProps = {
  children: React.ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  return <CartContextProvider>{children}</CartContextProvider>
}
