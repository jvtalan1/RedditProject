import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store'

const App = () => {
  return (
    <div>
      <h1>React App Running!</h1>
    </div>
  )
}

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
)
