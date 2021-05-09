import React, { useContext, useState, useEffect, Fragment } from 'react'
import { GlobalContext } from '@Context/GlobalContext'
import { comma } from '@Components/Utils'
import '@Components/Cart/index.scss'
import axios from 'axios'
import PayPalButton from '@Components/Cart/PayPalButton'

export const Cart = () => {
  const { state } = useContext(GlobalContext)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0).toFixed(2)

      setTotal(total)
    }

    getTotal()
  }, [cart])

  const addToCart = async (cart) => {
    await axios.patch('/user/addcart', {cart}, {
      headers: { Authorization: token }
    })
  }

  const increment = id => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const decrement = id => {
    cart.forEach(item => {
      if (item._id === id) {
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }

  const removeProduct = id =>{
    if(window.confirm('Do you want to delete this product?')){
      cart.forEach((item, index) => {
        if(item._id === id){
          cart.splice(index, 1)
        }
      })

      setCart([...cart])
      addToCart(cart)
    }
  }

  const tranSuccess = async payment => {
    const { paymentID, address } = payment

    await axios.post('/api/payment', { cart, paymentID, address }, {
      headers: { Authorization: token }
    })

    setCart([])
    addToCart([])
    alert('You have successfully place an order.')
  }

  const cartStyle = {
    textAlign: 'center',
    fontSize: '5rem'
  }

  if (cart.length === 0) {
    return (
      <h2 style={cartStyle}>
        Cart is empty.
      </h2>
    )
  }

  return (
    <Fragment>
      <div className="carts">
        {
          cart.map(product => (
            <div className="detail-product cart" key={product._id}>
              <img src={product.images.url} alt={product.title} />
              <div className="box-detail">
                <h2>{product.title}</h2>
                <h3>$ {comma(product.price * product.quantity)}</h3>
                <p>{product.description}</p>
                <p>{product.content}</p>

                <div className="amount">
                  <button onClick={() => decrement(product._id)}> - </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increment(product._id)}> + </button>
                </div>
                <span className="delete x-marked" onClick={() => removeProduct(product._id)}></span>
              </div>
            </div>
          ))
        }
        <div className="total">
          <h3>Total: $ {comma(total)}</h3>
          <PayPalButton
            total={parseInt(total)}
            tranSuccess={tranSuccess}
          />
        </div>
      </div>
    </Fragment>
  )
}
