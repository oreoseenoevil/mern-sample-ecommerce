import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLogin } from '@Components/Utils'

export const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
}

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() && restricted ? <Redirect to='/' />
        : <Component {...props} />
    )} />
  )
}

export const AdminRoute = ({component: Component, isAdmin, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() && isAdmin ? <Component {...props} />
        : <Redirect to='*' />
    )} />
  )
}
