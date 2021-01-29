import React, { createContext, useState } from "react"
import { getCart, saveCart } from "../utils/cart"

export const CartContext = createContext(null)

export default ({ children }) => {
  const [cart, setCart] = useState(getCart())

  const updateCart = updatedCart => {
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  const addToCart = (product, quantity = 1) => {
    const copy = [...cart]
    const indexOfProduct = copy.findIndex(alreadyInCart => {
      return alreadyInCart.strapiId === product.strapiId
    })

    if (indexOfProduct !== -1) {
      copy[indexOfProduct].qty += parseInt(quantity)
      if (copy[indexOfProduct].qty === 0) {
        copy.splice(indexOfProduct, 1)
      }
    } else {
      product.qty = parseInt(quantity)
      copy.push(product)
    }
    updateCart(copy)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}
