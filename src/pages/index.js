import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import {formatPrice} from "../utils/format";
import {fromProductSlugToUrl} from "../utils/products";

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./style.css"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h2 class="Shop">Shop</h2>
    {data.allStrapiProduct.nodes.map(product => (
      <Link className="Product__Link" to={fromProductSlugToUrl(product.slug)}>
      <div className="Product__Item">
        <Img
          className="Product__Item_Image"
          fixed={product.thumbnail.childImageSharp.fixed}
        />
        <div>
          <h3 className="Product__Item_Name">{product.name}</h3>
          <p className="Product__Item_Description">{product.description}</p>
          <span className="Product__Item_Price">{formatPrice(product.price_in_cent)}</span>
        </div>
      </div>
      </Link>
    ))}
  </Layout>
)

export default IndexPage
export const pageQuery = graphql`
  query MyQuery {
    allStrapiProduct {
      nodes {
        id
        description
        created_at
        name
        slug
        price_in_cent
        strapiId
        thumbnail {
          childImageSharp {
            fixed(width: 200, height: 200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
