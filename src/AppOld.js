import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startInterval, stopInterval } from './reducers'
import './index.css'

class App extends Component {
  handleStart = evt => {
    evt.preventDefault()
    this.props.startInterval(1000)
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

export default connect(state => state, { startInterval, stopInterval })(App)
