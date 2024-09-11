export const formatNumber = (digit: number) => {
  return new Intl.NumberFormat("en-UG").format(digit)
}
