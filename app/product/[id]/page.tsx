import React from "react"

import { Product, products } from "@/app/utils/products"
import ProductCard from "@/app/components/products/ProductCard"
import { ContainerStyles } from "@/app/components/ContainerStyles"
import ProductDetails from "./ProductDetails"
import ListRating from "../ListRating"
import getProductById from "@/actions/getProductById"
import AddRating from "./AddRating"
import { getCurrentUser } from "@/actions/getCurrentUser"
import CategoryWiseProductsComponent from "@/app/components/CategoryWiseProductsComponent"

export const dynamic = "force-dynamic"

interface props {
  params: {
    id?: string
  }
}

export default async function page({ params }: props) {
  // const [product, setProduct] = useState<any>()
  const product = await getProductById(params)

  // function getSpecificproduct() {
  //   products.map((p) => {
  //     if (p?.id === params.id) {
  //       setProduct(p)
  //       return p
  //     } else return
  //   })
  // }

  // console.log(' ++++++ Pdt id ', params)

  // if (!product) {
  //   return <div>Product does not eist</div>
  // }

  const user = await getCurrentUser()

  return (
    <div>
      <ContainerStyles>
        <div className=" gap-8  mx-5">
          {product !== undefined && (
            <>
              <ProductDetails product={product} />
              <div className=" flex flex-col mt-20 gap-4">
                {product && <AddRating product={product} user={user} />}
                <ListRating product={product} />
              </div>
            </>
          )}
        </div>
        <div className=" md:mx-5">
          {product?.category && (
            <CategoryWiseProductsComponent
              category={product?.category}
              heading={"Recommended Products"}
            />
          )}
        </div>
      </ContainerStyles>
    </div>
  )
}
