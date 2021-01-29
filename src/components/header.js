import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { CartContext } from "../context/CartContext"

const Header = ({ siteTitle }) => {
  const { cart } = useContext(CartContext)

  return (
    <header
      style={{
        background: `rgb(121, 12, 223)`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            padding: `1.45rem 1.0875rem`,
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
       
       <Link to="/cart" >
        <div
          style={{
            color: "#fff",
            margin: `1.45rem 1.0875rem 0 0`,
            position: "relative",
            width: "65px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              fontSize: "48px",
            }}
          >
            🛒
          </div>
          {cart && cart.length > 0 && (
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "40px",
                backgroundColor: "rgb(255, 0, 119)",
                textAlign: "center",
                verticalAlign: "middle",
                display: "inline-block",
                lineHeight: "30px",
                position: "absolute",
                top: "20px",
                right: "0",
              }}
            >
              {cart.reduce((counter, product)=>counter+product.qty, 0)}
            </span>
          )}
        </div>
        </Link>
      </div>
 
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
