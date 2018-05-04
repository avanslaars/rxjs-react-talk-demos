import { ofType } from 'redux-observable'
import { interval } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'

const initState = {
  tick: 0,
  isRunning: false
}

const START_INTERVAL = 'START_INTERVAL'
const UPDATE_INTERVAL = 'UPDATE_INTERVAL'
const STOP_INTERVAL = 'STOP_INTERVAL'

export const startInterval = (speed = 500) => ({
  type: START_INTERVAL,
  payload: speed
})
export const stopInterval = () => ({ type: STOP_INTERVAL })

const intervalEpic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(START_INTERVAL),
    switchMap(({ payload }) => {
      return interval(payload).pipe(
        takeUntil(action$.pipe(ofType(STOP_INTERVAL))),
        map(tick => ({ type: UPDATE_INTERVAL, payload: tick }))
      )
    })
  )

export const rootEpic = intervalEpic

export default function (state = initState, action) {
  switch (action.type) {
    case START_INTERVAL:
      return { ...state, isRunning: true }
    case STOP_INTERVAL:
      return { ...state, isRunning: false }
    case UPDATE_INTERVAL:
      return { ...state, tick: action.payload }
    default:
      return state
  }
}
