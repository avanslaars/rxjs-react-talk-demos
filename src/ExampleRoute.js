import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'

export const ExampleRoute = ({ component, ...props }) => (
  <Route
    {...props}
    render={() => {
      const Example = Loadable({
        loader: () => import(`./screens/${component}`),
        loading: () => <h1>Loading...</h1>
      })
      return <Example />
    }}
  />
)
