import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Listings from './components/Listings'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

import configureStore from './store'

const store = configureStore()

render(
  <Router>
    <Provider store={store}>
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/' component={Listings} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
)
