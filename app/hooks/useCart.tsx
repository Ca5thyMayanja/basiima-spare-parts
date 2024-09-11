import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { CartProductType } from '../product/[id]/ProductDetails'
import { toast } from 'react-hot-toast'

type CartContextType = {
  cartTotalQty: number
  cartTotalAmount: number
  cartProducts: CartProductType[] | null
  cartPdtids: string[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleAddProductToCartById: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => void
  handleRemoveProductFromCart: (product: CartProductType) => void
  clearCart: () => void
  handleQtyIncrease: (product: CartProductType) => void
  handleQtyDecrease: (product: CartProductType) => void
  paymentIntent: string | null
  clientSecret: string | undefined
  handleSetPaymentIntent: (val: string | null) => void
  handleSetClientSecret: (val: string | undefined) => void
}

const CartContext = createContext<CartContextType | null>(null)

type Props = {
  [propName: string]: any
}

export function CartContextProvider(props: Props) {
  const [cartTotalQty, setCartTotalQty] = useState(0)
  const [cartTotalAmount, setCartTotalAmount] = useState(0)
  const [cartProducts, setCartCartProducts] = useState<
    CartProductType[] | null
  >(null)

  const [cartPdtids, setCartPdtIds] = useState<string[] | null>(null)

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | undefined>('')

  useEffect(() => {
    const cartitems = localStorage.getItem('cart')
    if (cartitems) {
      const cartProducts: CartProductType[] = JSON.parse(cartitems)
      const paymentintent: any = localStorage.getItem('paymentintent')
      const paymentIntent = JSON.parse(paymentintent)

      setCartCartProducts(cartProducts)
      setPaymentIntent(paymentIntent)
    } else {
      setCartCartProducts([]) // Set to an empty array if there's no data in localStorage
      setPaymentIntent(null)
      setClientSecret('') // Also reset clientSecret
    }
  }, [])

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity
            acc.total += itemTotal
            acc.qty += item.quantity

            return acc
          },
          { total: 0, qty: 0 },
        )
        setCartTotalAmount(total)
        setCartTotalQty(qty)
      }
    }
    getTotals()
  }, [cartProducts])

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartCartProducts((prev) => {
      let updatedCart
      if (prev) {
        const productExists = prev.some((p) => p.id === product.id)
        if (productExists) {
          toast('Product already exists in the cart!', {
            id: 'product-exists',
          })
          return prev // Return the previous state without adding the product again
        }
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }

      toast.success('Product added to cart!', {
        id: '4',
      })

      localStorage.setItem('cart', JSON.stringify(updatedCart))

      return updatedCart
    })
  }, [])

  const handleAddProductToCartById = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      e?.stopPropagation()
      e?.preventDefault()
      setCartPdtIds((prev) => {
        let newcart
        let oldcart

        if (prev) {
          oldcart = [...prev]
          console.log('--------new ids', oldcart.length)

          const id_index = oldcart.findIndex((idx) => idx === id)
          console.log('--------Gotten id', id_index)

          if (id_index > -1) {
            toast('Product already exists in the cart!', {
              id: 'alt5',
            })
            return oldcart //because product already exists
          }

          newcart = [...prev, id]
        } else {
          newcart = [id]
        }

        toast.success('Product added to cart!', {
          id: 'alt4',
        })

        localStorage.setItem('cartpdtids', JSON.stringify(newcart))

        return newcart
      })
    },
    [],
  )

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      // console.log('++++++== Recent cart ', cartProducts?.length)
      setCartCartProducts((prev) => {
        if (!prev) return null

        let updatedCart

        const remainingcartafterfiltering = prev.filter(
          (pdt) => pdt.id !== product.id,
        )

        toast.success('Product removed From Cart', {
          id: '5',
        })

        updatedCart = remainingcartafterfiltering

        localStorage.setItem('cart', JSON.stringify(updatedCart))

        return updatedCart
      })
      // console.log('++++++== New cart ', cartProducts?.length)
    },
    [],
  )

  function clearCart() {
    setCartCartProducts([])
    setCartTotalQty(0)
    localStorage.setItem('cart', JSON.stringify([]))
    toast.success('Your cart is cleared', {
      id: 'cl1',
    })
  }

  const handleQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart
      if (product.quantity === 60) {
        return toast.error('Oops! Limit Reached', {
          id: '7',
        })
      }
      if (cartProducts) {
        updatedCart = [...cartProducts]
        const gottenIndex = updatedCart.findIndex(
          (pdt) => pdt.id === product.id,
        )
        if (gottenIndex > -1) {
          updatedCart[gottenIndex].quantity = ++updatedCart[gottenIndex]
            .quantity
        }
        setCartCartProducts(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
      }
    },
    [cartProducts],
  )

  const handleQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart
      if (product.quantity === 1) {
        return toast.error('Oops! Limit Reached', {
          duration: 8000,
          id: '8',
        })
      }
      if (cartProducts) {
        updatedCart = [...cartProducts]
        const gottenIndex = updatedCart.findIndex(
          (pdt) => pdt.id === product.id,
        )
        if (gottenIndex > -1) {
          updatedCart[gottenIndex].quantity = --updatedCart[gottenIndex]
            .quantity
        }
        setCartCartProducts(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
      }
    },
    [cartProducts],
  )

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val)
      localStorage.setItem('paymentintent', JSON.stringify(val))
    },
    [paymentIntent],
  )

  const handleSetClientSecret = useCallback(
    (val: string | undefined) => {
      setClientSecret(val)
      // localStorage.setItem('clientsecret', JSON.stringify(val))
    },
    [clientSecret],
  )

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    cartPdtids,
    paymentIntent,
    clientSecret,
    handleAddProductToCart,
    handleAddProductToCartById,
    handleRemoveProductFromCart,
    clearCart,
    handleQtyIncrease,
    handleQtyDecrease,
    handleSetPaymentIntent,
    handleSetClientSecret,
  }

  return <CartContext.Provider value={value} {...props} />
}

export default function useCart() {
  const context = useContext(CartContext)
  if (context === null) {
    throw new Error('useCart must be used within a cart context provider')
  }

  return context
}
