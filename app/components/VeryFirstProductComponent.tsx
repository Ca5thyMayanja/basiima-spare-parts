import ProductCard from './products/ProductCard'

export default function VeryFirstProductComponent({
  shuffledPdts,
}: {
  shuffledPdts: any
}) {
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-5 gap-8 mt-6">
      {shuffledPdts?.map((p: any) => (
        <div key={p.id}>
          <ProductCard data={p} />
        </div>
      ))}
    </div>
  )
}
