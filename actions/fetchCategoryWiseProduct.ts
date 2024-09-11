export default async function fetchCategoryWiseProduct(category: string) {
  const response = await fetch('/api/category', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      category: category,
    }),
  })

  const dataResponse = await response.json()

  return dataResponse
}
