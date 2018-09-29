import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import Login from '../pages/Login'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/product/:id',
    component: ProductDetail,
  },

  {
    path: '/login',
    exact: true,
    component: Login,
  }
]

export default () => (
  <Fragment>
    {routes.map((route, i) => (
      <Route key={i} {...route} />
    ))}
  </Fragment>
)
