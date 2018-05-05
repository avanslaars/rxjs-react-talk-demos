import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

export const PingPong = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
