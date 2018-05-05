import { ofType } from 'redux-observable'
import { mapTo, delay } from 'rxjs/operators'

const initState = {
  message: ''
}

const PING = 'PING'
const PONG = 'PONG'

export const ping = () => ({
  type: PING
})

const pingPongEpic = (action$, state$, dependencies) =>
  action$.pipe(ofType(PING), delay(2500), mapTo({ type: PONG }))

export const rootEpic = pingPongEpic

export default function(state = initState, action) {
  switch (action.type) {
    case PING:
      return { ...state, message: 'Ping' }
    case PONG:
      return { ...state, message: 'Pong' }
    default:
      return state
  }
}
