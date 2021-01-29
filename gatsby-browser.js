import React from 'react'
import CartContextProvider from './src/context/CartContext'

export const wrapRootElement = ({element})=>(
    <CartContextProvider>
        {element}
    </CartContextProvider>
)