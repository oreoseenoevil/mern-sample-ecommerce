import { useEffect, useState } from 'react'
import axios from 'axios'

export function ProductsAPI() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await axios.get('/api/product')
    setProducts(res.data.data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return {
    products: [products, setProducts]
  }
}
