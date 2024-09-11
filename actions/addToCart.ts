import { toast } from 'react-hot-toast'

const addToCart = async (e: Event, id: string) => {
  e?.stopPropagation()
  e?.preventDefault()

  const response = await fetch('', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  })

  const responseData = await response.json()

  if (responseData.success) {
    toast.success(responseData.message, {
      id: 'succ',
    })
  }

  if (responseData.error) {
    toast.error(responseData.message, {
      id: 'err555',
    })
  }

  return responseData
}

export default addToCart
