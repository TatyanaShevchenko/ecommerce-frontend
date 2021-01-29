import React, { useCallback, useContext, useState } from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatPrice } from "../utils/format"
import Checkout from "../components/Checkout"
import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE
} from "../utils/cart"
import { CartContext } from "../context/CartContext"

export default () => {
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const {cart, addToCart}=useContext(CartContext)

  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <Layout>
      <SEO title="Cart" />
      <div className="Cart__Items">
        <table>
          <tr>
            <td>Product</td>
            <td>Name</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
          {cart.map(product => (
            <tr className="Cart__Item">
              <td className="Cart__Item_ImageContainer">
                <Img
                  className="Cart__Item_Image"
                  fixed={product.thumbnail.childImageSharp.fixed}
                />
              </td>

              <td className="Product__Item_Name">{product.name}</td>
              <td className="Product__Item_Quantity">
                <button
                  onClick={() => {
                    addToCart(product, -1)
                    forceUpdate()
                  }}
                  className="Product__Item_QuantityBtn"
                >
                  -
                </button>
                <span className="Product__Item_QuantityNumber">
                  {product.qty}
                </span>
                <button
                  onClick={() => {
                    addToCart(product, 1)
                    forceUpdate()
                  }}
                  className="Product__Item_QuantityBtn"
                >
                  +
                </button>
              </td>
              <td className="Product__Item_Price">
                {formatPrice(product.price_in_cent)}
              </td>
            </tr>
          ))}
        </table>
        <h3 className="Cart_Total">
          Subtotal: {formatPrice(cartSubtotal(cart))}
        </h3>
        {shouldPayShipping(cart) && <h3 className="Cart_Total">Shipping: {formatPrice(SHIPPING_RATE)}</h3>}
        {!shouldPayShipping(cart) && <h3 className="Cart_Total">Shipping included</h3>}
        <h3 className="Cart_Total">Total(tax included): {formatPrice(cartTotal(cart))}</h3>
      </div>
      <div>
        {cart && cart.length > 0 &&
        <button 
        onClick={()=> setShowCheckout(true)}
        className="Checkout_Btn">Initiate Checkout</button>}
        {showCheckout && <Checkout cart={cart} />}
      </div>
    </Layout>
  )
}
