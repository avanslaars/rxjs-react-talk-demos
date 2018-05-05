import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

export const Konami = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
