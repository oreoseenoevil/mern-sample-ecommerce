import { useEffect, useState } from 'react'
import axios from 'axios'

export function UserAPI (token) {
  const [isLogged, setIsLogged] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cart, setCart] = useState([])
  const [history, setHistory] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get('/user/info', {
            headers: { Authorization: token }
          })

          setIsLogged(true)
          res.data.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
          setCart(res.data.data.cart)
        } catch (error) {
          alert(error.response.data.msg)
        }
      }
      getUser()
    }
  }, [token])

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get('/api/payment', {
            headers: {Authorization: token}
          })
          setHistory(res.data.data)
        } else {
          const res = await axios.get('/user/history', {
            headers: { Authorization: token }
          })
          setHistory(res.data.data)
        }
        
      }

      getHistory()
    }
  }, [token, callback, isAdmin])

  const addCart = async (product) => {
    if (!isLogged) return alert('Please login to continue buying.')

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
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback]
  }
}
