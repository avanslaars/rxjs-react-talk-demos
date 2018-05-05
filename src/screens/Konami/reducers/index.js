import { ofType } from 'redux-observable'
import { of, from, fromEvent, merge, concat } from 'rxjs'
import {
  map,
  mapTo,
  filter,
  switchMap,
  pluck,
  bufferCount,
  partition,
  takeUntil,
  tap,
  share
} from 'rxjs/operators'

const initState = {
  charCode: ''
}

const START_LISTEN = 'START_LISTEN'
const STOP_LISTEN = 'STOP_LISTEN'
const UPDATE_KEY_CODE = 'UPDATE_KEY_CODE'
const MATCH_FOUND = 'MATCH_FOUND'
const MATCH_LOST = 'MATCH_LOST'

export const startListen = () => ({
  type: START_LISTEN
})

export const stopListen = () => ({
  type: STOP_LISTEN
})

const codes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
const restricted = [91]
const keyListenerEpic = (action$, state$, dependencies) =>
  action$.pipe(
    ofType(START_LISTEN),
    switchMap(() => {
      /**
       * 1. Get keycode & update UI
       * 2. Buffer codes and partition for a match
       * 3. For a match, dispatch to update UI
       * 4. For no match, change UI update
       * 5. Display keycodes in a list in the UI
       */

      // Create the "base" observable
      const keyUp$ = fromEvent(document, 'keyup').pipe(
        pluck('keyCode'),
        filter(code => !restricted.includes(code)),
        takeUntil(action$.pipe(ofType(STOP_LISTEN))),
        share() // without this, logging out in here would run 3 times for each event
      )

      // Create the streams for match/noMatch
      const sequenceMatch$ = keyUp$.pipe(
        bufferCount(10, 1),
        obs$ =>
          of(
            partition(seq => JSON.stringify(seq) === JSON.stringify(codes))(
              obs$
            )
          ),
        switchMap(([match$, noMatch$]) => {
          const good$ = match$.pipe(mapTo({ type: 'MATCH_FOUND' }))
          const bad$ = noMatch$.pipe(mapTo({ type: 'MATCH_LOST' }))
          return merge(good$, bad$)
        })
      )

      // create stream to map each keyCode to a dispatch
      const keyCode$ = keyUp$.pipe(
        map(code => ({ type: UPDATE_KEY_CODE, payload: code }))
      )

      return merge(keyCode$, sequenceMatch$)
    })
  )

export const rootEpic = keyListenerEpic

export default function(state = initState, action) {
  switch (action.type) {
    case UPDATE_KEY_CODE:
      return { ...state, keyCode: action.payload }
    case MATCH_FOUND:
      return { ...state, message: 'Hooray 🎉' }
    case MATCH_LOST:
      return { ...state, message: 'Womp womp 🙁' }
    default:
      return state
  }
}
