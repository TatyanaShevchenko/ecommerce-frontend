export const formatPrice = priceWithDecimals => {
  const realPrice = parseInt(priceWithDecimals) / 100
  return realPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}
