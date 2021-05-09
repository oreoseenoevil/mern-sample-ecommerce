import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isLogin, isAdministrator } from '@Components/Utils'

export const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }} />
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

export const AdminRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin() && isAdministrator() ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
          state: {from: props.location}
        }} />
    )} />
  )
}
