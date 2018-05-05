import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startInterval, stopInterval, endAll } from './reducers'

class App extends Component {
  handleStart = evt => {
    evt.preventDefault()
    this.props.startInterval(1000)
  }

  componentWillUnmount() {
    // Dispatch the action that kills the interval
    this.props.stopInterval()
  }

  render() {
    return (
      <div className="App">
        <button disabled={this.props.isRunning} onClick={this.handleStart}>
          Start
        </button>
        <h1>{this.props.tick}</h1>
        <button
          disabled={!this.props.isRunning}
          onClick={this.props.stopInterval}
        >
          Stop
        </button>
      </div>
    )
  }
}

export default connect(state => state, { startInterval, stopInterval, endAll })(
  App
)
