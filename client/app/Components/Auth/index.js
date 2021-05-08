import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '@Components/Auth/index.scss'
import { login } from '@Components/Utils'

export const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })


  const handleChange = e => {
    const { name, value } = e.target
    setUser({...user, [name]:value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/login', { ...user })

      login()

      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className="login-register-page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  )
}

export const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })


  const handleChange = e => {
    const { name, value } = e.target
    setUser({...user, [name]:value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })

      login()

      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className="login-register-page">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="group">
          <label>Name:</label>
          <input
            type="name"
            name="name"
            required
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}
