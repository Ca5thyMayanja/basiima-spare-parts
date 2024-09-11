import useCart from "@/app/hooks/useCart"
import { CartProductType, Product } from "@prisma/client"
import toast from "react-hot-toast"

export default async function useProductIdandAddtoCart(
  e: React.MouseEvent<HTMLButtonElement>,
  id: string
) {
  e?.stopPropagation()
  e?.preventDefault()

  // const pdt = await getSingleProductById(id)

  const response = await fetch(`/api/specificproduct`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
  if (!response.ok) {
    toast.error("Error occurred while fetching product from database")
    return
  }

  const pdt: Product = await response.json()

  if (!pdt) {
    return null
  }

  let ctpdt: CartProductType = {
    id: pdt.id,
    name: pdt.name,
    description: pdt.description,
    category: pdt.category,
    brand: pdt.brand,
    quantity: 1,
    price: pdt.price,
    selectedImg:
      pdt.images && pdt.images.length > 0
        ? {
            color: pdt.images[0].color,
            colorCode: pdt.images[0].colorCode,
            image: pdt.images[0].image,
          }
        : {
            color: "",
            colorCode: "",
            image: "",
          },
  }

  // console.log('*************** Constructed cart product:', ctpdt)

  const { handleAddProductToCart, cartProducts } = useCart()

  const existingid = cartProducts?.findIndex((pdt) => {
    pdt.id === ctpdt.id
  })

  if (existingid && existingid > -1) {
    toast("Product already exists in the cart!", {
      id: "alt67",
    })
    return cartProducts //because product already exists
  }

  toast.success("Product added to cart from actions function!", {
    duration: 6000,
    id: "456",
  })
  return handleAddProductToCart(ctpdt)
}
