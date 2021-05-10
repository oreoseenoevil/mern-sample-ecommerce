import { useState, useEffect } from 'react'
import axios from 'axios'

export function ProductsAPI() {
  const [products, setProducts] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/api/product')
      setProducts(res.data.data)
    }
    getProducts()
  }, [callback])

  return {
    products: [products, setProducts],
    callback: [callback, setCallback]
  }
}
