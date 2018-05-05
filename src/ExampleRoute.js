import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import loader from './loading-ducks.gif'

export const ExampleRoute = ({ component, ...props }) => (
  <Route
    {...props}
    render={() => {
      const Example = Loadable({
        loader: () => import(`./screens/${component}`),
        loading: ({ pastDelay }) =>
          pastDelay ? <img src={loader} alt="loading example" /> : null
      })
      return <Example />
    }}
  />
)
