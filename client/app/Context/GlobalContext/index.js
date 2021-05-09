import React, { createContext, useState, useEffect } from 'react'
import { ProductsAPI } from '@Context/ProductsAPI'
import { UserAPI } from '@Context/UserAPI'
import { CategoriesAPI } from '@Context/CategoriesAPI'
import axios from 'axios'
import { isLogin } from '@Components/Utils'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.get('/user/refresh_token')
  
        setToken(res.data.accesstoken)

        setTimeout(() => {
          refreshToken()
        }, 15000)
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
    if (isLogin()) refreshToken()
  }, [])

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI()
  }

  return (
    <GlobalContext.Provider value={{state}}>
      {children}
    </GlobalContext.Provider>
  )
}
