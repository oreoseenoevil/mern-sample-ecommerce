import React from 'react'
import '@Components/Utils/index.scss'

const TOKEN_KEY = 'firstLogin'

export const isAdministrator = () => {
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
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
      <path className="jumper" strokeLinecap="round" strokeLinejoin="round" d="M47.5,94.3c0-23.5,19.9-42.5,44.5-42.5s44.5,19,44.5,42.5"/>
      <g stroke="#2d2d2d" strokeWidth="1">
        <ellipse className="circleL" fill="none" strokeMiterlimit="10" cx="47.2" cy="95.6" rx="10.7" ry="2.7" />
        <ellipse className="circleR" fill="none" strokeMiterlimit="10" cx="136.2" cy="95.6" rx="10.7" ry="2.7" />
      </g>
      <path className="jumper clone" strokeLinecap="round" strokeLinejoin="round" d="M47.5,94.3c0-23.5,19.9-42.5,44.5-42.5s44.5,19,44.5,42.5"/>
    </svg>
  )
}

export const comma = (total) => {
  return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
