import { ofType } from 'redux-observable'
import { fromEvent } from 'rxjs'
import {
  map,
  switchMap,
  pluck,
  bufferWithCount,
  from,
  takeUntil,
  tap
} from 'rxjs/operators'

const initState = {
  charCode: ''
}

const START_LISTEN = 'START_LISTEN'
const STOP_LISTEN = 'STOP_LISTEN'
const UPDATE_STATUS = 'UPDATE_STATUS'

export const startListen = () =>
  console.log('start listen') || {
    type: START_LISTEN
  }

export const stopListen = () => ({
  type: STOP_LISTEN
})

const codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
const keyListenerEpic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(START_LISTEN),
    switchMap(() => {
      return fromEvent(document, 'keyup').pipe(
        pluck('keyCode'),
        map(code => ({ type: UPDATE_STATUS, payload: code })),
        takeUntil(action$.pipe(ofType(STOP_LISTEN)))
      )
    })
  )

export const rootEpic = keyListenerEpic

export default function(state = initState, action) {
  console.log('Reducer called', action)

  switch (action.type) {
    case UPDATE_STATUS:
      return { ...state, keyCode: action.payload }
    default:
      return state
  }
}
