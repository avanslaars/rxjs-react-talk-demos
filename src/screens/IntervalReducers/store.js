import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import reducer, { rootEpic } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware(rootEpic)

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
)
