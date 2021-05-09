import { useEffect, useState } from 'react'
import axios from 'axios'
import { isLogin } from '@Components/Utils'

export function UserAPI (token) {
  const [cart, setCart] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/info', {
            headers: { Authorization: token }
          })

          setCart(res.data.data.cart)
        } catch (error) {
          alert(error.response.data.msg)
        }
      }
      getUser()
    }
  }, [token])

  const addCart = async (product) => {
    if (!isLogin()) return alert('Please login to continue buying.')

    const check = cart.every(item => {
      return item._id !== product._id
    })
    
    if (check) {
      setCart([...cart, {...product, quantity: 1}])
      await axios.patch('/user/addcart', {
        cart: [...cart, {...product, quantity: 1}]
      }, {
        headers: { Authorization: token }
      })
    } else {
      alert('This product has been added to cart.')
    }
  }

  return {
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory]
  }
}
