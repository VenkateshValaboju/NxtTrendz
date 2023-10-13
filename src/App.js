import {useState} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const addCartItem = product => {
    const cartIds = cartList.map(eachItem => eachItem.id)
    if (cartIds.includes(product.id)) {
      const index = cartList.findIndex(item => item.id === product.id)
      cartList[index].quantity += product.quantity
      setTotalPrice(totalPrice + product.price * product.quantity)
      setCartList(cartList)
    } else {
      setTotalPrice(totalPrice + product.price * product.quantity)
      setCartList([...cartList, product])
    }
  }

  const deleteCartItem = id => {
    const index = cartList.findIndex(item => item.id === id)
    const newCartList = cartList.filter(eachItem => {
      if (id !== eachItem.id) {
        return true
      }
      return false
    })
    setTotalPrice(totalPrice - cartList[index].price * cartList[index].quantity)
    setCartList(newCartList)
  }

  const updateQuantity = (id, count, q) => {
    const index = cartList.findIndex(item => item.id === id)
    cartList[index].quantity = count
    setTotalPrice(totalPrice + q * cartList[index].price)
    setCartList(cartList)
  }

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          totalPrice,
          addCartItem,
          deleteCartItem,
          updateQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
