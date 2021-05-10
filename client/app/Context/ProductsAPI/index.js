import { useState, useEffect } from 'react'
import axios from 'axios'

export function ProductsAPI() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/api/product')
      setProducts(res.data.data)
    }
    getProducts()
  }, [setProducts])

  return {
    products: [products, setProducts]
  }
}
