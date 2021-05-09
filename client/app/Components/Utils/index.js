import React from 'react'
import '@Components/Utils/index.scss'

const TOKEN_KEY = 'mern-shop'

export const isAdmin = () => {
  return localStorage.getItem(TOKEN_KEY) ? JSON.parse(localStorage.getItem(TOKEN_KEY)).role === 1 : false
}

export const login = (value) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(value))
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const isLogin = () => {
  return localStorage.getItem(TOKEN_KEY) ? true : false
}

export const NotFound = () => {
  return (
    <div className="not-found">
      404 | Not Found
    </div>
  )
}

export const Loader = () => {
  return (
    <div id="preloader">
      <div id="loader"></div>
    </div>
  )
}

export const comma = (total) => {
  return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
