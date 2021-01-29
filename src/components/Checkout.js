import React from "react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { CheckoutForm } from "./CheckoutForm"

const stripePromise = loadStripe(
  "pk_test_51IEFmHEBoNytVx4h2wpB536a7UeNZw4Hz8llpZWfEnEiD46kzybCQtV0X5l5u6rCCK8ZkvcVU2CDfAAemyzIMFwt00817hDBmr"
)

export default () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}
