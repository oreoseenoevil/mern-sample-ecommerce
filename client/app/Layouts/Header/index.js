import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { GlobalContext } from '@Context/GlobalContext'
import { isAdmin, isLogin, logout } from '@Components/Utils'
import Menu from '@Icons/menu.svg'
import Close from '@Icons/close.svg'
import Cart from '@Icons/cart.svg'
import '@Layouts/Header/index.scss'

export const Header = () => {
  const { state } = useContext(GlobalContext)
  const [cart] = state.userAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get('/user/logout')
    logout()
    window.location.href = '/'
  }

  const adminRouter = () => {
    return (
      <Fragment>
        <li><Link to="/product/create" replace>Create Product</Link></li>
        <li><Link to="/category" replace>Categories</Link></li>
      </Fragment>
    )
  }

  const loggedRouter = () => {
    return (
      <Fragment>
        <li><Link to="/history" replace>History</Link></li>
        <li><Link to="/" replace onClick={logoutUser}>Logout</Link></li>
      </Fragment>
    )
  }

  const styleMenu = {
    left: menu ? 0 : '-100%'
  }

  return (
    <div className="header">
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="menu" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to='/' replace>{(isLogin() && isAdmin()) ? 'Admin' : 'ECShop'}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to={'/'} replace>{isAdmin() ? 'Products' : 'Shop'}</Link>
        </li>

        {(isLogin() && isAdmin()) && adminRouter()}
        {isLogin() ? loggedRouter() : <li><Link to='/login' replace>Login</Link> | <Link to='/register' replace>Register</Link></li>}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="close" width="30" className="close" />
        </li>
      </ul>

      {
        isLogin() && isAdmin() ? ''
          : <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to='/cart' replace>
              <img src={Cart} alt="cart" width="30" />
            </Link>
          </div>
      }
    </div>
  )
}
