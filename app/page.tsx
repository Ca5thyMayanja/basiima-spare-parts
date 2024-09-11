export const revalidate = 0

import { ContainerStyles } from "./components/ContainerStyles"
import HomeBanner from "./components/HomeBanner"
import getProducts, { IProductParams } from "@/actions/getProduct"
import NullData from "./components/NullData"
import SearchAlternatives from "./SearchAlternatives/page"
import VeryFirstProductComponent from "./components/VeryFirstProductComponent"

interface props {
  searchParams: IProductParams
}

export default async function Home({ searchParams }: props) {
  const products = await getProducts(searchParams)

  if (products?.length === 0) {
    if (searchParams.category) {
      return (
        <div className=" ml-5">
          <NullData
            title={`No Products in this cateogry ${searchParams.category} !, Click 'All' to clear filters `}
          />
        </div>
      )
    }
    if (searchParams.searchTerm) {
      return (
        <div className=" ml-5">
          <NullData
            title={`No Products found for this search ${searchParams.searchTerm} !, Click 'All' to clear filters `}
          />
        </div>
      )
    }

    // return <NullData title={`No Products to display`} />
  }

  //fisner yetes shuffle algorithm

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const shuffledPdts = shuffleArray(products)

  return (
    <div className="pt-4">
      <ContainerStyles>
        <SearchAlternatives />
        <HomeBanner />
        {/* <div className=" mt-2"><BannerProduct /> </div> */}
        {/* <HotProductComponent /> */}
        <VeryFirstProductComponent shuffledPdts={shuffledPdts} />
        {/* <PlayAroundComponent /> */}
      </ContainerStyles>
    </div>
  )
}

function veryfirstComponent() {}

// const { mode } = useContext(ThemeContext)
// const [theme, toggleTheme] = useTheme()
// const firsttheme = (
//   <div className={(mode === 'light') ? 'bg-white' : 'bg-black'}>

//     <div className={'h-full w-screen'}>
//       <ThemedSection />
//     </div>
//   </div>
// )

// const secondTheme = (
//   // <div className="min-h-screen flex items-center justify-center">
//   <div className={`${theme === 'light' ? ' bg-white' : ' bg-black'} min-h-screen flex items-center justify-center`}>
//     <button
//       className={`p-4 rounded-lg transition duration-300 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
//         }`}
//       onClick={toggleTheme}
//     >
//       Toggle Theme
//     </button>
//   </div>
// )
