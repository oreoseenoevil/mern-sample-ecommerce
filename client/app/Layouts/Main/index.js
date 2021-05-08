import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { GlobalContext } from '@Context/GlobalContext'
import { Products } from '@Components/Products'
import { DetailProduct } from '@Components/DetailProduct'
import { Login, Register } from '@Components/Auth'
import { Cart } from '@Components/Cart'
import { OrderHistory } from '@Components/History'
import { NotFound } from '@Components/Utils'
import { OrderDetails } from '@Components/History'
import { Categories } from '@Components/Categories'
import { PublicRoute, PrivateRoute, AdminRoute } from '@Components/Routing'

export const Main = () => {
  const { state } = useContext(GlobalContext)

  // const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin

  return (
    <Switch>
      <PublicRoute 
        restricted={false} 
        component={Products} 
        path='/'
        exact
      />
      <PublicRoute 
        restricted={false} 
        component={DetailProduct}
        path='/detail/:id'
        exact
      />
      <PublicRoute 
        restricted={false} 
        component={Cart}
        path='/cart'
        exact
      />
      <PublicRoute 
        restricted={true} 
        component={Login}
        path='/login'
        exact
      />
      <PublicRoute 
        restricted={true} 
        component={Register}
        path='/register'
        exact
      />
      <PrivateRoute
        component={OrderHistory}
        path='/history'
        exact
      />
      <PrivateRoute
        component={OrderDetails}
        path='/history/:id'
        exact
      />
      <AdminRoute
        isAdmin={isAdmin}
        component={Categories}
        path='/category'
        exact
      />
      <Route path='*' exact component={NotFound} />
    </Switch>
  )
}
