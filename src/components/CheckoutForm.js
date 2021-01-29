import React, { useContext, useEffect, useState } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { formatPrice } from "../utils/format"
import { CartContext } from "../context/CartContext"

export const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { cart } = useContext(CartContext)

  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("loading")
  const [paymentResult, setPaymentResult] = useState(null)
  const [success, setSuccess] = useState(false)

  const [shipping_name, setShipping_Name] = useState("")
  const [shipping_address, setShipping_address] = useState("")
  const [shipping_country, setShipping_Country] = useState("")
  const [shipping_state, setShipping_State] = useState("")
  const [shipping_zip, setShipping_Zip] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()

    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    if (result.error) {
      console.log(result.error.message)
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setPaymentResult("Payment has been proceeded successfully!")
      }
      const data = {
        paymentIntent: result.paymentIntent,
        shipping_name,
        shipping_address,
        shipping_country,
        shipping_state,
        shipping_zip,
        cart,
      }

      fetch("http://localhost:1337/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setSuccess(true)
    }
  }

  useEffect(() => {
    const loadToken = async () => {
      const response = await fetch("http://localhost:1337/orders/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.map(product => ({
            ...product,
            ...{ id: product.strapiId },
          })),
        }),
      })
      const data = await response.json()
      setToken(data.client_secret)
      setTotal(data.amount)
    }
    loadToken();
  }, [cart])

  const generateInput = (label, value, setOnChange) => {
    return (
      <>
        <label htmlFor={label} className="CheckoutForm_Label">
          {label}
        </label>
        <input
          className="CheckoutForm_Input"
          autoComplete
          name={label}
          id={label}
          value={value}
          onChange={event => {
            setOnChange(event.target.value)
          }}
        />
      </>
    )
  }

  const valid = () => {
    if (
      !shipping_name ||
      !shipping_address ||
      !shipping_country ||
      !shipping_state ||
      !shipping_zip
    )
      return false
    return true
  }

  if (token) {
    return (
      <div>
        <h3>Total: {formatPrice(total)}</h3>
        {!success && (
          <form className="CheckoutForm_Form" onSubmit={handleSubmit}>
            <div className="CheckoutForm_Inputs">
              {generateInput(
                "Shipping Recipient",
                shipping_name,
                setShipping_Name
              )}
              {generateInput(
                "Shipping Address",
                shipping_address,
                setShipping_address
              )}
              {generateInput("State", shipping_state, setShipping_State)}
              {generateInput("Country", shipping_country, setShipping_Country)}
              {generateInput("ZIP", shipping_zip, setShipping_Zip)}
            </div>
            <CardElement className="CheckoutForm_CardElement" />
            <button disabled={!stripe || !valid()}>Buy IT!</button>
          </form>
        )}

        {paymentResult && (
          <h2 className="CheckoutForm_Success">{paymentResult}</h2>
        )}
      </div>
    )
  } else {
    return (
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}
