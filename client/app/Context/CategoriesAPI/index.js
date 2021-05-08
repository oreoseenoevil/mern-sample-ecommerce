import { useState, useEffect } from 'react'
import axios from 'axios'

export const CategoriesAPI = () => {
  const [categories, setCategories] = useState([])
  const [callback, setCallback] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('/api/category')

      setCategories(res.data.data)
    }

    getCategories()
  }, [callback])

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback]
  }
}
