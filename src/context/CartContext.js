import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  totalPrice: 0,
  addCartItem: () => {},
  deleteCartItem: () => {},
  updateQuantity: () => {},
})

export default CartContext
