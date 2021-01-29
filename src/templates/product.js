import { graphql } from "gatsby"
import React, { useContext, useState } from "react"
import Img from "gatsby-image"

import { formatPrice } from "../utils/format"
import Layout from "../components/layout"
import { CartContext } from "../context/CartContext"

const ProductTemplate = ({ data }) => {
  const { name, description, price_in_cent, thumbnail } = data.strapiProduct
  const [qty, setQty] = useState(1)
  const {addToCart}= useContext(CartContext)
  return (
    <Layout>
      <Img
        className="Product__Item_Image"
        fixed={thumbnail.childImageSharp.fixed}
      />
      <h2 className="Product__Item_Name">{name}</h2>
      <p className="Product__Item_Description">{description}</p>
      <span className="Product__Item_Price">{formatPrice(price_in_cent)}</span>
      <input
      className="Product__Item_Qty"
        type="number"
        onChange={event => setQty(event.target.value)}
        value={qty}
     />
      <button
        className="Product__Item_Button"
        onClick={() => addToCart(data.strapiProduct, qty)}
      >
        Add to cart
      </button>
    </Layout>
  )
}

export default ProductTemplate

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    strapiProduct(id: { eq: $id }) {
      strapiId
      name
      price_in_cent
      description
      thumbnail {
        childImageSharp {
          fixed(width: 330) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
